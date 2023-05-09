# -*- coding: utf-8 -*-

from ultralytics import YOLO
from PIL import Image
import json
import sys
import base64
from io import BytesIO
import os


def detect_waste(model, image):
    results = model.predict(source=image)
    data = results.pandas().xyxy[0].to_json(orient="records")
    return data


def upload_validate_waste_data(model, waste_data):
    waste_types = ["Green-waste", "Poultry-waste", "Processed-waste"]
    wasteFound = False
    wastes_array = []  # Initialize wastes_array with an empty list
    try:
        img = Image.open(waste_data)
        result = detect_waste(model, img)
        wastes_array = json.loads(result)
        print(f"Waste detection results: {wastes_array}", file=sys.stderr)
        for waste in wastes_array:
            if waste["name"] in waste_types:
                wasteFound = True
                return wasteFound, wastes_array
    except Exception as e:
        print(e, file=sys.stderr)
        wasteFound = False

    return wasteFound, wastes_array


if __name__ == "__main__":
    # Replace with your model path
    model = YOLO(os.path.join(os.path.dirname(__file__), "best.pt"))

    # Read image data from stdin as base64
    base64_image = sys.stdin.buffer.read()
    image_data = base64.b64decode(base64_image)
    image = Image.open(BytesIO(image_data))

    # Call upload_validate_waste_data with the model and image
    waste_detected, wastes_array = upload_validate_waste_data(model, image)
    print(json.dumps(
        {"waste_detected": waste_detected, "wastes_array": wastes_array}))
