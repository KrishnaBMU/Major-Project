from flask import Flask, request as req, jsonify, render_template, redirect

app = Flask(__name__)

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/login/data", method=['POST'])
def login_data():
    r = req.get_json()
    username = r['user']
    password = r['pass']
    print("Username: {}".format(username))
    print("Password: {}".format(password))
    return r

    
@app.route("/register", methods = ["GET", "POST"])
def register():
    if req.method == "POST":
        username = req.form.get("username")
        email = req.form.get("email")
        password = req.form.get("password")
        ## add auth code here
        if username == password:
            print("register sucess")
        return render_template("signup.html")
    else:
        return render_template("signup.html")

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