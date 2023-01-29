import React, { useState } from "react";
import "./TeacherModal.css";

interface ModalProps {
  userName: string;
  title: string;
  subject: string;
  info: string;
  hideModal: any;
}

const TeacherModal: React.FC<ModalProps> = ({
  userName,
  title,
  subject,
  info,
  hideModal,
}) => {
  return (
    <div className="TeacherModal">
      <div className="modal-container">
        <div className="teacher-modal">
          <div className="modal-header">
            <div className="modal-image"></div>
            <div className="modal-header-info">
              <h2>{userName}</h2>
              <h3>{subject + "-" + title}</h3>
            </div>
          </div>
          <div className="modal-main">
            <div className="modal-main-left">
              <p>Opis</p>
              <p>{info}</p>
            </div>
            <div className="modal-main-right">
              <p>Hours</p>
              <ul>
                <li>hi</li>
                <li>hi</li>
                <li>hi</li>
                <li>hi</li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button className="accept-offer" onClick={hideModal}>
              Akceptuj
            </button>
          </div>
        </div>
        <div className="modal-overlay" onClick={hideModal}></div>
      </div>
    </div>
  );
};

export default TeacherModal;
