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
model = load_model('guawa.keras')

# Define the class names in the correct order based on the training setup
class_names = ["high", "low", "medium"]  # Assuming model output is in this order

# Define a helper to get the "lower" label based on a sorted order
def get_lower_label(class1, class2):
    order = {"high": 2, "medium": 1, "low": 0}  # Assign numeric values for easy comparison
    if order[class1] < order[class2]:
        return class1
    return class2

def prepare_image(image_path):
    # Load the image with target size
    image = load_img(image_path, target_size=(227, 227))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file1' not in request.files or 'file2' not in request.files:
        print("Error: Both images are required.")
        return jsonify({"error": "Two image files (file1 and file2) are required"}), 400
    
    file1 = request.files['file1']
    file2 = request.files['file2']
    
    if file1.filename == '' or file2.filename == '':
        print("Error: Missing file name for one of the images.")
        return jsonify({"error": "Both images must be provided"}), 400

    # Save both files temporarily
    file1_path = os.path.join("temp", file1.filename)
    file2_path = os.path.join("temp", file2.filename)
    file1.save(file1_path)
    file2.save(file2_path)
    
    print(f"Received files: {file1.filename} and {file2.filename}")
    
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

    # Determine the final label when images have different labels
    if pred1_class != pred2_class:
        final_class = get_lower_label(pred1_class, pred2_class)
        print(f"Images have different labels: {pred1_class} vs {pred2_class}. Using the lower label: {final_class}")
    else:
        # If both images have the same class, use that class
        final_class = pred1_class
        print(f"Both images have the same label: {final_class}")

    # Calculate average confidence for the final class
    average_predictions = (predictions1 + predictions2) / 2.0
    final_class_index = class_names.index(final_class)
    average_confidence = float(average_predictions[0][final_class_index])

    # Format individual results for each image
    individual_results = []
    for i, predictions in enumerate([predictions1, predictions2], start=1):
        class_index = np.argmax(predictions)
        individual_results.append({
            "image": f"file{i}",
            "predicted_class": class_names[class_index],
            "confidence": float(predictions[0][class_index]),
            "probabilities": {class_names[j]: float(predictions[0][j]) for j in range(len(class_names))}
        })

    print(f"Predictions for Image 1: {predictions1}")
    print(f"Predictions for Image 2: {predictions2}")
    print(f"Averaged predictions: {average_predictions}")
    print(f"Final predicted class (with lower label rule): {final_class}, confidence: {average_confidence}")

    return jsonify({
        "individual_results": individual_results,
        "final_result": {
            "predicted_class": final_class,
            "average_confidence": average_confidence,
            "probabilities": {class_names[i]: float(average_predictions[0][i]) for i in range(len(class_names))}
        }
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5005, debug=True)
