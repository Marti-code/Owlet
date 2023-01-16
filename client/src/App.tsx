import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProfile from './components/EditProfile/EditProfile';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Main from './components/Room/Main';
import { GlobalStyle } from "./GlobalStyles";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";


function App() {

  const { loggedIn, setLoggedIn, userData, setUserData, loading, getData} = useIsLoggedIn();

  return (
    <div className="App">
      <Routes>
        <Route path='/sign-up' element={<Register isLoggedIn={loggedIn}/>} />
        <Route path='/sign-in' element={<Login isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserData={setUserData}/>} />
        <Route path='/dashboard' element={<Profile isLoggedIn={loggedIn} userData={userData} />}/>
        <Route path='/dashboard/edit' element={<EditProfile isLoggedIn={loggedIn} userData={userData} loading={loading} getData={getData}/>}/>
        <Route path='/' element={<Main />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
