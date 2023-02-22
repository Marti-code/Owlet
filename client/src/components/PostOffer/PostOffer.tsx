import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  FormWrapper,
  Label,
  Textarea,
  ButtonContainer,
} from "../../GlobalForm.styles";

import math from "./icons/cone.png";
import english from "./icons/english-language (1).png";
import geography from "./icons/globe.png";
import history from "./icons/ancient-scroll.png";
import physics from "./icons/atom.png";
import polish from "./icons/book.png";

import "./PostOffer.css";

import API from "../../API";
import { UserInfoType } from "../../API";
import { Link, useNavigate } from "react-router-dom";
import ProfileHeader from "../Profile/ProfileHeader";

type Profile = {
  userData: UserInfoType | undefined;
};

const PostOffer: React.FC<Profile> = ({ userData }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");

  const [btnState, setBtnState] = useState("");

  const [errNote, setErrNote] = useState("");
  const [subjectsErrNote, setSubjectsErrNote] = useState("");
  const [pointsErrNote, setPointsErrNote] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.theme == "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userPoints = userData?.points || 0;

    if (parseInt(price) > userPoints) {
      setPointsErrNote("Nie masz na tyle punktów na koncie");
      return;
    } else {
      setPointsErrNote("");
    }

    if (!title || !price) {
      console.log("Uzupełnij dane");
      return;
    }

    if (!subject) {
      setSubjectsErrNote("Wybierz przedmiot");
      return;
    } else {
      setSubjectsErrNote("");
    }

    if (dateItems[0] == "" || dateItems.length == 0) {
      setErrNote("Dodaj przynajmniej 1 datę");
      return;
    }

    const data = await API.postOfferFetch(
      title,
      subject,
      info,
      price,
      userData?.mail || "",
      dateItems
    );

    if (data.ok) {
      setBtnState("success");

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      setBtnState("error");
    }
  };

  const [dateItems, setDateImtes] = useState([""]);

  const [hours, setHours2] = useState("");
  const [dates, setDates2] = useState("");

  const handleAddDates = () => {
    if (hours == "" || dates == "") {
      setErrNote("Uzupełnij daty");
    } else {
      const fullDate = hours + ";" + dates;
      if (dateItems.includes(fullDate)) {
        setErrNote("Ta data już była");
      } else {
        setErrNote("");
        if (dateItems[0] == "") {
          setDateImtes([fullDate]);
        } else {
          setDateImtes([...dateItems, fullDate]);
        }
      }
    }
  };

  const deleteDateEl = (idx: number) => {
    dateItems.splice(idx, 1);
    setDateImtes([...dateItems]);
  };

  return (
    <div className={`PostOffer`}>
      <ProfileHeader userData={userData} />
      <FormWrapper>
        <Form method="POST" onSubmit={handleSubmit}>
          <div>
            <Label>
              Określ w 3 lub mniej słowach czego będzie dotyczyć lekcja
            </Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <Label>Z jakiego przedmiotu potrzebujesz pomocy?</Label>

            <div className="section over-hide z-bigger">
              <div className="pb-5">
                <div className="row justify-content-center pb-5">
                  <div className="col-12 pb-5">
                    <div className="subject-el">
                      <input
                        className="checkbox-tools"
                        type="radio"
                        name="subjects"
                        id="tool-1"
                        onClick={(e) => {
                          setSubject("Matematyka");
                        }}
                      />
                      <label className="for-checkbox-tools" htmlFor="tool-1">
                        <img src={math} alt="" />
                      </label>
                      <p>Matematyka</p>
                    </div>

                    <div className="subject-el">
                      <input
                        className="checkbox-tools"
                        type="radio"
                        name="subjects"
                        id="tool-2"
                        onClick={(e) => {
                          setSubject("Fizyka");
                        }}
                      />
                      <label className="for-checkbox-tools" htmlFor="tool-2">
                        <img src={physics} alt="" />
                      </label>
                      <p>Fizyka</p>
                    </div>

                    <div className="subject-el">
                      <input
                        className="checkbox-tools"
                        type="radio"
                        name="subjects"
                        id="tool-3"
                        onClick={(e) => {
                          setSubject("Angielski");
                        }}
                      />
                      <label className="for-checkbox-tools" htmlFor="tool-3">
                        <img src={english} alt="" />
                      </label>
                      <p>Angielski</p>
                    </div>

                    <div className="subject-el">
                      <input
                        className="checkbox-tools"
                        type="radio"
                        name="subjects"
                        id="tool-4"
                        onClick={(e) => {
                          setSubject("Polski");
                        }}
                      />
                      <label className="for-checkbox-tools" htmlFor="tool-4">
                        <img src={polish} alt="" />
                      </label>
                      <p>Polski</p>
                    </div>

                    <div className="subject-el">
                      <input
                        className="checkbox-tools"
                        type="radio"
                        name="subjects"
                        id="tool-5"
                        onClick={(e) => {
                          setSubject("Historia");
                        }}
                      />
                      <label className="for-checkbox-tools" htmlFor="tool-5">
                        <img src={history} alt="" />
                      </label>
                      <p>Historia</p>
                    </div>

                    <div className="subject-el">
                      <input
                        className="checkbox-tools"
                        type="radio"
                        name="subjects"
                        id="tool-6"
                        onClick={(e) => {
                          setSubject("Geografia");
                        }}
                      />
                      <label className="for-checkbox-tools" htmlFor="tool-6">
                        <img src={geography} alt="" />
                      </label>
                      <p>Geografia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p style={{ margin: "30px auto 0", color: "red" }}>
              {subjectsErrNote}
            </p>
          </div>
          <div>
            <Label>
              Opisz czego chciałbyś się nauczyć i ile czasu potrzebujesz...
            </Label>
            <Textarea
              onChange={(e) => setInfo(e.target.value)}
              name="info"
              autoComplete="off"
            />
          </div>
          <div>
            <Label>
              Ile jest warty poświęcony tobie czas? (10 punktów to minimalna
              cena)
            </Label>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="10"
              name="price"
              required
              autoComplete="off"
            />
            <p style={{ margin: "30px auto 0", color: "red" }}>
              {pointsErrNote}
            </p>
          </div>

          <div className="time-date">
            <Label>
              Kiedy lekcje mogłyby się odbyć? (Pamiętaj że to nauczyciel
              wybierze ostateczny termin z podanych poniżej)
            </Label>
            <p className="time-date-p">
              <Input
                onChange={(e) => setHours2(e.target.value)}
                type="time"
                name="time"
                placeholder="Czas"
                required
                autoComplete="off"
              />
              <Input
                onChange={(e) => setDates2(e.target.value)}
                type="date"
                name="date"
                placeholder="Data"
                required
                autoComplete="off"
              />
              <button
                onClick={handleAddDates}
                type="button"
                style={{ minWidth: "40px", minHeight: "40px", margin: "0" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
                </svg>
              </button>
            </p>
          </div>

          <div>
            <p>Daty:</p>

            <div className="dates-container">
              {dateItems.length > 0 &&
                dateItems.map((el, idx) => {
                  return (
                    <div
                      className="date-el"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <p
                        key={idx}
                        className="addedDate"
                        onClick={() => {
                          deleteDateEl(idx);
                        }}
                        style={{
                          display: dateItems[0] == "" ? "none" : "block",
                        }}
                      >
                        {el.slice(6)}, {el.slice(0, 5)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          <p style={{ margin: "auto", color: "red" }}>{errNote}</p>

          <ButtonContainer>
            <Link to="/">
              <button type="button">Anuluj</button>
            </Link>
            <button
              className={
                btnState == "success"
                  ? "button success animate"
                  : btnState == "error"
                  ? "button error animate"
                  : "button"
              }
              type="submit"
            >
              Zapisz
            </button>
          </ButtonContainer>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default PostOffer;
