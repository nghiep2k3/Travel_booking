import React, { useEffect, useState } from 'react'
import url from '../../../config';
import axios from 'axios';

export default function ListOrderTour() {
    const [data, setData] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/tour.php`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>ListOrderTour</div>
    )
}
