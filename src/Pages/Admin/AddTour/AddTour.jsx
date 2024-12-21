import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddTour.module.css';
import url from '../../../config';
import { Button, Modal, Spin, message } from 'antd';
import { Link } from 'react-router-dom';

export default function AddTour() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    // State lưu giá trị các trường trong form
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [time, setTime] = useState('');
    const [depart, setDepart] = useState('');
    const [type, setType] = useState('');
    const [trip, setTrip] = useState('');
    const [moi_nhat, setMoiNhat] = useState(false); // Checkboxes
    const [srcImg, setSrcImg] = useState(null); // State để lưu hình ảnh

    //From thêm chi tiết
    const [scheduleFields, setScheduleFields] = useState([{ title: '', content: '' }]);
    const [priceTour, setPriceTour] = useState('');
    const [priceEmBe, setPriceEmBe] = useState('');
    const [priceTreEm, setPriceTreEm] = useState('');
    const [vehicle1, setVehicle1] = useState('');
    const [vehicle2, setVehicle2] = useState('');
    const [vehicle3, setVehicle3] = useState('');
    const [imageDetail, setImageDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleImageDetailChange = (e) => {
        setImageDetail(e.target.files[0]);
    };

    // Hàm để thêm trường lịch trình mới
    const addScheduleField = () => {
        setScheduleFields([...scheduleFields, { title: '', content: '' }]);
    };

    // Hàm để xóa trường lịch trình
    const removeScheduleField = (index) => {
        const newScheduleFields = scheduleFields.filter((_, i) => i !== index);
        setScheduleFields(newScheduleFields);
    };

    // Hàm để thay đổi giá trị trong các trường lịch trình
    const handleScheduleChange = (e, index) => {
        const { name, value } = e.target;
        const newScheduleFields = [...scheduleFields];
        newScheduleFields[index][name] = value;
        setScheduleFields(newScheduleFields);
    };

    const handleSubmitDetail = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu ảnh chưa được chọn
        if (!imageDetail) {
            setMessage("Vui lòng chọn ảnh để tải lên.");
            return;
        }

        const formData = new FormData();
        formData.append('tour_id', selectedId);
        // Thêm các trường lịch trình vào formData
        scheduleFields.forEach((schedule, index) => {
            formData.append(`schedule[${index}][title]`, schedule.title);
            formData.append(`schedule[${index}][content]`, schedule.content);
        });
        formData.append('price_tour', priceTour);
        formData.append('priceEmBe', priceEmBe);
        formData.append('priceTreEm', priceTreEm);
        formData.append('vehicle[vehicle1]', vehicle1);
        formData.append('vehicle[vehicle2]', vehicle2);
        formData.append('vehicle[vehicle3]', vehicle3);
        formData.append('srcImg', imageDetail);

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${url}/create_detail_tour.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setMessage('Tạo chi tiết tour thành công!');
            console.log(response.data);
        } catch (error) {
            setMessage('Đã xảy ra lỗi: ' + error.message);
        } finally {
            setLoading(false);
        }
    };


    // State lưu danh sách các tour
    const [tourList, setTourList] = useState([]);

    const showModal = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedId(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedId(null);
    };

    // Hàm xử lý khi người dùng chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSrcImg(URL.createObjectURL(file)); // Hiển thị ảnh trước khi tải lên
    };

    // Hàm gửi dữ liệu lên API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('time', time);
        formData.append('depart', depart);
        formData.append('type', type);
        formData.append('trip', trip);
        formData.append('moi_nhat', moi_nhat);
        // Thêm ảnh vào FormData
        const image = document.querySelector('#image-upload').files[0];
        if (image) {
            formData.append('srcImg', image);
        }

        try {
            // Gửi dữ liệu lên API
            const response = await axios.post(`${url}/create_tour.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Dữ liệu đã được gửi thành công:', response.data);
            setLoading(false)
            // Reset form sau khi gửi thành công
            setTitle('');
            setPrice('');
            setDiscount('');
            setTime('');
            setDepart('');
            setType('');
            setTrip('');
            setMoiNhat(false);
            setSrcImg(null); // Reset hình ảnh
            document.querySelector('#image-upload').value = '';

            // Lấy lại danh sách tour sau khi thêm thành công
            fetchTourList();

        } catch (error) {
            console.error('Có lỗi xảy ra khi gửi dữ liệu:', error);
        }
    };

    // Hàm lấy danh sách các tour từ API
    const fetchTourList = async () => {
        try {
            const response = await axios.get(`${url}/tour.php`);
            setTourList(response.data); // Cập nhật danh sách tour
        } catch (error) {
            console.error('Có lỗi khi lấy danh sách tour:', error);
        }
    };
    const deleteTour = async (id) => {
        try {
            // Hiển thị hộp thoại xác nhận trước khi xóa
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tour này không?");
            if (!confirmDelete) return;

            // Gửi yêu cầu xóa đến API
            const response = await axios.delete(`${url}/delete_tour.php?id=${id}`);
            console.log('Xóa tour thành công:', response.data);

            // Hiển thị thông báo và cập nhật danh sách tour
            alert("Tour đã được xóa thành công!");
            fetchTourList();
        } catch (error) {
            console.error('Có lỗi xảy ra khi xóa tour:', error);
            alert("Đã xảy ra lỗi khi xóa tour. Vui lòng thử lại!");
        }
    };


    useEffect(() => {
        fetchTourList();
    }, []);

    return (
        <div className={styles.addTourContainer}>
            {/* {true && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <Spin size="large" />
                </div>
            )} */}
            <div className={styles.formContainer}>
                <h2>Thêm Tour</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Tiêu đề:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Giá:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Giảm giá:</label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Thời gian tour:</label>
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Ngày khởi hành:</label>
                        <input
                            type="date"
                            value={depart}
                            onChange={(e) => setDepart(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Loại tour:</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="mien_bac">Miền Bắc</option>
                            <option value="mien_trung">Miền Trung</option>
                            <option value="mien_nam">Miền Nam</option>
                            <option value="chau_a">Châu Á</option>
                            <option value="chau_au">Châu Âu</option>
                            <option value="chau_uc">Châu Úc</option>
                            <option value="chau_my">Châu Mỹ</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Loại chuyến đi:</label>
                        <input
                            type="text"
                            value={trip}
                            onChange={(e) => setTrip(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>
                            <span style={{ width: '140px', display: 'block' }}>Tour mới nhất?</span>
                            <input
                                type="checkbox"
                                checked={moi_nhat}
                                onChange={() => setMoiNhat(!moi_nhat)}
                            />
                        </label>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Chọn hình ảnh:</label>
                        <input
                            type="file"
                            id="image-upload"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                        {srcImg && <img src={srcImg} alt="Preview" className={styles.imagePreview} />}
                    </div>

                    <button type="submit" className={styles.submitButton}>Thêm tour</button>
                </form>
            </div>

            <div className={styles.tourListContainer}>
                <h1 style={{ textAlign: 'center' }}>Danh sách Tour</h1>
                <ul>
                    {tourList.map((tour, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div style={{ width: '32%' }}>
                                <Link to={`/detail/${tour.id}`}>
                                    <img style={{ maxWidth: '100%' }} src={`${tour.srcImg}`} alt="" />
                                </Link>
                            </div>
                            <div style={{ width: '66%', zIndex: 999 }}>
                                <div>
                                    <h3 className={styles.textEllipsis}>{tour.title}</h3>
                                    <p>Giá: {tour.price}</p>
                                    <p>Ngày khởi hành: {tour.depart}</p>
                                    <p>Loại tour: {tour.type}</p>
                                    <div style={{ display: 'flex' }}>
                                        <Button style={{ backgroundColor: 'gray' }} type="primary" onClick={() => { showModal(tour.id) }}>Thêm chi tiết</Button>
                                        <Button style={{ backgroundColor: '#8BC6EC', margin: '0 8px' }}>Sửa</Button>
                                        <Button style={{ backgroundColor: 'red' }} onClick={() => { deleteTour(tour.id) }}>Xóa</Button>
                                    </div>
                                </div>
                            </div>
                        </li>

                    ))}
                </ul>
                <Modal title="Tạo Chi Tiết Tour" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className={styles.modalContainer}>
                        <form onSubmit={handleSubmitDetail} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <b className={styles.formLabel}>Tour ID: {selectedId}</b>
                            </div>

                            {scheduleFields.map((schedule, index) => (
                                <div key={index} className={styles.scheduleGroup}>
                                    <h3 className={styles.scheduleTitle}>Lịch Trình {index + 1}</h3>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Tiêu đề:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={schedule.title}
                                            onChange={(e) => handleScheduleChange(e, index)}
                                            required
                                            className={styles.formInput}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Nội Dung:</label>
                                        <textarea
                                            name="content"
                                            value={schedule.content}
                                            onChange={(e) => handleScheduleChange(e, index)}
                                            required
                                            className={styles.formTextarea}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeScheduleField(index)}
                                        className={`${styles.btn} ${styles.btnDanger}`}
                                    >
                                        Xóa Lịch Trình {index + 1}
                                    </button>
                                </div>
                            ))}

                            <button type="button" onClick={addScheduleField} className={`${styles.btn} ${styles.btnAdd}`}>Thêm Lịch Trình</button>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Giá Tour:</label>
                                <input
                                    type="number"
                                    value={priceTour}
                                    onChange={(e) => setPriceTour(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Giá Em Bé:</label>
                                <input
                                    type="number"
                                    value={priceEmBe}
                                    onChange={(e) => setPriceEmBe(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Giá Trẻ Em:</label>
                                <input
                                    type="number"
                                    value={priceTreEm}
                                    onChange={(e) => setPriceTreEm(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Phương Tiện:</label>
                                <input
                                    type="text"
                                    value={vehicle1}
                                    onChange={(e) => setVehicle1(e.target.value)}
                                    placeholder="Phương tiện 1"
                                    className={styles.formInput}
                                />
                                <input
                                    type="text"
                                    value={vehicle2}
                                    onChange={(e) => setVehicle2(e.target.value)}
                                    placeholder="Phương tiện 2"
                                    className={styles.formInput}
                                />
                                <input
                                    type="text"
                                    value={vehicle3}
                                    onChange={(e) => setVehicle3(e.target.value)}
                                    placeholder="Phương tiện 3"
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Chọn Ảnh:</label>
                                <input
                                    type="file"
                                    onChange={handleImageDetailChange}
                                    required
                                    className={styles.formFileInput}
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="submit" className={`${styles.btn} ${styles.btnSubmit}`} disabled={loading}>
                                    {loading ? 'Đang tải lên...' : 'Tạo Chi Tiết Tour'}
                                </button>
                            </div>
                            {message && <div className={styles.formMessage}>{message}</div>}
                        </form>
                    </div>
                </Modal>

            </div>
        </div>
    );
}
