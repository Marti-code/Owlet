import React, { useState } from "react";
import API from "../../API";
import "./TeacherOffersModal.css";

import { v4 as uuidv4 } from "uuid";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalMain,
  Modal,
  ModalContainer,
} from "../TeacherModal/TeacherModal.styles";
import { FormInfo, Heading } from "../../GlobalForm.styles";

type AcceptedBy = {
  name: string;
  teacher: string;
  date: string;
};

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  acceptedBy: AcceptedBy[];
  offerId: string;
  userData: any;
  getData: any;
  setRoomId: any;
}

const TeacherOffersModal: React.FC<ModalProps> = ({
  setOpenModal,
  acceptedBy,
  offerId,
  userData,
  getData,
  setRoomId,
}) => {
  const [modalInfo, setModalInfo] = useState("");

  const handleSubmit: any = async (mail: string, date: string) => {
    const inviteCode = uuidv4();
    setRoomId(inviteCode);
    const data = await API.planLesson(
      mail,
      date,
      userData.mail,
      offerId,
      inviteCode
    );

    console.log(data);

    if (data.ok) {
      setModalInfo("Zaplanowano lekcje!");
      getData();
      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    }
  };

  return (
    <Modal className={`TeacherModal ${userData?.theme || "light"}`}>
      <ModalContainer>
        <ModalContent>
          <div className="scroll-container">
            <div className="modal-header modal-offers-col">
              {acceptedBy.length > 0 ? (
                acceptedBy.map((el, i) => {
                  return (
                    <div className="single-modal-offer" key={i}>
                      <div
                        className="modal-image"
                        onClick={() => {
                          console.log(el.teacher);
                          console.log(userData.mail);
                          console.log(offerId);
                        }}
                      ></div>
                      <div className="modal-header-info">
                        <b>{el.teacher}</b>
                      </div>
                      <div className="modal-header-info">
                        {el.date.slice(6)} {el.date.slice(0, 5)}
                      </div>
                      <button
                        onClick={() => {
                          handleSubmit(el.teacher, el.date);
                        }}
                      >
                        Akceptuj oferte
                      </button>
                    </div>
                  );
                })
              ) : (
                <Heading>Brak ofert</Heading>
              )}
              <FormInfo>{modalInfo}</FormInfo>
            </div>
          </div>
        </ModalContent>
        <ModalOverlay
          className="modal-overlay"
          onClick={() => {
            setOpenModal(false);
          }}
        ></ModalOverlay>
      </ModalContainer>
    </Modal>
  );
};

export default TeacherOffersModal;
