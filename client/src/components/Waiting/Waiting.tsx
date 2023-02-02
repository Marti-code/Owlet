import React, { useEffect, useState } from "react";
import API from "../../API";
import TeacherOffersModal from "../TeacherOffersModal/TeacherOffersModal";
import "./Waiting.css";

type Props = {
  userData: any;
};

type AcceptedBy = {
  name: string;
  mail: string;
  date: string;
}

type Offer = {
  subject: string;
  title: string;
  acceptedBy: AcceptedBy[];
};

const Waiting: React.FC<Props> = ({ userData }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userData) return;

    console.log("test");
    getUserOffers(userData.mail);
  }, [userData]);

  useEffect(() => {
    console.log(offers);
  }, [offers]);

  const getUserOffers = async (mail: string) => {
    const data = await API.getUserOffers(mail);

    setOffers(data.data);
  };

  return (
    <div className="waiting-wrapper">
      <>
        <h1>Oczekujace</h1>

        <div className="offers-grid">
          {offers &&
            offers.map((el) => {
              return <div key={el.title} className="single-offer">
                <span className="offer-title">{el.subject}</span>
                <span className="offer-title">{el.title}</span>
                <button onClick={() => {
                  setOpenModal(true);
                }}>Pokaz oferty</button>
              </div>;
            })}
        </div>

        {openModal && <TeacherOffersModal setOpenModal={setOpenModal} />}
      </>
    </div>
  );
};

export default Waiting;
