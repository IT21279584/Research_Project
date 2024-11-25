from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

# Load the pre-trained model once when the app starts
model_path = os.path.join("models", "rice_disease.keras")
model = tf.keras.models.load_model(model_path)

# Define your labels in the correct order based on the model's training data set
labels = ["Bacterial Leaf Blight", "Brown Spot", "Healthy","Leaf Blast"]

def preprocess_image(image_bytes):
    # Preprocess the uploaded image to match model input shape and requirements
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # Resize to match model's expected input size
    img = np.expand_dims(img, axis=0)  # Adding batch dimension
    return img


