import React, { useState } from 'react';
import axios from 'axios';
import url from '../config';

const Test = () => {
    const [tourId, setTourId] = useState('');
    const [scheduleFields, setScheduleFields] = useState([{ title: '', content: '' }]);
    const [priceTour, setPriceTour] = useState('');
    const [priceEmBe, setPriceEmBe] = useState('');
    const [priceTreEm, setPriceTreEm] = useState('');
    const [vehicle1, setVehicle1] = useState('');
    const [vehicle2, setVehicle2] = useState('');
    const [vehicle3, setVehicle3] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu ảnh chưa được chọn
        if (!image) {
            setMessage("Vui lòng chọn ảnh để tải lên.");
            return;
        }

        const formData = new FormData();
        formData.append('tour_id', tourId);
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
        formData.append('srcImg', image);

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

    return (
        <div>
            <h2>Tạo Chi Tiết Tour</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tour ID:</label>
                    <input
                        type="text"
                        value={tourId}
                        onChange={(e) => setTourId(e.target.value)}
                        required
                    />
                </div>
                {/* Thêm các trường Lịch Trình */}
                {scheduleFields.map((schedule, index) => (
                    <div key={index}>
                        <div>
                            <label>Tiêu đề Lịch Trình {index + 1}:</label>
                            <input
                                type="text"
                                name="title"
                                value={schedule.title}
                                onChange={(e) => handleScheduleChange(e, index)}
                                required
                            />
                        </div>
                        <div>
                            <label>Nội Dung Lịch Trình {index + 1}:</label>
                            <textarea
                                name="content"
                                value={schedule.content}
                                onChange={(e) => handleScheduleChange(e, index)}
                                required
                            />
                        </div>
                        {/* Nút xóa lịch trình */}
                        <button type="button" onClick={() => removeScheduleField(index)}>
                            Xóa Lịch Trình {index + 1}
                        </button>
                    </div>
                ))}
                {/* Nút thêm lịch trình mới */}
                <div>
                    <button type="button" onClick={addScheduleField}>
                        Thêm Lịch Trình
                    </button>
                </div>
                <div>
                    <label>Giá Tour:</label>
                    <input
                        type="number"
                        value={priceTour}
                        onChange={(e) => setPriceTour(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Giá Em Bé:</label>
                    <input
                        type="number"
                        value={priceEmBe}
                        onChange={(e) => setPriceEmBe(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Giá Trẻ Em:</label>
                    <input
                        type="number"
                        value={priceTreEm}
                        onChange={(e) => setPriceTreEm(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phương Tiện:</label>
                    <input
                        type="text"
                        value={vehicle1}
                        onChange={(e) => setVehicle1(e.target.value)}
                        placeholder="Phương tiện 1"
                    />
                    <input
                        type="text"
                        value={vehicle2}
                        onChange={(e) => setVehicle2(e.target.value)}
                        placeholder="Phương tiện 2"
                    />
                    <input
                        type="text"
                        value={vehicle3}
                        onChange={(e) => setVehicle3(e.target.value)}
                        placeholder="Phương tiện 3"
                    />
                </div>
                <div>
                    <label>Chọn Ảnh:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Đang tải lên...' : 'Tạo Chi Tiết Tour'}
                    </button>
                </div>
                {message && <div>{message}</div>}
            </form>
        </div>
    );
};

export default Test;
