import asyncio
import websockets
import base64
import numpy as np
import io
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from PIL import Image
import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

ref_1 = db.reference("/tomato_predictions_top")
ref_2 = db.reference("/tomato_predictions_bottom")
ref_3 = db.reference("/tomato_predictions")

top_prediction = ""
bottom_prediction = ""
top_prediction_score = 0.0
bottom_prediction_score = 0.0

image_data = True

model = load_model('models_src/tomato.keras')

class_names = ["HIGH", "LOW", "MEDIUM"]

def prepare_image(base64_string):
    try:
        image_data = base64.b64decode(base64_string)
        image = Image.open(io.BytesIO(image_data))
        image = image.resize((227, 227))
        image = img_to_array(image)
        image = np.expand_dims(image, axis=0)
        return image
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def predict_image(image):
    predictions = model.predict(image)
    pred_class_index = np.argmax(predictions)
    confidence = float(predictions[0][pred_class_index])

    if confidence < 0.85:
        pred_class = "Unknown"
    else:
        pred_class = class_names[pred_class_index]

    if image_data:
        global top_prediction, top_prediction_score
        top_prediction = pred_class
        top_prediction_score = confidence
    else:
        global bottom_prediction, bottom_prediction_score
        bottom_prediction = pred_class
        bottom_prediction_score = confidence

    return {
        "predicted_class": pred_class,
        "confidence": confidence,
        "probabilities": {class_names[i]: float(predictions[0][i]) for i in range(len(class_names))}
    }


def lower_prediction(class1, class2):
    order = {"HIGH": 2, "MEDIUM": 1, "LOW": 0}
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

        if top_prediction == "HIGH" and bottom_prediction == "HIGH":
            prediction_result = {"predicted_class": "HIGH"}
        elif top_prediction == "LOW" and bottom_prediction == "LOW":
            prediction_result = {"predicted_class": "LOW"}
        elif top_prediction == "MEDIUM" and bottom_prediction == "MEDIUM":
            prediction_result = {"predicted_class": "MEDIUM"}
        else:
            prediction_result = {"predicted_class": lower_prediction(top_prediction, bottom_prediction)}    

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
    async with websockets.serve(handle_websocket, "0.0.0.0", 8770):
        print("WebSocket Server running on ws://0.0.0.0:8770")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
