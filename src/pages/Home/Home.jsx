import { useEffect } from "react";
import Slider from "./components/slider/Slider";
import IconNav from "./components/icon-nav/IconNav";

import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../../redux/images/images.slice";
import "./styles.scss";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchImages());
  }, []);

  const sliderImages = useSelector((state)=> state.imagesReducer.images);

  return (
    <div className="wrapper">
      <h1>MASTER WiZR Modules</h1>
      <IconNav slides={sliderImages} />
      <Slider slides={sliderImages} />
    </div>
  );
}

export default Home;
