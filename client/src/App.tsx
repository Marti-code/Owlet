import { Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile/EditProfile";
import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Main from "./components/Room/Main";
import { GlobalStyle } from "./GlobalStyles";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import VideoCall from "./components/Room/VideoCall";
import PostOffer from "./components/PostOffer/PostOffer";
import Waiting from "./components/Waiting/Waiting";
import Lessons from "./components/Lessons/Lessons";

function App() {
  const { loggedIn, setLoggedIn, userData, setUserData, loading, getData } =
    useIsLoggedIn();
  const [inCall, setInCall] = useState(true);
  const [roomId, setRoomId] = useState("1");

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<Register isLoggedIn={loggedIn} />} />
        <Route
          path="/sign-in"
          element={
            <Login
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <VideoCall
              setInCall={setInCall}
              userName={"John"}
              roomId={roomId}
              setRoomId={setRoomId}
              userData={userData}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Profile
              setRoomId={setRoomId}
              roomId={roomId}
              userData={userData}
              setUserData={setUserData}
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              getData={getData}
            />
          }
        />
        <Route
          path="/dashboard/edit"
          element={
            <EditProfile
              isLoggedIn={loggedIn}
              userData={userData}
              loading={loading}
              getData={getData}
            />
          }
        />
        <Route path="/post-offer" element={<PostOffer userData={userData} />} />
        <Route
          path="/waiting"
          element={<Waiting getData={getData} userData={userData} />}
        />
        <Route
          path="/lessons"
          element={<Lessons getData={getData} userData={userData} />}
        />
        <Route path="/" element={<Main />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
