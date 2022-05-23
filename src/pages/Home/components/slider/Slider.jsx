import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { changeCurrentSlide } from "../../../../redux/images/images.slice";
import "./style.scss";

const Slider = ({ slides }) => {
  const dispatch = useDispatch();
  const [touchStart, setTouchStart] = useState()
  const currentSlide = useSelector((state)=> state.imagesReducer.currentSlide);

  const length = slides.length;

  const nextSlide = () => {
    dispatch(changeCurrentSlide({ length: length, direction: 'next' }))
  }

  const prevSlide = () => {
    dispatch(changeCurrentSlide({ length: length, direction: 'prev' }))
  }

  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  const handleTouchEnd = event => {
    const { changedTouches: endTouches } = event;
    if (endTouches[0].pageX < touchStart.pageX) {
      dispatch(changeCurrentSlide({ length: length, direction: 'next' }))
    } else {
      dispatch(changeCurrentSlide({ length: length, direction: 'prev' }))
    }
  }

  return (
    <div className="slider-container">
      <MdOutlineArrowBackIos
        className="left-arrow arrow left"
        onClick={prevSlide}
      />

      <MdOutlineArrowForwardIos
        className="right-arrow arrow right"
        onClick={nextSlide}
      />

      <div
        className="slider"
        onTouchStart={touchStartEvent => setTouchStart(touchStartEvent.changedTouches[0])}
        onTouchEnd={handleTouchEnd}
      >
        {slides?.map((slide, index) => {
          return (
            <div
              className={`slide ${index === currentSlide && "active"} ${
                index < currentSlide ? "prev" : index > currentSlide ? "next" : ""
              }`}
              key={index}
            >
              <img src={slide.url} alt={slide.title} className="image" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
