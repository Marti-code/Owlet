import React, { useState } from "react";
import API from "../../API";
import "./TeacherOffersModal.css";

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeacherOffersModal: React.FC<ModalProps> = ({
  setOpenModal
}) => {

  const [date, setDate] = useState("");
  const [modalInfo, setModalInfo] = useState("");

  return (
    <div className="TeacherModal">
      <div className="modal-container">
        <div className="teacher-modal">
          <div className="modal-header">
            <div className="modal-image"></div>
            <div className="modal-header-info">
              modal
            </div>
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
