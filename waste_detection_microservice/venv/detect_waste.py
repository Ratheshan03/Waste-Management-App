from ultralytics import YOLO
from PIL import Image
import json
import base64
from io import BytesIO
from werkzeug.utils import secure_filename
import sys
import os
import numpy as np


def detect_waste(model, image, save_path='output', image_name='detected_image.jpg'):
    results = model(source=image)

    if len(results) > 0:
        result = results[0]

        if result.boxes:
            boxes = result.boxes.xyxy
            classes = result.boxes.cls
            confidences = result.boxes.conf
            names = [model.names[int(class_id)] for class_id in classes]
            detections = [{"name": name, "confidence": float(conf), "x1": float(x1), "y1": float(y1), "x2": float(
                x2), "y2": float(y2)} for name, (x1, y1, x2, y2), conf in zip(names, boxes, confidences)]

            waste_detected = True

            # Save the detected image
            if not os.path.exists(save_path):
                os.makedirs(save_path)
            output_image = Image.fromarray(np.uint8(result.orig_img))
            output_image_path = os.path.join(save_path, image_name)
            output_image.save(output_image_path)

            # Save the detected image in base64 format
            output_image_buffer = BytesIO()
            output_image.save(output_image_buffer, format="JPEG")
            output_image_base64 = base64.b64encode(
                output_image_buffer.getvalue()).decode("utf-8")

        else:
            detections = []
            waste_detected = False
    else:
        detections = []
        waste_detected = False

    return waste_detected, detections, output_image_base64


def upload_validate_waste_data(model, base64_image, save_path='output', image_name='detected_image.jpg'):
    waste_types = ["Green-waste", "Poultry-waste", "Processed-waste"]
    wasteFound = False
    wastes_array = []

    try:
        image_data = base64.b64decode(base64_image)
        image = Image.open(BytesIO(image_data))

        # Convert the image to JPEG format
        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        image = Image.open(buffer)

        waste_detected, wastes_array, output_image_base64 = detect_waste(
            model, image, save_path=save_path, image_name=image_name)

        print("Waste detected:", waste_detected, "Wastes array:", wastes_array)
        for waste in wastes_array:
            if waste["name"] in waste_types:
                wasteFound = True
                break
    except Exception as e:
        print(e, file=sys.stderr)
        wasteFound = False

    return wasteFound, wastes_array, output_image_base64
