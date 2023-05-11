from flask import Flask, request, jsonify
from detect_waste import upload_validate_waste_data
from ultralytics import YOLO
import os

app = Flask(__name__)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), "yolov8.pt")
model = YOLO(model_path)


@app.route('/')
def hello_world():
    return 'Hello, scrapsaver!'


@app.route("/detect_waste", methods=["POST"])
def detect_waste():
    data = request.get_json()
    print("Received image:", data["base64_image"][:100] + "...")

    if "base64_image" not in data:
        return jsonify({"error": "No image provided"}), 400

    base64_image = data["base64_image"]
    waste_detected, wastes_array, output_image_base64 = upload_validate_waste_data(  # Modify this line
        model, base64_image
    )

    return jsonify(
        {"waste_detected": waste_detected, "wastes_array": wastes_array,
            "output_image": output_image_base64}
    )


if __name__ == '__main__':
    app.run(debug=True)
