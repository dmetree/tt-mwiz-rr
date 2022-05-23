import { useSelector, useDispatch } from "react-redux";
import { changeCurrentSlide } from "../../../../redux/images/images.slice";
import "./style.scss";

function IconNav({ slides }) {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state) => state.imagesReducer.currentSlide);

  return (
    <div className="nav-container">
      {slides?.map((slide, index) => {
        return (
          <div
            className={`nav-icon ${currentSlide === index && "active"}`}
            key={index}
            onClick={() => dispatch(changeCurrentSlide({ newCurrent: index }))}
          >
            <img
              src={slide.thumbnailUrl}
              alt={slide.title}
              className="icon-image"
            />
            <p className="icon-text">{slide.title.split(" ")[0]}</p>
          </div>
        );
      })}
    </div>
  );
}

export default IconNav;
