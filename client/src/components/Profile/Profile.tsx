import "./Profile.css";
import React, { useState, useEffect } from "react";

import logo from "../Room/logo1.png";
import API from "../../API";

import { v4 as uuidv4 } from "uuid";
import { UserInfoType } from "../../API";
import { Link, useNavigate } from "react-router-dom";

type Profile = {
  isLoggedIn: boolean;
  setLoggedIn: any;
  userData: UserInfoType | undefined;
  setRoomId: any;
  roomId: string;
};

const Profile: React.FC<Profile> = ({
  isLoggedIn,
  userData,
  setRoomId,
  setLoggedIn,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(userData?.theme || "light");

  const [userOffersArr, setUserOffersArr] = useState([""]);

  let userSubjects: string[] = [];
  let userOffers: any[] = [];

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userData);
    getCurrentTheme();
    handleGetSubjects().then(() => {
      handleGetOffers();
    });

    if (!isLoggedIn) navigate("/sign-in");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("/sign-in");
  }, [isLoggedIn]);

  function handleCreateRoom(e: any) {
    e.preventDefault();

    const inviteCode = uuidv4();

    setRoomId(inviteCode);
    navigate(`/room/${inviteCode}`);
  }

  async function getCurrentTheme() {
    const d = await API.getUserThemeFetch(userData?.mail || "");
    setTheme(d.theme);
  }

  function toggleTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  const handleTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    toggleTheme();

    const data = await API.putTheme(
      theme == "light" ? "dark" : "light",
      userData?.mail || ""
    );

    if (data.ok) {
      console.log("zmiana");
    } else {
      console.log("coś nie tak");
    }
  };

  const handleGetSubjects = async () => {
    const data = await API.getSubjects(userData?.mail || "");
    userSubjects = data.subjects;
  };

  const handleGetOffers = async () => {
    handleGetSubjects();

    userSubjects.forEach(async (subject: any) => {
      const data = await API.getChosenOffers(subject);

      data.offers.forEach((el: any, id: any) => {
        userOffers.push(el);
      });

      setUserOffersArr([...userOffers]);
    });

    console.log("refreshed");
  };

  if (!isLoggedIn) {
    return <div>Musisz najpierw się zalogować!</div>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`Profile ${theme}`}>
      <div className="Dashboard">
        <header className="profile-header">
          <div className="header-content">
            <div className="header-logo">
              <div className="logo">
                <img src={logo} alt="Site Logo" />
              </div>
            </div>
            <div className="header-links">
              <div className="header-menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`header-links-a ${menuOpen ? "open" : "closed"}`}>
                <div className="header-link">
                  <a href="#">Pomóż</a>
                </div>
                <div className="header-link">
                  <a href="/post-offer">Otrzymaj pomoc</a>
                </div>
                <div className="header-link">
                  <a href="#">Chat grupowy</a>
                </div>
              </div>
            </div>
            <div className="header-user-pic">
              <div className="user-pic"></div>
            </div>
          </div>
        </header>
        <main id="profile-main">
          <div className="main-content">
            {/* COLUMN 1 */}
            {/* user info */}
            <section className="user-info-container">
              <div className="user-info-content">
                <div className="user-info-header">
                  <div className="user-info-id">
                    <p>ID: 12345</p>
                  </div>
                  <div className="user-info-pic">
                    <div className="u-pic"></div>
                  </div>
                </div>

                <div className="user-info-main">
                  <div className="user-info-name">
                    <p>{userData && userData.name}</p>
                  </div>

                  <div className="user-info-subjects">
                    <p>Przedmioty:</p>
                    <p>Matematyka, Fizyka</p>
                  </div>

                  <div className="user-info-teach">
                    <p>Nauczał: 15h</p>
                  </div>

                  <div className="user-info-learn">
                    <p>Uczył się: 10h</p>
                  </div>
                </div>

                <div className="user-info-edit">
                  <button id="theme-edit-btn" onClick={handleTheme}>
                    Motyw
                  </button>
                  <button id="user-info-edit-btn">
                    <Link to="edit">Edytuj</Link>
                  </button>
                  <button
                    id="user-info-edit-btn"
                    onClick={() => {
                      localStorage.removeItem("user");
                      setLoggedIn(false);
                    }}
                  >
                    Wyloguj
                  </button>
                </div>
              </div>
            </section>

            {/* hours left */}
            <section className="hours-left-container">
              <div className="hours-left-content">
                <div className="hours-left-number">
                  <p>4</p>
                </div>
                <div className="hours-left-text">
                  <p>Liczba dostępnych godzin na naukę</p>
                </div>
              </div>
            </section>

            {/* deal */}
            <section className="deal-container">
              <div className="deal-text">
                <p>Poleć znajomemu i zyskaj 2 darmowe godziny!</p>
              </div>
            </section>

            {/* COLUMN 2 */}
            {/* teachers */}
            <section className="teachers-container">
              <div className="teachers-content">
                <div className="teachers-header">
                  <p>Wybrane dla ciebie</p>
                  <button onClick={handleGetOffers}>refresh</button>
                </div>
                <div className="teachers-list">
                  {/* insert offers here */}
                  {userOffersArr.length > 0 &&
                    userOffersArr.map((el: any, key: any) => {
                      if (el != "") {
                        return (
                          <div className="teacher-el" key={key}>
                            <div className="teacher-pic">
                              <div className="t-pic"></div>
                            </div>
                            <div className="teacher-info">
                              <div className="teacher-name">
                                {el.authorName[0].name}
                              </div>
                              <div className="teacher-subject">
                                {el.subject} - {el.title}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </section>

            {/* friends */}
            <section className="friends-container">
              <div className="friends-content">
                <div className="friends-header">
                  <p>Znajomi</p>
                </div>
                <div className="friends-list">
                  <div className="friend-el">
                    <div className="friend-pic">
                      <div className="f-pic"></div>
                    </div>
                    <div className="friend-name">Piotr</div>
                  </div>

                  <div className="friend-el">
                    <div className="friend-pic">
                      <div className="f-pic"></div>
                    </div>
                    <div className="friend-name">Iga</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <div className="feedback-btn-container">
          <button id="feedback-btn" onClick={handleCreateRoom}>
            Feedback
          </button>
        </div>
      </div>
      {/* {inCall ? (
        <VideoCall setInCall={setInCall} userName={"John"} roomId={roomId} />
      ) : (
        //insert profile here
      )} */}
    </div>
  );
};

export default Profile;
