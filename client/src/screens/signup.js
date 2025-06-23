import { useEffect, useState } from "react";
import "../auth.css";
import { Link } from "react-router-dom";
import { signupUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import bgVideo from "../assets/vecteezy_a-perfect-creative-industry-animation_28716483.mp4"; // Adjust the path as needed


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [details, setDetails] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleValidation = (field, value) => {
    let errorMsg = "";
    switch (field) {
      case "email":
        errorMsg = !validateEmail(value) ? "Invalid email format" : "";
        break;
      case "password":
        errorMsg = !validatePassword(value)
          ? "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
          : "";
        break;
      case "confirmPassword":
        errorMsg = value !== password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleSubmit = () => {
    if (!errors.email && !errors.password && !errors.confirmPassword && email && password && confirmPassword) {
      dispatch(signupUser({ email, password }));
    }
  };

  const { msg, err } = useSelector((state) => state.authReducer);

  useEffect(() => {
    setDetails(msg || err);
  }, [msg, err]);

  const isFormValid = email && password && confirmPassword && !errors.email && !errors.password && !errors.confirmPassword;

  return (
    <div className="registerContainer" style={{ width: "900px"  }}>
       {/* Background Video */}
       <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="sec" >
        <div className="msg">{details}</div>
        <Link to="/">
          <div className="back">
            <ion-icon name="arrow-back-outline" style={{ fontSize: 30, color: "rgb(128, 128, 128)" }}></ion-icon>
          </div>
        </Link>
        <div className="innersection" style={{ width: "500px"  }}>
          <p className="head">Register User</p>
          <p className="sub">Complete the form to get a cab.</p>

          <div className="inputContainer">
            <label className="label">Email</label>
            <input
              className="inp"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleValidation("email", e.target.value);
              }}
              placeholder="something@example.com"
            />
            <p className="err">{errors.email}</p>
          </div>

          <div className="inputContainer">
            <label className="label">Password</label>
            <div className="inputBox">
              <input
                className="inp"
                type={showPass ? "password" : "text"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleValidation("password", e.target.value);
                }}
                placeholder="Enter password"
              />
              <div className="icon" onClick={() => setShowPass(!showPass)}>
                <ion-icon name={showPass ? "eye-outline" : "eye-off-outline"} style={{ fontSize: 30, color: "rgb(177, 177, 177)" }}></ion-icon>
              </div>
            </div>
            <p className="err">{errors.password}</p>
          </div>

          <div className="inputContainer">
            <label className="label">Confirm Password</label>
            <div className="inputBox">
              <input
                className="inp"
                type={showConfirmPass ? "password" : "text"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  handleValidation("confirmPassword", e.target.value);
                }}
                placeholder="Confirm password"
              />
              <div className="icon" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                <ion-icon name={showConfirmPass ? "eye-outline" : "eye-off-outline"} style={{ fontSize: 30, color: "rgb(177, 177, 177)" }}></ion-icon>
              </div>
            </div>
            <p className="err">{errors.confirmPassword}</p>
          </div>

          <button onClick={handleSubmit} className="btn" disabled={!isFormValid}>REGISTER</button>

          <Link to="/login" className="link">
            <span style={{ color: "black" }}>Already have an account?</span> Try Login
          </Link>
          <Link to="/register_auto" className="link">
            <span style={{ color: "black" }}>Need to register your vehicle?</span> Register Vehicle
          </Link>
        </div>
      </div>
      
    </div>
  );
}
