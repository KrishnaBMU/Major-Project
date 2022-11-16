from flask import Flask, request as req, jsonify, render_template, redirect

app = Flask(__name__)

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/login/data", methods=['POST'])
def login_data():
    r = req.get_json()
    username = r['user']
    password = r['pass']
    print("Username: {}".format(username))
    print("Password: {}".format(password))
    return r

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/signup/data", methods=['POST'])
def signup_data():
    r = req.get_json()
    username = r['user']
    email = r['email']
    password = r['pass']
    cpassword = r['cpass']
    print("Username: {}".format(username))
    print("Email: {}".format(email))
    print("Password: {}".format(password))
    print("CPassword: {}".format(cpassword))
    return r

@app.route("/", methods = ["GET"])
def home():
    ## check cookie
    if req.cookies.get("auth"):
        print("user has cookies")
        return render_template("index.html")
    else:
        print("user has no cookies")
        return redirect("/login")
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)