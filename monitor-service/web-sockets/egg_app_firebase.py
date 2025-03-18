import asyncio
import websockets
import base64
import numpy as np
import io
import json
import firebase_admin
from firebase_admin import credentials, db
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

ref_1 = db.reference("/egg-quality-data-top")
ref_2 = db.reference("/egg-quality-data-bottom")
ref_3 = db.reference("/egg-quality-data")

top_prediction = ""
bottom_prediction = ""

image_data = True

model = load_model('models_src/egg_classification_model.h5')

label_names = {
    0: "Brown - cracked egg",
    1: "Brown - good egg",
    2: "Dirty egg",
    3: "White - cracked egg",
    4: "White - good egg"
}

def preprocess_image(file):
    img = Image.open(io.BytesIO(file))
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

def predict_image(img_array):
    prediction = model.predict(img_array)
    predicted_class_idx = np.argmax(prediction)
    confidence_score = np.max(prediction)  # Get highest confidence score

    if confidence_score < 0.85:
        predicted_label = "Unknown"
    else:
        predicted_label = label_names[predicted_class_idx]

    if image_data:
        global top_prediction
        top_prediction = predicted_label
    else:
        global bottom_prediction
        bottom_prediction = predicted_label

    return {"Result": predicted_label, "Confidence": float(confidence_score)}


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

        if top_prediction == "Brown - good egg" and bottom_prediction == "Brown - good egg":
            prediction_result = {"Result": "Brown - Good egg"}
        elif top_prediction == "White - good egg" and bottom_prediction == "White - good egg":
            prediction_result = {"Result": "White - Good egg"}
        else:
            prediction_result = {"Result": top_prediction}

        predictions = ref_3.get() or []
        predictions.append(prediction_result)
        if len(predictions) > 3:
            predictions.pop(0)
        ref_3.set(predictions)

def prepare_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = preprocess_image(image_data)
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

async def handle_websocket(websocket):
    async for message in websocket:
        try:
            print("Received Base64 image via WebSocket")

            image = prepare_image(message)

            if image is None:
                response = {"error": "Invalid image data"}
            else:
                
                result = predict_image(image)
                
                save_prediction_to_firebase(result)
            
            await websocket.send(json.dumps(result))
        
        except Exception as e:
            error_msg = {"error": str(e)}
            await websocket.send(json.dumps(error_msg))

async def main():
    async with websockets.serve(handle_websocket, "0.0.0.0", 8766):
        print("WebSocket Server running on ws://0.0.0.0:8766")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
