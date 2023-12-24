from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

app = Flask(__name__)
app.secret_key = "secret key"
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root@localhost/first_flusk_crud"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app=app)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(100))

    def __init__(self, name, email, phone):
        super().__init__()
        self.name = name
        self.email = email
        self.phone = phone

@app.route("/")
def index():
    employees = Employee.query.order_by(desc(Employee.id)).all()

    return  render_template("index.html", employees=employees)

@app.route("/add", methods=["POST"])
def add():
    if request.method == "POST":
        empl = Employee(
            request.form["name"],
            request.form["email"],
            request.form["phone"]
        )

        db.session.add(empl)
        db.session.commit()

    return redirect(url_for("index"))

@app.route("/update/<int:id>", methods=["POST"])
def update(id):
    if request.method == "POST":
        empl = Employee.query.get(id)

        empl.name = request.form["name"]
        empl.email = request.form["email"]
        empl.phone = request.form["phone"]

        db.session.commit()

    return redirect(url_for("index"))

@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    if request.method == "POST":
        empl = Employee.query.get(id)

        db.session.delete(empl)

        db.session.commit()

    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(port=5000, debug=True)