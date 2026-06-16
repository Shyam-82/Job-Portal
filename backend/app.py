from flask import Flask, jsonify, request
from flask_cors import CORS
from database.db import db, cursor

import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)

SECRET_KEY = "student_job_portal_secret"


@app.route("/")
def home():
    return "Flask Server Running Successfully"


# ======================
# REGISTER
# ======================
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    skills = data.get("skills")
    password = data.get("password")

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    query = """
INSERT INTO users
(name,email,skills,password,role)
VALUES (%s,%s,%s,%s,%s)
"""

    values = (
    name,
    email,
    skills,
    hashed_password.decode("utf-8"),
    "student"
)

    try:

        cursor.execute(query, values)
        db.commit()

        return jsonify({
            "message": "User Registered Successfully"
        })

    except Exception:
        return jsonify({
            "message": "Email already exists"
        })


# ======================
# LOGIN
# ======================
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    query = """
    SELECT * FROM users
    WHERE email=%s
    """

    cursor.execute(query, (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({
            "message": "Invalid Email"
        })

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        return jsonify({
            "message": "Invalid Password"
        })

    token = jwt.encode(
        {
            "user_id": user["id"],
            "email": user["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    user_data = {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "skills": user["skills"],
        "role": user["role"]
    }

    return jsonify({
        "message": "Login Successful",
        "token": token,
        "user": user_data
    })
@app.route("/jobs/<int:user_id>", methods=["GET"])
def get_jobs(user_id):

    cursor.execute(
        "SELECT skills FROM users WHERE id=%s",
        (user_id,)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify([])

    user_skills = []

    if user["skills"]:
        user_skills = [
            skill.strip().lower()
            for skill in user["skills"].split(",")
        ]

    cursor.execute("SELECT * FROM jobs")

    jobs = cursor.fetchall()

    for job in jobs:

        job_skills = [
            skill.strip().lower()
            for skill in job["skills"].split(",")
        ]

        matched = len(
            set(user_skills) &
            set(job_skills)
        )

        compatibility = int(
            (matched / len(job_skills)) * 100
        )

        job["compatibility"] = compatibility

    return jsonify(jobs)
@app.route("/apply-job", methods=["POST"])
def apply_job():

    data = request.json

    user_id = data.get("user_id")
    job_id = data.get("job_id")

    query = """
    INSERT INTO applications
    (user_id, job_id)
    VALUES (%s, %s)
    """

    cursor.execute(
        query,
        (user_id, job_id)
    )

    db.commit()

    return jsonify({
        "message": "Application Submitted Successfully"
    })

@app.route("/my-applications/<int:user_id>")
def my_applications(user_id):

    query = """
    SELECT
        applications.id,
        jobs.title,
        jobs.company,
        jobs.location,
        applications.status

    FROM applications

    JOIN jobs
    ON applications.job_id = jobs.id

    WHERE applications.user_id = %s
    """

    cursor.execute(query, (user_id,))

    data = cursor.fetchall()

    return jsonify(data)

@app.route("/all-applications/<int:user_id>")
def all_applications(user_id):

    cursor.execute(
        "SELECT role FROM users WHERE id=%s",
        (user_id,)
    )

    user = cursor.fetchone()

    if not user or user["role"] != "hr":
        return jsonify({
            "message": "Access Denied"
        }), 403

    query = """
    SELECT
        applications.id,
        users.name,
        users.email,
        jobs.title,
        applications.status

    FROM applications

    JOIN users
    ON applications.user_id = users.id

    JOIN jobs
    ON applications.job_id = jobs.id
    """

    cursor.execute(query)

    data = cursor.fetchall()

    return jsonify(data)

@app.route("/update-status", methods=["POST"])
def update_status():

    data = request.json

    application_id = data.get("application_id")
    status = data.get("status")

    query = """
    UPDATE applications
    SET status=%s
    WHERE id=%s
    """

    cursor.execute(
        query,
        (status, application_id)
    )

    db.commit()

    return jsonify({
        "message": "Status Updated"
    })

print(app.url_map)


if __name__ == "__main__":
    app.run(debug=True, port=8000)