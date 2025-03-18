import asyncio
import websockets
import base64
import numpy as np
import io
import tensorflow as tf
from PIL import Image
import firebase_admin
from firebase_admin import credentials, db
import json

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

ref = db.reference("/rice_disease_predictions")

model_path = "models_src/rice_disease.keras"
model = tf.keras.models.load_model(model_path)

labels = ["Bacterial Leaf Blight", "Brown Spot", "Healthy", "Leaf Blast"]

CONFIDENCE_THRESHOLD = 0.85

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img = np.expand_dims(img, axis=0)
    return img

def predict_image(image):
    predictions = model.predict(image)
    confidence_scores = predictions[0]
    label_index = np.argmax(confidence_scores)
    label = labels[label_index]
    confidence_score = confidence_scores[label_index]
    
    if confidence_score < CONFIDENCE_THRESHOLD:
        return {"prediction": "Uncertain", "confidence_score": float(confidence_score), "message": "Confidence score below threshold."}
    
    return {"prediction": label, "confidence_score": float(confidence_score)}

def prepare_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = preprocess_image(image_data)
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def save_prediction_to_firebase(prediction):
    predictions = ref.get() or []
    predictions.append(prediction)
    
    if len(predictions) > 3:
        predictions.pop(0)
    
    ref.set(predictions)

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
    async with websockets.serve(handle_websocket, "0.0.0.0", 8768):
        print("WebSocket Server running on ws://0.0.0.0:8768")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
