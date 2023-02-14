import React, { useEffect, useState } from "react";

import API, { UserInfoType } from "../../API";
import { Heading } from "../../GlobalForm.styles";
import ProfileHeader from "../Profile/ProfileHeader";
import "./Lessons.css";

type Props = {
  userData: UserInfoType | undefined;
};

const Lessons: React.FC<Props> = ({ userData }) => {
  const [lessons, setLessons] = useState([
    {
      date: "",
      teacherMail: "",
      studentMail: "",
      lessonUrl: "",
    },
  ]);

  useEffect(() => {
    if (!userData) return;

    getUserLessons(userData.mail);
  }, [userData]);

  // const [currDate, setCurrDate] = useState("");

  // useEffect(() => {
  //   let today = new Date();
  //   let month = today.getMonth() + 1;
  //   let year = today.getFullYear();
  //   let day = today.getDate();
  //   let hours = today.getHours();
  //   let minutes = today.getMinutes();
  //   let dateTime =
  //     (hours < 10 ? "0" + hours : hours) +
  //     ":" +
  //     (minutes < 10 ? "0" + minutes : minutes) +
  //     ";" +
  //     year +
  //     "-" +
  //     (month < 10 ? "0" + month : month) +
  //     "-" +
  //     (day < 10 ? "0" + day : day);

  //   setCurrDate(dateTime);
  // }, []);

  const getUserLessons = async (mail: string) => {
    const uData = await API.getLessons(mail);

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
      <ProfileHeader></ProfileHeader>
      <>
        <div className="offers-grid">
          <div className="offers-content">
            {lessons &&
              lessons.map((el, key) => {
                return (
                  <div key={key} className="single-offer">
                    <Heading className="offer-subject">{el.date}</Heading>
                    <span className="offer-title">{el.teacherMail}</span>
                    <span className="offer-title">{el.lessonUrl}</span>

                    {/* enable the button with the url from db when it time for the lesson */}
                    {/* ADD if user doesn't answer within 15min the lesson is canceled */}
                    {new Date() >
                    new Date(
                      `${el.date.slice(6)}T${el.date.slice(0, 5)}:00Z`
                    ) ? (
                      <button type="button">
                        <a href={el.lessonUrl}>Dołącz</a>
                      </button>
                    ) : (
                      <button type="button" disabled>
                        Dołącz
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </div>
  );
};

export default Lessons;
