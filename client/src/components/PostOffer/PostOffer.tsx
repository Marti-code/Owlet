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
      hours
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

  const [datesList, setDatesList] = useState([""]);
  const [hours, setHours] = useState([""]);
  const [dates, setDates] = useState([""]);

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

  // const prepareDates = () => {
  //   //so the point is to get the time and date to the database somehow though I have to get those together
  //   //can't be empty since required so one less thing to worry about
  //   //for some reason only the last one is passed and the first one is always empty no matter how many arguments I add
  //   setDatesList([hours[0] + ";" + dates[0]]);

  //   for (let i = 1; i < hours.length; i++) {
  //     setDatesList([...datesList, hours[i] + ";" + dates[i]]);
  //   }

  //   console.log(dates);
  //   console.log(hours);
  // };

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
          <button onClick={addTimeAndDate} type="button">
            Add
          </button>
          {listItems.map((el) => el)}

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
              Oferta
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
