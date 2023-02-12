import React, { useState } from "react";
import API, { UserInfoType } from "../../API";
import "./RadioBtns.css";

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
              <div className="section over-hide z-bigger">
                <div className="pb-5">
                  <div className="row justify-content-center pb-5">
                    <div className="col-12 pb-5">
                      {timeArr &&
                        timeArr.map((el: any, idx: any) => {
                          return (
                            <div className="subject-el" key={idx}>
                              <input
                                className="checkbox-tools"
                                type="radio"
                                name="chosenTime"
                                value={el}
                                id={"tool-" + idx}
                                defaultChecked={idx == 0 ? true : false}
                                onChange={(e) => {
                                  if (e.currentTarget.checked)
                                    setDate(e.currentTarget.value);
                                }}
                              />
                              <label
                                className="for-checkbox-tools"
                                htmlFor={"tool-" + idx}
                              >
                                {el}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              {/* <ul>
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
              </ul> */}
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
