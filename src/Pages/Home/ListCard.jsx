// Tour mới nhất
import React, { useEffect, useState } from "react";
import { Space, Spin } from "antd";
import { database } from "../../firebase";
import { getDatabase, ref, child, get, set } from "firebase/database";
import CardItem from "./Card";
import { Link } from "react-router-dom";
import url from "../../config";
import axios from "axios";

export default function ListCard() {
    const dbRef = ref(database);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/gettourtype.php?type=moi_nhat`);
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

    console.log(data);
    

    const ListCard = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "0 95px",
                    flexWrap: "wrap",
                }}
            >
                {data.map((item) => (
                    <Link to={`/detail/${item.id}`} key={item.id}>
                        <CardItem
                            price={item.price}
                            title={item.title}
                            depart={item.depart}
                            time={item.time}
                            priceOld={item.discount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price}
                            imgSrc={item.srcImg}
                        />
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div>
            <ListCard />
        </div>
    );
}
