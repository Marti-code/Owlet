import React, { useEffect, useState } from "react";
import API from "../../API";
import { Heading } from "../../GlobalForm.styles";
import ProfileHeader from "../Profile/ProfileHeader";
import TeacherOffersModal from "../TeacherOffersModal/TeacherOffersModal";
import "./Waiting.css";

type Props = {
  userData: any;
  getData: any;
  roomId: any;
  setRoomId: any;
};

type AcceptedBy = {
  teacherName: string;
  teacher: string;
  date: string;
};

type Offer = {
  subject: string;
  title: string;
  acceptedBy: AcceptedBy[];
  _id: string;
};

const Waiting: React.FC<Props> = ({ userData, getData, roomId, setRoomId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [curAcceptedBy, setCurAcceptedBy] = useState<AcceptedBy[]>([]);
  const [curOfferId, setCurOfferId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userData) return;

    getUserOffers(userData.mail);
  }, [userData]);

  const getUserOffers = async (mail: string) => {
    const data = await API.getUserOffers(mail);
    console.log(data)
    setOffers(data.data);
  };

  useEffect(() => {
    console.log(curAcceptedBy);
  }, [curAcceptedBy])

  return (
    <div className={`Waiting ${userData?.theme || "light"}`}>
      <ProfileHeader></ProfileHeader>
      <>
        <div className="offers-grid">
          <div className="offers-content">
            {offers.length > 0 ? (
              offers.map((el) => {
                return (
                  <div key={el.title} className="single-offer">
                    <Heading className="offer-subject">{el.subject}</Heading>
                    <span className="offer-title">{el.title}</span>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setCurAcceptedBy(el.acceptedBy);
                        setCurOfferId(el._id);
                      }}
                    >
                      Oferty ({el.acceptedBy.length})
                    </button>
                  </div>
                );
              })
            ) : (
              <Heading>Brak oczekujących lekcji</Heading>
            )}
          </div>
        </div>

        {openModal && (
          <TeacherOffersModal
            userData={userData}
            getData={getData}
            offerId={curOfferId}
            acceptedBy={curAcceptedBy}
            setOpenModal={setOpenModal}
            setRoomId={setRoomId}
          />
        )}
      </>
    </div>
  );
};

export default Waiting;
