import React from "react";
import style from "./Navbar.module.css";
import SrcImg from "../../img/banner1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCalendarWeek,
  faPlane,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {
  // Định dạng giá tiền
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm hàng nghìn
  };

  return (
    <div>
      <div className={style.Container}>
        <div className={style.Img}>
          <img style={{ transition: "transform 0.5s linear" }} src={props.imgSrc} alt="banner1" />
        </div>

        <div className={style.Text}>
          <div className={style.Text_title}>
            <b>
              {props.title}
            </b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b style={{ color: "#1ba0e2" }}>{formatPrice(props.price)}đ</b>
            <div>
              <FontAwesomeIcon
                icon={faTrain}
                size="lg"
                style={{ marginRight: "8px" }}
              />
              <FontAwesomeIcon icon={faPlane} size="lg" />
            </div>
          </div>
          <p style={{ textDecoration: "line-through" }}>
            {props.priceOld && formatPrice(props.priceOld)}đ
          </p>
          <p>
            <FontAwesomeIcon
              style={{ marginRight: "8px" }}
              icon={faCalendarDays}
            />
            {props.depart}
          </p>
          <p>
            <FontAwesomeIcon
              style={{ marginRight: "8px" }}
              icon={faCalendarWeek}
            />
            {props.time}
          </p>
        </div>
      </div>
    </div>
  );
}
