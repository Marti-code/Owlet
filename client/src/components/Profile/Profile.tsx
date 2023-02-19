import "./Profile.css";
import React, { useState, useEffect, useRef } from "react";

import API from "../../API";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faSun,
  faMoon,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

import { UserInfoType } from "../../API";
import { Link, useNavigate } from "react-router-dom";

import TeacherModal from "../TeacherModal/TeacherModal";
import ProfileHeader from "./ProfileHeader";
import { Heading } from "../../GlobalForm.styles";

type Profile = {
  isLoggedIn: boolean;
  setLoggedIn: any;
  userData: UserInfoType | undefined;
  setUserData: any;
  setRoomId: any;
  roomId: string;
  getData: any;
};

const Profile: React.FC<Profile> = ({
  isLoggedIn,
  userData,
  setUserData,
  setRoomId,
  setLoggedIn,
  getData,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(userData?.theme || "light");
  const [userPoints, setUserPoints] = useState(userData?.points || 0);

  const ref = useRef(0)

  const [userOffersArr, setUserOffersArr] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    userName: "",
    subject: "",
    title: "",
    info: "",
    hours: [""],
    id: "",
  });

  let userOffers: any[] = [];
  let userSubjects: string[] = [];

  const navigate = useNavigate();

  useEffect(() => {

    console.log(userData);
    getCurrentTheme();
    handleGetPoints();
    handleGetSubjects().then(() => {
      handleGetOffers();
    });

    getData();
  }, []);

  useEffect(() => {
    console.log(userOffersArr)
  }, [userOffersArr])

  useEffect(() => {

    if (ref.current === 0) {
      ref.current = ref.current + 1;
      return;
    }
    
    if (!isLoggedIn) navigate("/sign-in");
  }, [isLoggedIn]);

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

    setUserData({ ...userData, theme: theme });
    console.log(theme);
    console.log(userData);

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
      const data = await API.getChosenOffers(subject, userData?.mail);
      console.log(data);

      data.offers.forEach((el: any) => {
        userOffers.push(el);
      });

      console.log(userOffers);

      setUserOffersArr(userOffers);
    });

    console.log("refreshed");
  };

  const handleGetPoints = async () => {
    const data = await API.getPoints(userData?.mail || "");
    setUserPoints(data.points);
  };

  const toggleModal = (
    userName: string,
    title: string,
    subject: string,
    info: string,
    hours: [],
    id: string
  ) => {
    setIsOpen(!isOpen);
    modalInfo.userName = userName;
    modalInfo.title = title;
    modalInfo.subject = subject;
    modalInfo.info = info;
    modalInfo.hours = hours;
    modalInfo.id = id;
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  if (!isLoggedIn) {
    return <div>Musisz najpierw się zalogować!</div>;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`Profile ${theme || "light"}`}>
      <div className="Dashboard">
        <ProfileHeader userData={userData} />

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
                    <div className="u-pic">
                      <img
                        src={`/assets/${userData?.profileImage}`}
                        alt={userData?.profileImage}
                      />
                    </div>
                  </div>
                </div>

                <div className="user-info-main">
                  <div className="user-info-name">
                    <p>{userData && userData.name}</p>
                  </div>

                  <div className="user-info-subjects">
                    <p>
                      <b>Przedmioty:</b>
                    </p>
                    <p>
                      {userData?.subjects.length
                        ? userData.subjects.map((el: any) => {
                            return el + " ";
                          })
                        : "brak"}
                    </p>
                  </div>

                  <div className="user-info-teach">
                    <b>Osiągnięcia:</b>
                    <br></br>
                    <br></br>
                  </div>

                  {/* <div className="user-info-learn">
                    <p>Uczył się: 10h</p>
                  </div> */}
                </div>
              </div>
              <div className="user-info-edit">
                <button id="user-info-edit-btn" onClick={handleTheme}>
                  {theme == "light" ? (
                    <FontAwesomeIcon icon={faSun} />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} />
                  )}
                </button>
                <Link to="edit">
                  <button id="user-info-edit-btn">
                    <FontAwesomeIcon icon={faUserEdit} />
                  </button>
                </Link>
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
            </section>

            {/* hours left */}
            <section className="hours-left-container">
              <div className="hours-left-content">
                <div className="hours-left-number">
                  <p>{userPoints || 0}</p>
                </div>
                <div className="hours-left-text">
                  <p>Liczba dostępnych punktów na naukę</p>
                </div>
              </div>
            </section>

            {/* deal */}
            <section className="deal-container">
              <div className="deal-text">
                <p>Poleć znajomemu i zyskaj 50 punktów!</p>
              </div>
            </section>

            {/* COLUMN 2 */}
            {/* teachers */}
            <section className="teachers-container">
              <div className="teachers-content">
                <div className="teachers-header">
                  <p>Wybrane dla ciebie</p>
                  <button onClick={handleGetOffers}>
                    <FontAwesomeIcon icon={faRefresh} />
                  </button>
                </div>
                <div className="teachers-list">
                  {userOffersArr.length > 0 ? (
                    userOffersArr.map((el: any, key: any) => {
                      
                        return (
                          <div
                            className="teacher-el"
                            key={key}
                            onClick={() => {
                              toggleModal(
                                el.authorName[0].name,
                                el.subject,
                                el.title,
                                el.info,
                                el.dates,
                                el._id
                              );
                            }}
                          >
                            <div className="teacher-pic">
                              <div className="t-pic">
                              <img src={`/assets/${el.authorName[0].profileImage}`} alt={el.authorName[0].profileImage} />
                              </div>
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

                    })
                  ) : (
                    <Heading>Brak ofert</Heading>
                  )}
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
          <button id="feedback-btn">Feedback</button>
        </div>
      </div>
      {isOpen && (
        <TeacherModal
          userName={modalInfo.userName}
          title={modalInfo.title}
          subject={modalInfo.subject}
          info={modalInfo.info}
          hideModal={hideModal}
          timeArr={modalInfo.hours}
          id={modalInfo.id}
          userMail={userData?.mail}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Profile;
