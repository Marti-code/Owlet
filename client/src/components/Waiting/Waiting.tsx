import React, { useEffect, useState } from "react";
import API from "../../API";
import "./Waiting.css";

type Props = {
  userData: any;
};

type Offer = {
  subject: string;
  title: string;
};

const Waiting: React.FC<Props> = ({ userData }) => {
  const [offers, setOffers] = useState<Offer[]>([]);

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
    <div>
      <>
        <h1>Oczekujace</h1>

        <div className="offers-grid">
          {offers &&
            offers.map((el) => {
              return <div className="single-offer">
                <span className="offer-title">{el.subject}</span>
                <span className="offer-title">{el.title}</span>
              </div>;
            })}
        </div>
      </>
    </div>
  );
};

export default Waiting;
