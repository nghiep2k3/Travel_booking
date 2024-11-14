import React, { useState } from "react";
import { Input, Button, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchBar = () => {
    const [options, setOptions] = useState([]);
    const data = [
        {
            "id": 1,
            "title": "Tour Đà Nẵng - Hội An",
            "price": "5000000.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/53916-1315037279.jpg?v=1529554090113"
        },
        {
            "id": 2,
            "title": "Tour Hà Nội - Sapa",
            "price": "7000000.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/anam-resort-nha-trang-vietnam-23.jpg?v=1529554176777"
        },
        {
            "id": 3,
            "title": "Tour Phú Quốc",
            "price": "6000000.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/grand-britain-europe-tour-5-min.jpg?v=1529553857067"
        },
        {
            "id": 4,
            "title": "Tour Đà Lạt",
            "price": "4000000.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/83864b64404979-5ad0e1bdba9b2.jpg?v=1529553163227"
        },
        {
            "id": 5,
            "title": "Tour Nha Trang",
            "price": "5500000.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/0r2a5723.jpg?v=1529553943837"
        },
        {
            "id": 6,
            "title": "Tour Hạ Long",
            "price": "6500000.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/1-large1.jpg?v=1529553697103"
        },
        {
            "id": 9,
            "title": "Hồ Chí Minh 2",
            "price": "100.00",
            "srcImg": "https://bizweb.dktcdn.net/thumb/large/100/299/077/products/1-large1.jpg?v=1529553697103"
        }
    ];


    const handleSearch = (value) => {
        if (value) {
            const filteredOptions = data
                .filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
                .map((item) => ({
                    value: item.title,
                    label: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={item.srcImg} alt={item.title} style={{ width: 40, height: 40, marginRight: 10 }} />
                            <div>
                                <div>{item.title}</div>
                                <div style={{ color: "gray" }}>Giá: {item.price}</div>
                            </div>
                        </div>
                    ),
                }));
            setOptions(filteredOptions);
        } else {
            setOptions([]);
        }
    };

    return (
        <div>
            <AutoComplete
                style={{
                    width: "420px",
                    marginLeft: "-20px",
                }}
                options={options}
                onSearch={handleSearch}
                popupClassName="custom-dropdown"  // Thay đổi `dropdownClassName` thành `popupClassName`
            >
                <Search
                    placeholder="Tìm kiếm tại đây..."
                    allowClear
                    enterButton={
                        <Button
                            type="submit"
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                height: "38px",
                            }}
                        >
                            <SearchOutlined style={{ fontSize: "18px" }} />
                        </Button>
                    }
                    style={{
                        height: "35px",
                        backgroundColor: "transparent",
                    }}
                />
            </AutoComplete>
        </div>
    );
};

export default SearchBar;
