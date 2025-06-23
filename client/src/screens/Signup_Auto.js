import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signupAuto, signupUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Signup_Auto() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [place, setplace] = useState("");
  const [errmsg, setErr] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [details, setDetails] = useState("");
  const [file, setfile] = useState();
  let enable = false;

  const dispatch = useDispatch();

  if (email != "" && password != "" && phone != "" && place != "") {
    enable = true;
  }

  const passCheck = (password) => {
    if (email != "" && password != "" && phone != "" && place != "") {
      if (password.length > 5) {
        setErr("");
        dispatch(signupAuto({ email, password, phone, place, file }));
      } else {
        setErr("password must be 8 characters long");
      }
    } else {
      setErr("Fields cannot be empty");
    }
  };

  const { msg, err } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (msg != undefined) {
      setDetails(msg);
      // setTimeout(() => {
      //   window.location.href = "/logindrive";
      // }, [2000]);
    } else {
      setDetails(err);
    }
  }, [msg, err]);

  return (
    <div className="registerContainer" >
      <div className="sec" style={{ height: "96%" }}>
        <div className="msg">{details}</div>
        <Link to="/">
          <div className="back">
            <ion-icon
              name="arrow-back-outline"
              style={{ fontSize: 30, color: "rgb(128, 128, 128)" }}
            ></ion-icon>
          </div>
        </Link>
        <div className="innersection" style={{ width: "100px", marginLeft: "-1500px"  }}>
          <p className="head" style={{ width: "600px"  }}>Register Your Vehicle</p>
          <div className="inputContainer" style={{ width: "300px"  }}>
            <label className="label">Place</label>
            <input
              className="inp"
              value={place}
              onChange={(e) => setplace(e.target.value)}
            />
          </div>
          <div className="inputContainer" style={{ width: "300px"  }}>
            <label className="label">Phone Number</label>
            <input
              className="inp"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className="inputContainer" style={{ width: "300px"  }}>
            <label className="label">Vehicle Number</label>
            <input
              className="inp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputContainer" style={{ width: "300px"  }}>
            <label className="label">Registration Certificate</label>
            <input
              className="inpfile"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
            />
          </div>
          <div className="inputContainer" style={{ width: "300px"  }}>
            <label className="label">Password</label>
            <div className="inputBox">
              <input
                className="inp"
                value={password}
                type={showPass ? "password" : "type"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="xxxxxxxxx"
              />
              <div className="icon"  onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <ion-icon
                    name="eye-outline"
                    style={{ fontSize: 30, color: "rgb(177, 177, 177)" }}
                  ></ion-icon>
                ) : (
                  <ion-icon
                    name="eye-off-outline"
                    style={{ fontSize: 30, color: "rgb(177, 177, 177)" }}
                  ></ion-icon>
                )}
              </div>
            </div>
            <p className="err" style={{ width: "300px"  }}>{errmsg}</p>
          </div>
          <button
            onClick={() => passCheck(password)}
            data-state={enable}
            className="btn"
            style={{ width: "300px"  }}
          >
            REGISTER
          </button>

          <Link to="/login" className="link" style={{ width: "300px"  }}>
            <span style={{ color: "black" }}>Already having an account?</span>{" "}
            Try Login
          </Link>
          <Link to="/register" className="link" style={{ width: "300px"  }}>
            <span style={{ color: "black" }}>If you are an user</span> Register
            user
          </Link>
        </div>
      </div>
      <div className="sec color"></div>
    </div>
  );
}
