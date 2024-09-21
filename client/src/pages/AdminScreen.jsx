import React from "react";
import { Tabs } from "antd";
import BookingsAdmin from "../components/BookingsAdmin";
import RoomsAdmin from "../components/RoomsAdmin";
import AddRoomsAdmin from "../components/AddRoomsAdmin";
import UsersAdmin from "../components/UsersAdmin";

const AdminScreen = () => {
  const [activeKey, setActiveKey] = React.useState("1");

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="container-fluid shadow-lg p-3 mb-5 bg-body rounded">
      <h1 className="">Admin Panel</h1>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="Bookings" key="1">
          <BookingsAdmin />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rooms" key="2">
          <RoomsAdmin />
        </Tabs.TabPane>

        {/* <Tabs.TabPane tab="Add Rooms" key="3">
        <AddRoomsAdmin />
        </Tabs.TabPane> */}

        <Tabs.TabPane tab="User's List" key="4">
        <UsersAdmin />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
