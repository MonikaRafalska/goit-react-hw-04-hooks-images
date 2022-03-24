import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import { BallTriangle } from "react-loader-spinner";

const API_KEY = "25046418-504824fa9a0ce8e27b2b9010d";

function App() {
  const [images, setImages] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchImages = (searching, page) => {
    try {
      fetch(
        `https://pixabay.com/api/?&q=${searching}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((data) => data.json())
        .then((data) => {
          if (page === 1) {
            setImages(data.hits);
          } else {
            setImages((prevImg) => [...prevImg, ...data.hits]);
          } 
        })
        .finally(() => setIsLoading(true));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (evt) => {
    setPage(1);
    const value = evt.target.value;
    setSearchKey(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchImages(searchKey, page);
  };

  const loadMore = (evt) => {
    evt.preventDefault();
    setPage(page + 1);
  };

  const openModalWindow = (evt) => {
    if (evt.target.nodeName !== "IMG") {
      return;
    }
    setLargeImg(evt.target.dataset.img);
    setIsModalOpen(true);
  };

  const closeModalWithEsc = (evt) => {
    if (evt.code === "Escape") {
      setIsModalOpen(false);
    }
  };

  const closeModal = (evt) => {
    if (evt.target.nodeName === "IMG") {
      return;
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchImages(searchKey, page);
  }, [searchKey, page]);

  window.addEventListener("keydown", closeModalWithEsc);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} onChange={handleChange} />
      {isLoading === true ? (
        <ImageGallery items={images} openModal={openModalWindow} />
      ) : (
        <BallTriangle color="#00BFFF" height={80} width={80} />
      )}
      <Button loadMore={loadMore} />
      {isModalOpen === true ? (
        <Modal closeModal={closeModal} largeImg={largeImg}/>
      ) : (
        <></>
      )}
    </>
  );
}

App.propTypes = {
  images: PropTypes.array,
  searchKey: PropTypes.string,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  largeImg: PropTypes.string,
  isModalOpen: PropTypes.bool,
};
export default App;
