import React from "react";
import styles from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ id, webformatURL, largeImageURL, tags }) {
  return (
    <li key={id} className={styles.imageGaleryItem}>
      <img
        className={styles.imageGalleryItem_image}
        src={webformatURL}
        data-img={largeImageURL}
        alt={tags}
      />
    </li>
  );
}

export default ImageGalleryItem;
