import "./App.css";
import Navbar from "./components/navbar";
import Map from "./screens/map";
import Cars from "./screens/cars";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./screens/signup";
import Login from "./screens/login";
import Bills from "./screens/bills";
import Signup_Auto from "./screens/Signup_Auto";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUri } from "./redux/actions";
import Cartype1 from "./screens/cartype1";
import Messages from "./screens/messages";
import Admin from "./screens/admin";
import Home from "./screens/Home";
import FeedBack from "./screens/feedback";
import Logindrive from "./screens/logindrive"
import CabTrackingPage from "./screens/CabTrackingPage";
import Ride from "./screens/Ride";
import RideVideos from "./screens/RideVideos";
import CabHome from "./screens/CabHome";


function App() {
  let token = window.localStorage.getItem("token");
  let notToken = token == undefined;
  const [user, setuser] = useState();

  const getType = async (token) => {
    try {
      let type_user = await axios.get(serverUri + "/getuser", {
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });
      setuser(type_user?.data);
      console.log(type_user?.data);
      
    } catch (error) {
      console.log("cannot get type", error);
    }
  };

  useEffect(() => {
    getType(token);
  }, []);

  return (
    <Router>
      <Navbar type={user?.type} id={user?._id} />
      <StackContainer user={user} notToken={notToken} token={token} />
    </Router>
  );
}

const StackContainer = ({ user, notToken, token }) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/cabhome" 
      
      element={
        notToken ? (
          <Navigate to="/register" />
        ) : user?.type == 1 ? (
          <Cartype1
            cabid={user?._id}
            number={user?.email}
            place={user?.place}
            phone={user?.phone}
            avail={user?.available}
            token={token}
          />
        ) : user?.type == 2 ? (
          <Navigate to="/admin" />
        ) : (
          <CabHome />
        )
      }
      
      />

      <Route
        exact
        path="/map"
        element={
          notToken ? (
            <Navigate to="/register" />
          ) : user?.type == 1 ? (
            <Cartype1
              cabid={user?._id}
              number={user?.email}
              place={user?.place}
              phone={user?.phone}
              avail={user?.available}
              token={token}
            />
          ) : user?.type == 2 ? (
            <Navigate to="/admin" />
          ) : (
            <Map />
          )
        }
      />
      <Route
        path="/register_auto"
        element={!notToken ? <Navigate to="/cabs" /> : <Signup_Auto />}
      />
      <Route
        path="/register"
        element={!notToken ? <Navigate to="/cabs" /> : <Signup />}
      />
      <Route
        path="/cabs"
        element={
          notToken ? <Navigate to="/register" /> : <Cars token={token} />
        }
      />
      <Route
        path="/booking"
        element={notToken ? <Navigate to="/register" /> : <Bills />}
      />
      <Route
        path="/ride"
        element={notToken ? <Navigate to="/register" /> : <Ride token={token} />}
      />
      <Route
        path="/admin"
        element={
          notToken ? <Navigate to="/register" /> : <Admin token={token} />
        }
      />
       <Route
        path="/ride-videos"
        element={
          notToken ? <Navigate to="/register" /> : <RideVideos token={token} />
        }
      />
      <Route
        path="/messages"
        element={
          notToken ? (
            <Navigate to="/register" />
          ) : (
            <Messages messages={user?.msg} type={user?.type} token={token} />
          )
        }
      />
      <Route
        path="/feedbacks"
        element={
          notToken ? <Navigate to="/register" /> : <FeedBack token={token} />
        }
      />
      <Route
        path="/login"
        element={!notToken ? <Navigate to="/cabs" /> : <Login />}
      />
      <Route
        path="/logindrive"
        element={!notToken ? <Navigate to="/cabs" /> : <Logindrive />}
      />
      <Route
        path="/cablocation/:cabid"
        element={
          <CabTrackingPage/>
        }
      />
    </Routes>

  );
};

export default App;
