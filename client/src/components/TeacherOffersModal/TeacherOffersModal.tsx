import React, { useState } from "react";
import API from "../../API";
import "./TeacherOffersModal.css";

type AcceptedBy = {
  name: string;
  teacher: string;
  date: string;
}

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  acceptedBy: AcceptedBy[];
  offerId: string;
  userData: any
  getData: any;
}

const TeacherOffersModal: React.FC<ModalProps> = ({
  setOpenModal,
  acceptedBy,
  offerId,
  userData,
  getData
}) => {

  const [modalInfo, setModalInfo] = useState("");

  const handleSubmit: any = async(mail: string, date: string) => {
    console.log(userData);
    console.log(mail);
    console.log(date);
    console.log(userData.name);
    console.log(offerId);
    const data = await API.planLesson(mail, date, userData.mail, offerId);

    console.log(data);

    if (data.ok) {
      setModalInfo("Zaplanowano lekcje!");
      getData();
      setTimeout(() => {
        setOpenModal(false);
      }, 3000)
    }

  }

  return (
    <div className="TeacherModal">
      <div className="modal-container">
        <div className="teacher-modal">
          <div className="modal-header modal-offers-col">
            {acceptedBy && acceptedBy.map((el, i) => {
              return (
                <div className="single-modal-offer" key={i}>
                  <div className="modal-image"></div>
                  <div className="modal-header-info">
                    {el.teacher}, {el.date}
                  </div>
                  <button onClick={() => {
                    handleSubmit(el.name, el.teacher, el.date);
                  }}>Akceptuj oferte</button>
                </div>
              )
            })}
            
          </div>
        {modalInfo}
        </div>
        <div className="modal-overlay" onClick={() => {
          setOpenModal(false);
        }}></div>
      </div>
    </div>
  );
};

export default TeacherOffersModal;