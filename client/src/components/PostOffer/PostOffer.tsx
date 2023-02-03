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

    const data = await API.postOfferFetch(
      title,
      subject,
      info,
      price,
      userData?.mail || "",
      dates,
      hours,
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

  const [hours, setHours] = useState([""]);
  const [dates, setDates] = useState([""]);
  const [dateItems, setDateImtes] = useState([""]);

  const [hours2, setHours2] = useState("");
  const [dates2, setDates2] = useState("");

  const [listItems, setListItems] = useState([
    <div className="time-date" key={0}>
      <p>
        <Input
          onChange={(e) => setHours([e.target.value])}
          type="time"
          name="time"
          placeholder="Czas"
          required
          autoComplete="off"
        />
        <Input
          onChange={(e) => setDates([e.target.value])}
          type="date"
          name="date"
          placeholder="Data"
          required
          autoComplete="off"
        />
      </p>
    </div>,
  ]);

  const addTimeAndDate = () => {
    listItems.push(
      <div className="time-date" key={listItems.length}>
        <p>
          <Input
            onChange={(e) => setHours([...hours, e.target.value])}
            type="time"
            name="time"
            placeholder="Czas"
            required
            autoComplete="off"
          />
          <Input
            onChange={(e) => setDates([...dates, e.target.value])}
            type="date"
            name="date"
            placeholder="Data"
            required
            autoComplete="off"
          />
        </p>
      </div>
    );

    setListItems([...listItems]);
  };

  const handleAddDates = () => {
    if (hours2 == "" || dates2 == "") {
      setErrNote("Uzupełnij daty");
    } else {
      const fullDate = hours2 + ";" + dates2;
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
          {/* <button onClick={addTimeAndDate} type="button">
            Dodaj daty
          </button> */}

          {/* {listItems.map((el) => el)} */}
          <p>Daty:</p>
          {dateItems.map((el) => (
            <p>{el}</p>
          ))}

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
