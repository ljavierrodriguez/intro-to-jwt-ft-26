from flask import Blueprint, request, jsonify
from models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint("api", __name__)

@api.route('/register', methods=['POST'])
def register():

    datos = request.json
    email = datos.get('email')
    password = datos.get('password')

    if not email:
        return jsonify({"status": "fail", "message": "Email is required"}), 422
    
    if not password:
        return jsonify({"status": "fail", "message": "Password is required"}), 422

    found = User.query.filter_by(email=email).first()

    if found:
        return jsonify({"status": "fail", "message": "Email is already in use"}), 422
    
    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    user.save()

    if user:
        return jsonify({ "status": "success", "message": "Register Succesfully, please log in"}), 200
    
    return jsonify({"status":"fail", "message": "Please try again later"}), 400

@api.route('/login', methods=['POST'])
def login():

    datos = request.json

    email = datos.get('email')
    password = datos.get('password')

    if not email:
        return jsonify({"status": "fail", "message": "Email is required"}), 422
    
    if not password:
        return jsonify({"status": "fail", "message": "Password is required"}), 422

    found = User.query.filter_by(email=email).first()

    if not found:
        return jsonify({"status": "fail", "message": "Credentials are incorrects"}), 401

    if not check_password_hash(found.password, password):
        return jsonify({"status": "fail", "message": "Credentials are incorrects"}), 401
    
    datos = {
        "id": found.id,
        "email": found.email,
    }

    access_token = create_access_token(identity=datos)

    return jsonify({ "status": "success", "message": "Login successfully", "access_token": access_token, "user": found.serialize()}), 200

@api.route('/profile', methods=['GET'])
@jwt_required() # Definir la ruta como privada
def profile():

    datos = get_jwt_identity()

    user = User.query.filter_by(id=datos["id"]).first()
    
    return jsonify({"user": user.serialize()}), 200