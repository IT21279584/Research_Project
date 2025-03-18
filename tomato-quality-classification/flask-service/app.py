from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Ensure 'temp' directory exists
if not os.path.exists("temp"):
    os.makedirs("temp")

# Load the pre-trained Keras model
model = load_model('tomato.keras')

# Define the class names in the correct order based on the training setup
class_names = ["HIGH", "LOW", "MEDIUM"]  # Assuming model output is in this order

# Define confidence threshold
CONFIDENCE_THRESHOLD = 0.7

def prepare_image(image_path):
    image = load_img(image_path, target_size=(227, 227))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file1' not in request.files or 'file2' not in request.files:
        return jsonify({"error": "Two image files (file1 and file2) are required"}), 400
    
    file1 = request.files['file1']
    file2 = request.files['file2']
    
    if file1.filename == '' or file2.filename == '':
        return jsonify({"error": "Both images must be provided"}), 400

    # Save both files temporarily
    file1_path = os.path.join("temp", file1.filename)
    file2_path = os.path.join("temp", file2.filename)
    file1.save(file1_path)
    file2.save(file2_path)
    
    # Prepare and predict on each image
    image1 = prepare_image(file1_path)
    image2 = prepare_image(file2_path)
    
    predictions1 = model.predict(image1)
    predictions2 = model.predict(image2)
    
    # Clean up after predictions
    os.remove(file1_path)
    os.remove(file2_path)
    
    # Determine individual predictions
    pred1_class_index = np.argmax(predictions1)
    pred2_class_index = np.argmax(predictions2)
    pred1_class = class_names[pred1_class_index]
    pred2_class = class_names[pred2_class_index]
    
    # Get confidence scores
    confidence1 = float(predictions1[0][pred1_class_index])
    confidence2 = float(predictions2[0][pred2_class_index])
    
    # Check confidence threshold
    if confidence1 < CONFIDENCE_THRESHOLD or confidence2 < CONFIDENCE_THRESHOLD:
        final_class = "Uncertain"
    else:
        # Determine final classification based on hierarchy
        if (pred1_class == "LOW" and pred2_class == "HIGH") or (pred1_class == "HIGH" and pred2_class == "LOW"):
            final_class = "LOW"
        elif (pred1_class == "HIGH" and pred2_class == "MEDIUM") or (pred1_class == "MEDIUM" and pred2_class == "HIGH"):
            final_class = "MEDIUM"
        elif (pred1_class == "LOW" and pred2_class == "MEDIUM") or (pred1_class == "MEDIUM" and pred2_class == "LOW"):
            final_class = "LOW"
        elif pred1_class == "HIGH" and pred2_class == "HIGH":
            final_class = "HIGH"
        elif pred1_class == "MEDIUM" and pred2_class == "MEDIUM":
            final_class = "MEDIUM"
        elif pred1_class == "LOW" and pred2_class == "LOW":
            final_class = "LOW"
        else:
            final_class = "Uncertain"
    
    # Format individual results
    individual_results = []
    for i, predictions in enumerate([predictions1, predictions2], start=1):
        class_index = np.argmax(predictions)
        individual_results.append({
            "image": f"file{i}",
            "predicted_class": class_names[class_index],
            "confidence": float(predictions[0][class_index]),
            "probabilities": {class_names[j]: float(predictions[0][j]) for j in range(len(class_names))}
        })
    
    return jsonify({
        "individual_results": individual_results,
        "final_result": {
            "predicted_class": final_class,
            "probabilities": {class_names[i]: float((predictions1 + predictions2)[0][i] / 2) for i in range(len(class_names))} if final_class != "Uncertain" else {}
        }
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5007, debug=True)