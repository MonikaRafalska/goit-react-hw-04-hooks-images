import React from "react";
import styles from "./Modal.module.css"

function Modal (props) {
  // render() {
    const { largeImg, closeModal } = props;

    return (
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
          <img src={largeImg} alt="" />
        </div>
      </div>
    );
  }
// }

export default Modal;
