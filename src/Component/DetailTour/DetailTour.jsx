import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./DetailTour.module.css";
import { Space, Spin, message } from "antd";
import { useParams } from 'react-router-dom';

import {
    Carousel,
    Button,
    InputNumber,
    DatePicker,
    Modal,
    Form,
    Input,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faCalendarWeek,
    faPaperPlane,
    faPhone,
    faPlane,
    faTrain,
} from "@fortawesome/free-solid-svg-icons";

import TextArea from "antd/es/input/TextArea";
import url from "../../config";
import axios from "axios";

export default function DetailTour() {
    const [data, setData] = useState();
    const { id_tour } = useParams();
    console.log(`${url}/detail_tour.php?id=${id_tour}`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/detail_tour.php?id=${id_tour}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // format price
    const formatCurrency = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
        return `${formattedPrice}`;
    };
    useEffect(() => {
        // Cuộn trang lên đầu mỗi khi chuyển trang bằng Link
        window.scrollTo(0, 0);
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef();

    const handleSlideChange = (slideIndex) => {
        if (slideIndex >= 0 && slideIndex < 3) {
            setCurrentSlide(slideIndex);
            carouselRef.current.goTo(slideIndex);
        }
    };

    // Onchange button Price, quantity
    const [Adult, setAdult] = useState("0");
    const [Baby, setBaby] = useState("0");
    const [Baby2, setBaby2] = useState("0");
    const [TotalMoney, setTotalMoney] = useState(0);

    const [quantityTicket, setQuantityTicket] = useState();
    const [ticket1, setTicket1] = useState(0);
    const [ticket2, setTicket2] = useState(0);
    const [ticket3, setTicket3] = useState(0);
    const [ticketArray, setTicketArray] = useState([
        {
            Adult: {
                title: 'Người lớn',
                quantity: ticket1
            },
            Baby: {
                title: 'Trẻ em',
                quantity: ticket2
            },
            Baby2: {
                title: 'Em bé',
                quantity: ticket3
            },
        }
    ])

    console.log(22222222222, ticketArray);


    const onChangeAdult = (value) => {
        const priceNumber = parseFloat(`${formatCurrency(data.price_tour[0].price)}`.replace(/\./g, ""));
        let x = priceNumber;

        setTicket1(value);
        const totalPrice = value * x;
        const formattedPrice = totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        setAdult(formattedPrice);
        console.log("Số lượng người lớn:", value, "Giá tiền:", formattedPrice);
        setQuantityTicket(ticket1 + ticket2 + ticket3);
        setTicketArray((prevArray) =>
            prevArray.map((ticket) => ({
                ...ticket,
                Adult: {
                    ...ticket.Adult,
                    quantity: value,
                },
            }))
        );
    };

    const onChangeBaby = (value) => {
        const priceNumber = parseFloat(`${formatCurrency(data.price_tour[0].priceEmBe)}`.replace(/\./g, ""));
        let x = priceNumber;
        console.log(1111, value);
        setTicket2(value);
        const totalPrice = value * x;
        const formattedPrice = totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        setBaby(formattedPrice);
        console.log('Số lượng trẻ em":', value, "Giá tiền:", formattedPrice);
        setQuantityTicket(ticket1 + ticket2 + ticket3);
        setTicketArray((prevArray) =>
            prevArray.map((ticket) => ({
                ...ticket,
                Baby: {
                    ...ticket.Baby,
                    quantity: value,
                },
            }))
        );
    };

    const onChangeBaby2 = (value) => {
        const priceNumber = parseFloat(`${formatCurrency(data.price_tour[0].priceTreEm)}`.replace(/\./g, ""));
        let x = priceNumber;
        setTicket3(value);
        const totalPrice = value * x;
        const formattedPrice = totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        setBaby2(formattedPrice);
        console.log('Số lượng em bé":', value, "Giá tiền:", formattedPrice);
        setQuantityTicket(ticket1 + ticket2 + ticket3);
        setTicketArray((prevArray) =>
            prevArray.map((ticket) => ({
                ...ticket,
                Baby2: {
                    ...ticket.Baby2,
                    quantity: value,
                },
            }))
        );
    };

    const [dateString, setDateString] = useState();
    const convertDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const onChangeDate = (date, dateString) => {
        console.log(date, dateString);
        setDateString(dateString);
    };

    useEffect(() => {
        // Convert the formatted prices to numbers for calculation
        const adultValue = parseFloat(Adult.replace(/[^0-9.-]+/g, ""));
        const babyValue = parseFloat(Baby.replace(/[^0-9.-]+/g, ""));
        const baby2Value = parseFloat(Baby2.replace(/[^0-9.-]+/g, ""));
        console.log(111, adultValue);
        console.log(222, babyValue);
        console.log(33, baby2Value);

        // Calculate TotalMoney
        const totalMoney =
            adultValue * 1000000 + babyValue * 1000000 + baby2Value * 1000000;

        // Update TotalMoney state
        setTotalMoney(totalMoney);
    }, [Adult, Baby, Baby2]);


    //Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //Form
    const onFinish = (values) => {
        alert(
            "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ trả lời bạn sớm nhất có thể."
        );
        setIsModalOpen(false);
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // Scroll element
    const setupPriceTourRef = useRef(null);

    const handleScrollToSetupPriceTour = () => {
        if (setupPriceTourRef.current) {
            setupPriceTourRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [tours, setTours] = useState([]);

    // // Lấy danh sách tour từ Local Storage khi tải ứng dụng
    useEffect(() => {
        const storedTours = localStorage.getItem("tours");
        if (storedTours) {
            setTours(JSON.parse(storedTours));
        }
    }, []);

    // Thêm một tour vào danh sách và lưu lại vào Local Storage
    const handleAddTour = () => {
        const CallTourCurrent = JSON.parse(localStorage.getItem("tours"));
        const newTour = {
            id: data.id,
            title: `${data.title}`,
            ticket: quantityTicket + 1,
            ticketArray: ticketArray,
            avatar: `${data.image_tour_detail[0].ImgCrs1}`,
            price: `${formatCurrency(TotalMoney)}`,
            // date: convertDate(dateString)
        };

        if (CallTourCurrent) {
            const isTourExists = CallTourCurrent.some((tour) => tour.title === newTour.title);
            const isTourPrice = CallTourCurrent.some((tour) => tour.price === newTour.price);

            if (isTourExists && isTourPrice) {
                message.error('Đã tồn tại trong giỏ hàng');
                return;
            }
        }

        const updatedTours = [...tours, newTour];
        setTours(updatedTours);
        localStorage.setItem("tours", JSON.stringify(updatedTours));
        window.location.reload();
        message.success('Đặt thành công');
    };


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
            <div style={{ background: "none", height: "auto" }}>
                <div style={{ fontSize: 18, marginLeft: 52, fontWeight: 'bold', textTransform: 'uppercase' }}>
                    <Link to="/">Trang chủ</Link> &gt;{" "}
                    <Link to="/NewTour">Tour mới nhất</Link> &gt; {data.title}
                </div>
                <div className={style.Content_Header}>
                    <div className={style.SetupCarousel}>
                        {console.log(111111, data.image_tour_detail[0].ImgCrs3)}
                        <Carousel
                            ref={carouselRef}
                            style={{
                                width: "100%",
                            }}
                            afterChange={setCurrentSlide}
                            draggable
                        >
                            <div>
                                <img src={`${data.image_tour_detail[0].ImgCrs1}`} alt="" />
                            </div>
                            <div>
                                <img src={`${data.image_tour_detail[0].ImgCrs2}`} alt="" />
                            </div>
                            {data.image_tour_detail[0].ImgCrs3 != ' ' ? <div>
                                <img src={`${data.image_tour_detail[0].ImgCrs3}`} alt="" />
                            </div> : ''}
                        </Carousel>
                    </div>
                    <div className={style.ContentTour}>
                        <h2>{data.title}</h2>
                        <p style={{ margin: "10px 0" }}>Hành trình: {data.trip}</p>
                        <div>
                            <FontAwesomeIcon
                                icon={faTrain}
                                size="lg"
                                style={{ marginRight: "8px" }}
                            />
                            <span style={{ fontSize: 18 }}>
                                Di chuyển bằng: <span style={{ fontSize: 17, textTransform: 'lowercase', fontWeight: 'bold' }}>{data.vehicle[0].vehicle3}</span>
                            </span>
                        </div>

                        <div>
                            <FontAwesomeIcon
                                icon={faPlane}
                                size="lg"
                                style={{ marginRight: "8px" }}
                            />
                            <span style={{ fontSize: 18 }}>
                                Di chuyển bằng: <span style={{ fontSize: 17, textTransform: 'lowercase', fontWeight: 'bold' }}>{data.vehicle[0].vehicle2}</span>
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                size="lg"
                                style={{ marginRight: "8px" }}
                            />
                            <span style={{ fontSize: 18 }}>{convertDate(data.depart)}</span>
                        </div>

                        <div>
                            <p style={{ fontSize: 18, marginTop: 10 }}>
                                - Tham quan Quốc Tử Giám - từng là trung tâm thờ tự và giáo dục
                            </p>
                            <p style={{ fontSize: 18 }}>
                                - Du ngoạn vịnh Hạ Long - một trong 7 kỳ quan thiên nhiên mới
                                của thế giới
                            </p>
                            <p style={{ fontSize: 18 }}>
                                - Ngắm toàn cảnh Sapa và “Nóc nhà Đông Dương” - đỉnh Fansipan
                                tại sân mây
                            </p>
                            <p style={{ fontSize: 18 }}>
                                - Tìm hiểu đời sống dân tộc thiểu số tại bản Lao Chải - Tả Van
                            </p>
                        </div>

                        <div className={style.SetupButton}>
                            <button onClick={handleScrollToSetupPriceTour}>
                                <FontAwesomeIcon icon={faPaperPlane} /> Đặt Tour
                            </button>

                            <button onClick={showModal}>
                                {" "}
                                <FontAwesomeIcon icon={faPhone} /> Gọi cho tôi sau
                            </button>
                            <Modal
                                title="Hỗ trợ tư vấn miễn phí"
                                // style={{backgroundColor: 'gray'}}
                                open={isModalOpen}
                                // onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <Form onFinish={onFinish}>
                                    <Form.Item
                                        label="Họ tên"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Không được để trống!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Họ và tên" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        name="Telephone"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Không được để trống!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Số điện thoại" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email:"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Không được để trống!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Nội dung"
                                        name="Content"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Không được để trống!",
                                            },
                                        ]}
                                    >
                                        <TextArea rows={3} placeholder="Nội dung" />
                                    </Form.Item>

                                    <Form.Item style={{ marginTop: 10 }}>
                                        <Button type="primary" htmlType="submit">
                                            Gửi cho chúng tôi
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ButtonNextCarousel}>
                <p style={{ width: 130 }} onClick={() => handleSlideChange(0)}>
                    <img style={{ maxWidth: "100%" }} src={`${data.image_tour_detail[0].ImgCrs1}`} alt="" />
                </p>
                <p style={{ width: 130 }} onClick={() => handleSlideChange(1)}>
                    <img style={{ maxWidth: "100%" }} src={`${data.image_tour_detail[0].ImgCrs2}`} alt="" />
                </p>
                {data.image_tour_detail[0].ImgCrs3 != ' ' ? <p style={{ width: 130 }} onClick={() => handleSlideChange(2)}>
                    <img style={{ maxWidth: "100%" }} src={`${data.image_tour_detail[0].ImgCrs3}`} alt="" />
                </p> : <span style={{ width: 130 }}></span>}
            </div>



            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div ref={setupPriceTourRef}>
                    <div className={style.SetupPriceTour}>
                        <div className={`${style.div1} ${style.FS20}`}>
                            <b>Loại khách</b>
                        </div>
                        <div className={`${style.div2} ${style.FS20}`}>
                            <b>Số lượng</b>
                        </div>
                        <div className={`${style.div3} ${style.FS20}`}>
                            <b>Đơn giá</b>
                        </div>
                        <div className={`${style.div4} ${style.FS20}`}>
                            <b>Tổng giá</b>
                        </div>

                        <div className={style.div5}>Người lớn</div>
                        <div className={style.div6}>
                            <InputNumber
                                size="large"
                                min={0}
                                max={100000}
                                defaultValue={0}
                                onChange={onChangeAdult}
                            />
                        </div>
                        <div className={style.div7}>{formatCurrency(data.price_tour[0].price)}đ</div>
                        <div className={style.div8}>{Adult}</div>

                        <div className={style.div9}>Trẻ em</div>
                        <div className={style.div10}>
                            <InputNumber
                                size="large"
                                min={0}
                                max={100000}
                                defaultValue={0}
                                onChange={onChangeBaby}
                            />
                        </div>
                        <div className={style.div11}>{formatCurrency(data.price_tour[0].priceEmBe)}đ</div>
                        <div className={style.div12}>{Baby}</div>

                        <div className={style.div13}>Em bé</div>
                        <div className={style.div14}>
                            <InputNumber
                                size="large"
                                min={0}
                                max={100000}
                                defaultValue={0}
                                onChange={onChangeBaby2}
                            />
                        </div>
                        <div className={style.div15}>{formatCurrency(data.price_tour[0].priceTreEm)}đ</div>
                        <div className={style.div16}>{Baby2}</div>
                    </div>

                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span className={style.FS20}>Tổng tiền:</span>{" "}
                            <span
                                style={{
                                    color: "red",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    paddingRight: 58,
                                }}
                            >
                                {formatCurrency(TotalMoney)}đ
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <DatePicker
                                className={style.CustomPlaceHolder}
                                onChange={onChangeDate}
                            />
                            <button className={style.OrderTourDate} onClick={handleAddTour}>
                                <FontAwesomeIcon icon={faPaperPlane} /> Đặt Tour
                            </button>
                        </div>
                    </div>
                </div>


                <div className={style.InfoRule}>
                    <p style={{ color: "red" }}>
                        <b>Chính sách Tour</b>
                    </p>
                    <p>
                        <b>* Vé trẻ em</b>
                    </p>
                    <p>
                        - Trẻ em dưới 2 tuổi: thu 300.000đ. Gia đình tự lo cho bé ăn ngủ
                    </p>
                    <p>
                        - Trẻ em từ 2 đến dưới 6 tuổi: mua 100% VMB người lớn. Gia đình tự
                        lo cho bé ăn ngủ và tự trả phí tham quan (nếu có).
                    </p>
                    <p>
                        - Hai người lớn chỉ được kèm 1 trẻ em dưới 6 tuổi. Từ trẻ thứ 2 trở
                        lên, mỗi em phải đóng bằng giá trẻ em từ 6 đến 11 tuổi
                    </p>
                    <p>
                        - Trẻ em từ 6 - 11 tuổi: tiêu chuẩn gồm: VMB, ăn uống và tham quan
                        theo chương trình, ngủ chung giường với phụ huynh
                    </p>
                    <p>
                        - Trẻ em trên 11 tuổi: áp dụng giá và các tiêu chuẩn dịch vụ như
                        người lớn
                    </p>
                    <p>
                        <b>* Giá tour bao gồm: </b>
                    </p>
                    <p>- Chi phí xe máy lạnh phục vụ theo chương trình.</p>
                    <p>- Vé máy bay khứ hồi.</p>
                    <p>- Chi phí khách sạn theo tiêu chuẩn 2 khách/phòng</p>
                    <p>- Chi phí ăn - uống theo chương trình.</p>
                    <p>- Quà tặng: Nón, nước suối, khăn lạnh, viết.</p>
                    <p>
                        <b>* Giá tour không bao gồm: </b>
                    </p>
                    <p>
                        - Chi phí tham quan - ăn uống ngoài chương trình, giặt ủi, điện
                        thoại và các chi phí cá nhân khác.
                    </p>
                    <p>- Vé cáp treo tham quan đỉnh Fansipan</p>
                    <p>
                        - Lưu ý: Hạn chế tham gia với những khách có tiền sử bệnh cao huyết
                        áp, tim mạch, sợ độ cao; người cao tuổi; trẻ em
                    </p>
                    <p>- Chi phí phụ thu người nước ngoài, phụ thu phòng đơn (nếu có)</p>
                </div>
            </div>

            <div style={{ textAlign: "center", color: "#1ba0e2" }}>
                <h2>LỊCH TRÌNH TOUR</h2>
                <div>
                    <div className={style.tl_1}></div>
                    <div className={style.tl_2}></div>
                    <div className={style.tl_1}></div>
                </div>
            </div>
            <div className={style.Article}>
                {data.schedule.map((item, index) => {
                    return (
                        <div key={index}>
                            {index == 1 ?  <img src={`${data.image_tour_detail[0].ImgCrs2}`} /> : ''}
                            <b>NGÀY {index + 1}: {item.title}</b>
                            <p>{item.content}</p>
                        </div>
                    );
                })}
            </div>



        </div>
    );
}
