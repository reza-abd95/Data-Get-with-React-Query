import React from "react";
import { Modal } from "antd";

function Modale({ email, isModalOpen, setIsModalOpen }) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{email}</p>
      </Modal>
    </>
  );
}

export default Modale;
