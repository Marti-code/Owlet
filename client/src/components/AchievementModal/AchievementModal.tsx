import React, { useState } from "react";
import API, { UserInfoType } from "../../API";

import { AchievementMain } from "./AchievementModal.styles";

import {
  ModalOverlay,
  ModalContent,
  Modal,
  ModalContainer,
  ModalMain,
} from "../TeacherModal/TeacherModal.styles";

import { FormInfo, Heading } from "../../GlobalForm.styles";

interface ModalProps {
  src: string;
  title: string;
  info: string;
  hideModal: any;
}

const TeacherModal: React.FC<ModalProps> = ({
  src,
  title,
  info,
  hideModal,
}) => {
  const [date, setDate] = useState("");
  const [modalInfo, setModalInfo] = useState("");

  return (
    <Modal className={`AchievementModal`}>
      <ModalContainer>
        <ModalContent>
          <AchievementMain>
            <img
              style={{ width: "300px", height: "300px" }}
              src={src}
              alt="badge"
            />
            <Heading style={{ marginBottom: "5px" }}>{title}</Heading>
            <FormInfo>{info}</FormInfo>
          </AchievementMain>
        </ModalContent>
        <ModalOverlay onClick={hideModal}></ModalOverlay>
      </ModalContainer>
    </Modal>
  );
};

export default TeacherModal;
