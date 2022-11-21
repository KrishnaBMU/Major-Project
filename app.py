from flask import Flask, request as req, jsonify, render_template, redirect, make_response
import requests

app = Flask(__name__)

backend_url = "http://localhost:5000"

@app.route("/login", methods=["GET","POST"])
def login():
    if req.method == "GET":
        return render_template("index.html")
    else:
        r = dict(req.form)
        email = r['email']
        password = r['password']
        print("Email: {}".format(email))
        print("Password: {}".format(password))
        
        r = requests.post(backend_url + "/login",json = {"email": email, "password": password})
        
        print(r.json())
        
        res = make_response(redirect("/"))
        res.set_cookie("auth", email)
        
        if r.status_code == 400:
            return render_template("index.html")
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
        
        res = make_response(redirect("/"))
        res.set_cookie("auth", email)
        
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
        return render_template("index.html")
    else:
        print("user has no cookies")
        return redirect("/login")
    
if __name__ == "__main__":
    app.run(port=3000, debug=True)