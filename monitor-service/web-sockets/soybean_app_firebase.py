import asyncio
import websockets
import base64
import numpy as np
import io
import tensorflow as tf
from PIL import Image
import firebase_admin
from firebase_admin import credentials, db
from tensorflow.keras.preprocessing.image import img_to_array

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

ref_1 = db.reference("/soybean_predictions_top")
ref_2 = db.reference("/soybean_predictions_bottom")
ref_3 = db.reference("/soybean_predictions")

top_prediction = ""
bottom_prediction = ""
top_prediction_score = 0.0
bottom_prediction_score = 0.0

image_data = True

model_path = "models_src/efficientnet_soybean_final_model.keras"
model = tf.keras.models.load_model(model_path)

labels = ["Broken soybeans", "Immature soybeans", "Skin-damaged soybeans", "Spotted soybeans", "Pure soybeans"]

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((227, 227))
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img

def predict_image(image):
    predictions = model.predict(image)
    confidence = np.max(predictions)
    label_index = np.argmax(predictions, axis=1)[0]
    label = labels[label_index] if confidence >= 0.85 else "unknown"

    if image_data:
        global top_prediction, top_prediction_score
        top_prediction = label
        top_prediction_score = confidence
    else:
        global bottom_prediction, bottom_prediction_score
        bottom_prediction = label
        bottom_prediction_score = confidence

    return {
        "predicted_class": label,
        "confidence": float(confidence),
        "probabilities": {labels[i]: float(predictions[0][i]) for i in range(len(labels))}
    }

def prepare_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = preprocess_image(image_data)
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

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

        if top_prediction == "Pure soybeans" and bottom_prediction == "Pure soybeans":
            prediction_result = {"predicted_class": "Pure soybeans"}
        elif top_prediction == "unknown" and bottom_prediction == "unknown":
            prediction_result = {"predicted_class": "unknown"}
        else:
            if top_prediction_score > bottom_prediction_score:
                prediction_result = {"predicted_class": top_prediction}
            else:
                prediction_result = {"predicted_class": bottom_prediction}

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
            await websocket.send(str(response))
        except Exception as e:
            error_msg = f"Error during inference: {str(e)}"
            print(error_msg)
            await websocket.send(str({"error": error_msg}))

async def main():
    async with websockets.serve(handle_websocket, "0.0.0.0", 8769):
        print("WebSocket Server running on ws://0.0.0.0:8769")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
