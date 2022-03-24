import React from "react";
import styles from "./ImageGallery.module.css"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { nanoid } from "nanoid";

function ImageGallery ({ items, openModal }) {
  return (
    <ul className={styles.imageGallery} onClick={openModal}>
      {items.map(({ webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={nanoid()}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
