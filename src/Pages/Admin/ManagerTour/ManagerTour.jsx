import React, { useState } from "react";
import { Space, Spin, message } from "antd";
import styles from "./ManagerTour.module.css";
import ListOrderTour from "../ListOrderTour/ListOrderTour";
import Cskh from "../Cskh/Cskh";
import AddTour from "../AddTour/AddTour";

export default function ManagerTour() {
  const [ManagerTour, setManagerTour] = useState([]); // State for the tour data
  const [activeTab, setActiveTab] = useState(" "); // State for active button/tab

  const handleDeleteClick = (value) => {
    // Xử lý xóa khi click
  };

  if (!ManagerTour) {
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

  const renderContent = () => {
    switch (activeTab) {
      case "addTour":
        return <AddTour/>;
      case "cskh":
        return <Cskh/>;
      default:
        return <ListOrderTour/>;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <button
          className={`${styles.AddTour} ${activeTab === "addTour" ? styles.active : ""}`}
          onClick={() => setActiveTab("addTour")}
        >
          Thêm tour
        </button>
        <button
          className={`${styles.AddTour} ${activeTab === "defaut" ? styles.active : ""}`}
          onClick={() => setActiveTab("defaut")}
        >
          Danh sách đặt tour
        </button>
        <button
          className={`${styles.AddTour} ${activeTab === "cskh" ? styles.active : ""}`}
          onClick={() => setActiveTab("cskh")}
        >
          Chăm sóc khách hàng
        </button>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
}
