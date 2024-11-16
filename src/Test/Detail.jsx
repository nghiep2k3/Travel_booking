import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../config';
import Test from './Test';
import { Spin } from 'antd';


export default function Detail() {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/detail_tour.php?id=1`);
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

    return (
        <div>
            <Test
                id={data.id}
                title={data.title}
                depart={data.depart}
                trip={data.trip}
                vehicle={data.vehicle}
                imgSrc={data.image_tour_detail}
                schedule={data.schedule}
                price_tour={data.price_tour}
            />
        </div>
    )
}
