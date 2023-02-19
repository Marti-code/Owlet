import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API, { UserInfoType } from "../../API";
import { Heading } from "../../GlobalForm.styles";
import ProfileHeader from "../Profile/ProfileHeader";
import "./Lessons.css";

const { DateTime } = require("luxon");

type Props = {
  userData: UserInfoType | undefined;
  currLesson: any;
  setCurrLesson: any;
};

const Lessons: React.FC<Props> = ({ userData, currLesson, setCurrLesson }) => {
  const [lessons, setLessons] = useState([
    {
      date: "",
      teacherMail: "",
      studentMail: "",
      lessonUrl: "",
    },
  ]);

  const navigate = useNavigate();

  const getDateDiff = (el: any) => {
    const givenDate = DateTime.fromISO(
      `${el.date.slice(6)}T${el.date.slice(0, 5)}:00`
    );

    const now = DateTime.local();
    const diffInSeconds = now.diff(givenDate, "seconds").toObject().seconds;

    return diffInSeconds;
  };

  useEffect(() => {
    if (!userData) return;

    getUserLessons(userData.mail);
  }, [userData]);

  const startLesson = async (
    url: any,
    emailT: any,
    emailS: any,
    lessonPoints: any
  ) => {
    setCurrLesson({
      teacherEmail: emailT,
      studentEmail: emailS,
      points: lessonPoints,
    });
    navigate("/room/" + url);
  };

  const getUserLessons = async (mail: string) => {
    const uData = await API.getLessons(mail);
    console.log(uData);
    uData.data.map((el: any, idx: any) => {
      if (idx == 0) {
        setLessons([...el.plannedLessons]);
      } else {
        setLessons([...lessons, ...el.plannedLessons]);
      }
    });
  };

  return (
    <div className={`Lessons ${userData?.theme || "light"}`}>
      <ProfileHeader userData={userData}></ProfileHeader>
      <>
        <div className="offers-grid">
          <div className="offers-content">
            {lessons.length > 0 && lessons[0].date != "" ? (
              lessons.map((el, key) => {
                return (
                  <div key={key} className="single-lesson">
                    <div>
                      <div className="lesson-header">
                        <div className="lesson-header-img"></div>
                        <div className="lesson-header-info">
                          <h2>Daisy</h2>
                          <p>
                            {el.date.slice(6)}, {el.date.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                      <div className="lesson-info">
                        <p>Matura podstawowa z matematyki, trygonometria</p>
                      </div>
                    </div>

                    {/* enable the button with the url from db when it time for the lesson */}
                    {/* ADD if user doesn't answer within 10min the lesson is canceled */}
                    {getDateDiff(el) > 0 && getDateDiff(el) < 3200 ? (
                      // <a href={"room/" + el.lessonUrl}>
                      //   <button type="button">Dołącz</button>
                      // </a>
                      <button
                        type="button"
                        onClick={() => {
                          startLesson(
                            el.lessonUrl,
                            el.teacherMail,
                            el.studentMail,
                            10
                          );
                        }}
                      >
                        Dołącz
                      </button>
                    ) : (
                      <button type="button" disabled>
                        Dołącz
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <Heading>Brak zaplanowanych lekcji</Heading>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Lessons;
