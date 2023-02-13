import React, { useState } from "react";
import API, { UserInfoType } from "../../API";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalMain,
  Modal,
  ModalContainer,
  ModalSubHeaders,
} from "./TeacherModal.styles";

import { Heading } from "../../GlobalForm.styles";

interface ModalProps {
  userName: string;
  title: string;
  subject: string;
  info: string;
  hideModal: any;
  timeArr: string[];
  id: string;
  userMail: string | undefined;
  userData: UserInfoType | undefined;
}

const TeacherModal: React.FC<ModalProps> = ({
  userName,
  title,
  subject,
  info,
  hideModal,
  timeArr,
  id,
  userMail,
  userData,
}) => {
  const [date, setDate] = useState("");
  const [modalInfo, setModalInfo] = useState("");

  const handleAccept = async () => {
    if (date == "") return;

    let data;

    if (userMail)
      data = await API.sendOfferRequest(userMail, date, id);

    if (data.ok) {
      setModalInfo("Wysałno propozycję nauczania. ");
    } else {
      setModalInfo("Wystąpił błąd");
    }
  };

  return (
    <Modal className={`TeacherModal ${userData?.theme || "light"}`}>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <Heading>{subject + "-" + title}</Heading>
          </ModalHeader>
          <ModalMain>
            <div>
              <ModalSubHeaders>Opis</ModalSubHeaders>
              <p>{info}</p>
            </div>
            <div>
              <ModalSubHeaders>Dostępne godziny:</ModalSubHeaders>
              <ul>
                {timeArr &&
                  timeArr.map((el: any, key: any) => {
                    return (
                      <div key={el}>
                        <input
                          type="radio"
                          value={el}
                          name="chosenTime"
                          onChange={(e) => {
                            if (e.currentTarget.checked)
                              setDate(e.currentTarget.value);
                          }}
                        />
                        {el}
                      </div>
                    );
                  })}
              </ul>
            </div>
          </ModalMain>
          <ModalFooter>
            <button className="accept-offer" onClick={handleAccept}>
              Akceptuj
            </button>
          </ModalFooter>
          {modalInfo}
        </ModalContent>
        <ModalOverlay onClick={hideModal}></ModalOverlay>
      </ModalContainer>
    </Modal>
  );
};

export default TeacherModal;