import asyncio
import websockets
import base64
import numpy as np
import io
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import firebase_admin
from firebase_admin import credentials, db
import json

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

ref_1 = db.reference("/guava_predictions_top")
ref_2 = db.reference("/guava_predictions_bottom")
ref_3 = db.reference("/guava_predictions")

top_prediction = ""
bottom_prediction = ""
top_prediction_score = 0.0
bottom_prediction_score = 0.0

image_data = True

model_path = 'models_src/guawa.keras'
model = load_model(model_path)

class_names = ["high", "low", "medium"]

def get_lower_label(class1, class2):
    order = {"high": 2, "medium": 1, "low": 0}
    if order[class1] < order[class2]:
        return class1
    return class2

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((227, 227))
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img

def predict_image(image):
    predictions = model.predict(image)
    confidence_scores = predictions[0]
    label_index = np.argmax(confidence_scores)
    label = class_names[label_index]
    confidence_score = confidence_scores[label_index]
    
    if confidence_score < 0.85:
        return {"prediction": "Uncertain", "confidence_score": float(confidence_score), "message": "Confidence score below threshold."}
    
    if image_data:
        global top_prediction, top_prediction_score
        top_prediction = label
        top_prediction_score = confidence_score
    else:
        global bottom_prediction, bottom_prediction_score
        bottom_prediction = label
        bottom_prediction_score = confidence_score
    
    return {"prediction": label, "confidence_score": float(confidence_score)}

def prepare_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = preprocess_image(image_data)
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None
    
def get_lower_label(class1, class2):
    order = {"high": 2, "medium": 1, "low": 0}
    if order[class1] < order[class2]:
        return class1
    return class2

def save_prediction_to_firebase(prediction_result):
    global image_data
    if image_data:
        predictions = ref_1.get() or []
        predictions.append(prediction_result)
        if len(predictions) > 3:
            predictions.pop(0)
        ref_1.set(predictions)
        image_data = False
    else:
        predictions = ref_2.get() or []
        predictions.append(prediction_result)
        if len(predictions) > 3:
            predictions.pop(0)
        ref_2.set(predictions)
        image_data = True

        if top_prediction == "Uncertain" or bottom_prediction == "Uncertain":
            prediction_result = {"prediction": "Uncertain" }
        elif top_prediction == "high" and bottom_prediction == "high":
            prediction_result = {"prediction": "high"}
        elif top_prediction == "medium" and bottom_prediction == "medium":
            prediction_result = {"prediction": "medium"}
        elif top_prediction == "low" and bottom_prediction == "low":
            prediction_result = {"prediction": "low"}
        else:
            prediction_result = {"prediction": get_lower_label(top_prediction, bottom_prediction)}

        predictions = ref_3.get() or []
        predictions.append(prediction_result)
        if len(predictions) > 3:
            predictions.pop(0)
        ref_3.set(predictions)

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

            await websocket.send(json.dumps(response))

        except Exception as e:
            error_msg = {"error": str(e)}
            await websocket.send(json.dumps(error_msg))

async def main():
    async with websockets.serve(handle_websocket, "0.0.0.0", 8767):
        print("WebSocket Server running on ws://0.0.0.0:8767")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
