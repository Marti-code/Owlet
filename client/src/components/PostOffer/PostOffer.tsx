import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Dropdown,
  FormWrapper,
  Heading,
} from "../Login/Login.styles";

import "./PostOffer.css";

import API from "../../API";
import { UserInfoType } from "../../API";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject || !price) {
      console.log("Uzupełnij dane");
      return;
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
        navigate("/dashboard");
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
    <div className="PostOffer">
      <FormWrapper>
        <Heading>Oferta</Heading>

        <Form method="POST" onSubmit={handleSubmit}>
          <p>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Tytuł"
              required
              autoComplete="off"
            />
          </p>
          <p>
            {/* <Input
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              name="subject"
              placeholder="Przedmiot"
              required
              autoComplete="off"
            /> */}
            <Dropdown
              name="subjet"
              id="subjet"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              <option value="Matematyka">Matematyka</option>
              <option value="Fizyka">Fizyka</option>
              <option value="Angielski">Angielski</option>
              <option value="Polski">Polski</option>
              <option value="Historia">Historia</option>
              <option value="Niemiecki">Niemiecki</option>
              <option value="Biologia">Biologia</option>
              <option value="Chemia">Chemia</option>
              <option value="Geografia">Geografia</option>
            </Dropdown>
          </p>
          <p>
            <Input
              onChange={(e) => setInfo(e.target.value)}
              type="text"
              name="info"
              placeholder="Opis"
              autoComplete="off"
            />
          </p>
          <p>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="10"
              name="price"
              placeholder="Cena"
              required
              autoComplete="off"
            />
          </p>

          <p>Daty:</p>

          {dateItems.length > 0 &&
            dateItems.map((el, idx) => {
              return (
                <div
                  className="date-el"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p key={idx}>{el}</p>
                  <button
                    type="button"
                    style={{
                      display: dateItems[0] == "" ? "none" : "block",
                      margin: "10px",
                      height: "30px",
                      width: "30px",
                    }}
                    onClick={() => {
                      deleteDateEl(idx);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}

          <div className="time-date">
            <p style={{ height: "50px" }}>
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
                style={{ width: "50px", height: "50px", margin: "0" }}
              >
                add
              </button>
            </p>
          </div>

          <p style={{ margin: "auto", color: "red" }}>{errNote}</p>

          <p>
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
          </p>
        </Form>
      </FormWrapper>

      <div className="return-btn-container">
        <button id="return-btn">
          <a href="/dashboard">Powrót</a>
        </button>
      </div>
    </div>
  );
};

export default PostOffer;
