import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { database } from "../../firebase";
import Video from "./Video.mp4";
import { EyeInvisibleOutlined, EyeTwoTone, HomeOutlined, LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import url from "../../config";

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const Login = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onFinish = (values) => {
        console.log("Success:", values);
        const data = {
            "identifier": values.username,
            "password": values.password
        }

        axios.post(`${url}/login.php`, data)
            .then(response => {
                console.log('Login successful:', response.data);
                localStorage.setItem("LogIn", "true");
                localStorage.setItem("dataUser", JSON.stringify(response.data.user)); // Convert user object to JSON string
                navigate("/");
            })

            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    message.error("Sai tài khoản hoặc mặc khẩu");
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    message.error("Sai tài khoản hoặc mặc khẩu");
                } else {
                    console.error('Error:', error.message);
                    message.error("Sai tài khoản hoặc mặc khẩu");
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
                <p style={{ textAlign: "center" }}>Login to your account</p>
                <Form.Item
                    label={
                        <label htmlFor="username" className={styles.textf}>
                            Email
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
                        Login
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
                        <Link to="/Resgiter">
                            <p style={{ fontSize: 20, fontFamily: "Poppins", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Resgiter now! <RightCircleTwoTone /></p>
                        </Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
