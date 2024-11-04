from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

# Load the pre-trained model once when the app starts
model_path = os.path.join("models", "resnet_rice_final_model.keras")
model = tf.keras.models.load_model(model_path)

# Define your labels in the correct order based on the model's training data
labels = ["Bacterial Leaf Blight", "Leaf Blast", "Brown Spot","Healthy"]

def preprocess_image(image_bytes):
    # Preprocess the uploaded image to match model input shape and requirements
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # Resize to match model's expected input size
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
