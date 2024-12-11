# from flask import Flask, request, send_file
# import qrcode
# from io import BytesIO

# app = Flask(__name__)

# @app.route('/generate_qr', methods=['GET'])
# def generate_qr():
#     data = request.args.get('data')
#     if not data:
#         return {"error": "Missing 'data' query parameter"}, 400

#     # Generate QR code
#     qr = qrcode.QRCode(
#         version=1,
#         error_correction=qrcode.constants.ERROR_CORRECT_L,
#         box_size=10,
#         border=4,
#     )
#     qr.add_data(data)
#     qr.make(fit=True)

#     # Save QR code to an in-memory stream
#     img = qr.make_image(fill_color="black", back_color="white")
#     img_io = BytesIO()
#     img.save(img_io, 'PNG')
#     img_io.seek(0)

#     # Serve the image
#     return send_file(img_io, mimetype='image/png')

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
import qrcode
from io import BytesIO
import base64
from flask_cors import CORS  # Import the CORS package

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate_qr', methods=['GET'])
def generate_qr():
    data = request.args.get('data')
    if not data:
        return {"error": "Missing 'data' query parameter"}, 400

    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Save QR code to an in-memory stream
    img = qr.make_image(fill_color="black", back_color="white")
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    # Convert image to base64 string
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')

    # Return the base64-encoded image
    return jsonify({"qr_code": img_base64})

if __name__ == '__main__':
    app.run(debug=True)
