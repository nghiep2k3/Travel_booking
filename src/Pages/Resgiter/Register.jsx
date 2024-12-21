import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone, LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import url from "../../config";
import Video from "./Video.mp4";


const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const Register = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onFinish = (values) => {
        console.log("Success:", values);
        const data = {
            name: values.name,
            email: values.email,
            phone: values.telephone,
            username: values.username,
            password: values.password
        };

        console.log(data);
        
        axios.post(`${url}/sign_up.php`, data)
            .then(response => {
                console.log('Registration successful:', response.data);
                message.success("Đăng ký thành công!");
                navigate("/login");
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    message.error("Đăng ký thất bại. Vui lòng thử lại.");
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    message.error("Không có phản hồi từ máy chủ.");
                } else {
                    console.error('Error:', error.message);
                    message.error("Đã xảy ra lỗi khi đăng ký.");
                }
            });
    };

    return (
        <div className={styles.ContainerDiv}>
            <video
                src={Video}
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "max-content" }}
            ></video>
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                className={styles.container}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1 style={{ textAlign: "center" }}>Welcome</h1>
                <p style={{ textAlign: "center" }}>Register now!</p>
                <Form.Item
                    label={
                        <label htmlFor="name" className={styles.textf}>
                            Họ và tên
                        </label>
                    }
                    name="name" // truyền lên data
                    rules={[{ required: true, message: "Enter email" }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input
                        id="name"
                        name="name"
                        type="name"
                        className={styles.inputf}
                        placeholder="Họ và tên"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="telephone" className={styles.textf}>
                            Số điện thoại
                        </label>
                    }
                    name="telephone" // truyền lên data
                    rules={[{ required: true, message: "Enter email" }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input
                        id="telephone"
                        name="telephone"
                        type="telephone"
                        className={styles.inputf}
                        placeholder="Số điện thoại"
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <label htmlFor="email" className={styles.textf}>
                            Email
                        </label>
                    }
                    name="email" // truyền lên data
                    rules={[{ required: true, message: "Enter email" }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        className={styles.inputf}
                        placeholder="email"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="username" className={styles.textf}>
                            Username
                        </label>
                    }
                    name="username" // truyền lên data
                    rules={[{ required: true, message: "Enter email" }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input
                        id="username"
                        name="username"
                        type="username"
                        className={styles.inputf}
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="password" className={styles.textf}>
                            Password
                        </label>
                    }
                    name="password" // truyền lên data
                    rules={[{ required: true, message: "Enter password" }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input
                        className={styles.inputf}
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        suffix={
                            passwordVisible ? (
                                <EyeTwoTone onClick={() => setPasswordVisible(false)} />
                            ) : (
                                <EyeInvisibleOutlined onClick={() => setPasswordVisible(true)} />
                            )
                        }
                    />
                </Form.Item>
                <Form.Item
                    style={{ textAlign: "center" }}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.buttonL}
                        style={{ width: "100%", background: "rgb(27 160 226 / 91%)" }}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginTop: "5px" }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Link to="/">
                            <p style={{ fontSize: 20, fontFamily: "Poppins", display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <LeftCircleTwoTone /> Go home</p>
                        </Link>
                        <Link to="/Login">
                            <p style={{ fontSize: 20, fontFamily: "Poppins", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Sign In! <RightCircleTwoTone /></p>
                        </Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
