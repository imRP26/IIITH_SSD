#!/opt/homebrew/bin/python3

from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_manager, LoginManager, login_user, logout_user, \
                        login_required, UserMixin
import random
from datetime import datetime as dt


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SECRET_KEY'] = 'secretkey'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
_SEATS = ["A1","A2","A3","B1","B2","B3","C1","C2","C3","D1","D2","D3","E1","E2","E3","F1","F2","F3","G1","G2","G3","H1","H2","H3"]
_BOOKED = {}


class User(UserMixin, db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique=True, nullable=False)  
    name = db.Column(db.String(200))
    password = db.Column(db.String(100), nullable=False)


class Seats(db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
    uid = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  
    number = db.Column(db.String(5), nullable=False)
    is_free = db.Column(db.Boolean, nullable=False)
    book_time = db.Column(db.DateTime, nullable=True)

    @staticmethod
    def create(seatnum):
        new_seat = Seats(number=seatnum, is_free=True)
        db.session.add(new_seat)
        db.session.commit()


def main():
    with app.app_context():
        db.create_all()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/', methods=["GET"])
def hello_world():
    return render_template('signup.html')
    
    
def err(msg,typ=True):
    if typ:
        return {"errorMessage": msg}
    else:
        return {"message":msg}


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method=='GET':
        return render_template('signup.html')
    else:
        email = request.form.get('username')
        name = request.form.get('name')
        password = request.form.get('password')
        user = User.query.filter_by(username=email).first()
        if user:
            return err('Email address already exists')
            # return redirect(url_for('auth.signup'))
        new_user = User(username=email, name=name, \
                        password=password)
        db.session.add(new_user)
        db.session.commit()
        return err("Registered successfully",False) # redirect(url_for('auth.login'))


@app.route("/login", methods = ["POST", "GET"])
def do_login():
    if (request.method=="POST"):
        req = request.form
        print(req)
        username = req["un"]
        password = req["pwd"]
        check_user = User.query.filter_by(username = username).first()
        if check_user is not None:
            if (check_user.password == password):
                login_user(check_user)
                return redirect('/seats/available') # err("Logged in successfully",False)
            else:
                return err("Password is incorrect")
        else:
            return err("User does not exist")
    else:
        return render_template("login.html")


@app.route('/logout')
@login_required
def logout():
    logout_user()
    if session.get('was_once_logged_in'):
        del session['was_once_logged_in']
    return redirect('/login')


@login_required
@app.route("/seats/available", methods=["GET"])
def avl_seats():
    resp = []
    for st in _SEATS:
        resp.append({"seat":st,"price":100})
    return err({"seats":resp,"seatsAvailable":len(resp)},False)


@login_required
@app.route("/seats/book", methods=["POST"])
def book_seats():
    req = request.get_json()
    for seat in req["seats"]:
        usr = User.query.filter_by(username = req["customer"]["email"]).first()
        if _SEATS.find(seat) and usr is not None:
            _BOOKED[seat] = {"bid":random.randint(0, 24),"uid":usr.id,"datetime":dt.now()}
            _SEATS.remove(seat)
            return err("Booked Successfully")


@login_required
@app.route("/seats/booked", methods=["GET"])
def booked_seats():
    return err(_BOOKED,False)

    
@login_required
@app.route("/seats/booking/<bid>", methods=["GET"])
def check_seats():
    for b in _BOOKED:
        if _BOOKED[b]["bid"] == bid:
            return err({"bookingStatus":"BOOKED","bookingType":"ONLINE","booked ":_BOOKED[b]["uid"],"seat_num":b,"date":_BOOKED[b]["datetime"]},False)
    return err("Seat booking not found!")


@login_required
@app.route("/seats/cancel", methods=["POST"])
def cancel_seats():
    req = request.get_json()
    _SEATS.append(req["seat_id"])
    del _BOOKED[req["seat_id"]]


if __name__ == '__main__':
    main()
    app.run(host="127.0.0.1",port="5000",debug=True)
