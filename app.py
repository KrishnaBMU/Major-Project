from flask import Flask, request as req, jsonify, render_template, redirect, make_response
import requests
from cryptography.fernet import Fernet
from flask_cors import CORS

app = Flask(__name__)
key = b'NenVg62wVWiBGvsT6NjExht5iNEYnzMUHiQH8-4e0vw='
cipher_suite = Fernet(key)

backend_url = "http://127.0.0.1:5000"
CORS(app)

@app.route("/login", methods=["GET","POST"])
def login():
    if req.method == "GET":
        return render_template("login.html")
    else:
        r = dict(req.form)
        email = r['email']
        password = r['password']
        print("Email: {}".format(email))
        print("Password: {}".format(password))
        
        r = requests.post(backend_url + "/login",json = {"email": email, "password": password})
        
        print(r.json())
        
        email_c = cipher_suite.encrypt(email.encode()).decode()
        res = make_response(redirect("/"))
        res.set_cookie("auth", email_c)
        res.set_cookie("name", email)
        
        if r.status_code == 400:
            return render_template("login.html")
        else:
            return res

@app.route("/signup", methods = ["GET", "POST"])
def signup():
    if req.method == "GET":
        return render_template("signup.html")
    else:    
        r = dict(req.form)

        email = r['email']
        password = r['password']
        cpassword = r['cpassword']
        
        print("Email: {}".format(email))
        print("Password: {}".format(password))
        print("CPassword: {}".format(cpassword))
        
        r = requests.post(backend_url + "/signup",json = {"email": email, "password": password})
        
        print(r.json())
        email_c = cipher_suite.encrypt(email.encode()).decode()
        res = make_response(redirect("/"))
        res.set_cookie("auth", email_c)
        res.set_cookie("name", email)
        
        if r.status_code == 400:
            return render_template("signup.html")
        else:
            return res


@app.route("/logout", methods = ["GET"])
def logout():
        res = make_response(redirect("/login"))
        res.delete_cookie("auth")
        return res

@app.route("/", methods = ["GET"])
def home():
    ## check cookie
    if req.cookies.get("auth") != None:
        print("user has cookies")
        return render_template("index2.html")
    else:
        print("user has no cookies")
        return redirect("/login")
    
if __name__ == "__main__":
    app.run(port=3000, debug=True)