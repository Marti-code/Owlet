import React, { useEffect, useState } from "react";
import API from "../../API";
import TeacherOffersModal from "../TeacherOffersModal/TeacherOffersModal";
import "./Waiting.css";

type Props = {
  userData: any;
  getData: any;
};

type AcceptedBy = {
  name: string;
  teacher: string;
  date: string;
};

type Offer = {
  subject: string;
  title: string;
  acceptedBy: AcceptedBy[];
  _id: string;
};

const Waiting: React.FC<Props> = ({ userData, getData }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [curAcceptedBy, setCurAcceptedBy] = useState<AcceptedBy[]>([]);
  const [curOfferId, setCurOfferId] = useState("");
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
    <div className={`waiting-wrapper ${userData?.theme || "light"}`}>
      <>
        <h1>Oczekujace</h1>

        <div className="offers-grid">
          {offers &&
            offers.map((el) => {
              return (
                <div key={el.title} className="single-offer">
                  <span className="offer-title">{el.subject}</span>
                  <span className="offer-title">{el.title}</span>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setCurAcceptedBy(el.acceptedBy);
                      setCurOfferId(el._id);
                    }}
                  >
                    Pokaz oferty ({el.acceptedBy.length})
                  </button>
                </div>
              );
            })}
        </div>

        {openModal && (
          <TeacherOffersModal
            userData={userData}
            getData={getData}
            offerId={curOfferId}
            acceptedBy={curAcceptedBy}
            setOpenModal={setOpenModal}
          />
        )}
      </>
    </div>
  );
};

export default Waiting;
