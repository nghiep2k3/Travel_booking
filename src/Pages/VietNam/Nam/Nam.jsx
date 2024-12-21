// Tour nước ngoài
import React, { useEffect, useState } from "react";
import CardItem from "../../../Component/Card/Card";
import { Space, Spin } from "antd";
import { Link } from "react-router-dom";
import url from "../../../config";
import axios from "axios";
export default function Nam() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/gettourtype.php?type=mien_nam`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 280,
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const ListCard3 = () => {
    const DataKeys = Object.keys(data);
    const dataToDisplay = DataKeys.slice(0, 4);

    //Hiển thị giới hạn
    // return (
    //   <div>
    //     {dataToDisplay.map((productKey) => (
    //       <Card
    //         key={productKey}
    //         name={data[productKey].name}
    //         price={data[productKey].price}
    //         imgSrc={data[productKey].img}
    //       />
    //     ))}
    //   </div>
    // );

    //Hiển thị tất cả
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "0 95px",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(data).map((item) => (
          <Link to={`detail/${data[item].id}`}>
            <CardItem
              key={data[item]}
              time={data[item].time}
              depart={data[item].depart}
              price={data[item].price}
              priceOld={data[item].discount ? (data[item].price * (1 - data[item].discount / 100)).toFixed(2) : data[item].price}
              title={data[item].title}
              imgSrc={data[item].srcImg}
            />
          </Link>
        ))}
      </div>
    );
  };
  return (
    <div>
      <ListCard3></ListCard3>
    </div>
  );
}
