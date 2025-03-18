import asyncio
import websockets
import base64
import numpy as np
import io
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from PIL import Image
import firebase_admin
from firebase_admin import credentials, db
import random
import time

cred = credentials.Certificate("serviceAccountKey.json")  
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'  
})

ref_1 = db.reference("/corn_seed_data_top") #Top Classification
ref_2 = db.reference("/corn_seed_data_bottom")  #Bottom Classification
ref_3 = db.reference("/corn_seed_data")  #Final Classification


#Algo implementation
top_prediction = ""
bottom_prediction = ""
top_prediction_score = 0.0
bottom_prediction_score = 0.0

image_data = True

model_path = 'models_src/corn_seeds.pth'

weights = EfficientNet_B0_Weights.DEFAULT
model = efficientnet_b0(weights=weights)

model.classifier = nn.Sequential(
    nn.Flatten(),
    nn.Dropout(0.5),
    nn.Linear(1280, 256),
    nn.ReLU(),
    nn.BatchNorm1d(256),
    nn.Dropout(0.3),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.BatchNorm1d(128),
    nn.Dropout(0.3),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.BatchNorm1d(64),
    nn.Dropout(0.3),
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.BatchNorm1d(32),
    nn.Dropout(0.3),
    nn.Linear(32, 4)
)

model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()

labels = ['broken', 'discolored', 'pure', 'silkcut']

data_transform = transforms.Compose([
    transforms.Resize((227, 227)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = data_transform(img)
    img = img.unsqueeze(0)
    return img

def predict_image(image):
    with torch.no_grad():
        outputs = model(image)
        confidence = torch.nn.functional.softmax(outputs, dim=1).numpy()
        label_index = np.argmax(confidence, axis=1)[0]
        confidence_score = float(confidence[0][label_index])
        
        if confidence_score >= 0.85:
            label = labels[label_index]
        else:
            label = "unknown"

        if image_data:
            global top_prediction, top_prediction_score
            top_prediction = label
            top_prediction_score = confidence_score
        else:
            global bottom_prediction, bottom_prediction_score
            bottom_prediction = label
            bottom_prediction_score = confidence_score
        
        return {"prediction": label, "confidence_score": confidence_score}

def prepare_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = preprocess_image(image_data)
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None
    
def save_prediction_to_firebase(prediction):
    global image_data

    if image_data:
        predictions = ref_1.get() or []
        predictions.append(prediction)
        
        if len(predictions) > 3:
            predictions.pop(0)
        
        ref_1.set(predictions)
        image_data = False

    else:
        predictions = ref_2.get() or []
        predictions.append(prediction)
        
        if len(predictions) > 3:
            predictions.pop(0)
        
        ref_2.set(predictions)
        image_data = True

        ###### Start of the algo implementation ######

        if top_prediction == 'pure' and bottom_prediction == 'pure':
            predictions = {
                "prediction": 'pure',
            }
        elif top_prediction == 'unknown' or bottom_prediction == 'unknown':
            predictions = {
                "prediction": 'unknown',
            }
        else:
            if top_prediction_score > bottom_prediction_score:
                predictions = {
                    "prediction": top_prediction,
                }
            else:
                predictions = {
                    "prediction": bottom_prediction,
                }
        predictions = ref_3.get() or []
        predictions.append(prediction)
        
        if len(predictions) > 3:
            predictions.pop(0)

        ref_3.set(predictions)

        ###### ENd of the algo implementation ######

async def handle_websocket(websocket):
    async for message in websocket:
        try:
            print("Received Base64 image via WebSocket")

            image = prepare_image(message)

            if image is None:
                response = {"error": "Invalid image data"}
            else:
                prediction_result = predict_image(image)

                save_prediction_to_firebase(prediction_result)

                response = {"status": "success", "prediction": prediction_result}

            await websocket.send(str(response))

        except Exception as e:
            error_msg = f"Error during inference: {str(e)}"
            print(error_msg)
            await websocket.send(str({"error": error_msg}))

async def main():
    async with websockets.serve(handle_websocket, "0.0.0.0", 8765):
        print("WebSocket Server running on ws://0.0.0.0:8765")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
