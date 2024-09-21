import React, { useEffect, useState, useCallback } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    if (!user) {
      navigate("/account/login");
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="container">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h2>
            Name: <span className="text-danger">{user?.data?.data.name}</span>
          </h2>
          <h2>
            Email: <span className="text-danger">{user?.data?.data.email}</span>
          </h2>
          <h2>
            Is Admin:{" "}
            <span className="text-danger">
              {user?.data?.data.isAdmin ? "Yes" : "No"}
            </span>
          </h2>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bookings" key="2">
          <MyBookings />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("users"));

  const fetchBookings = useCallback(async () => {
    try {
      const response = await axios.post("/api/booking/getbookingsbyuserid", {
        userid: user?.data?.data?._id,
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [user?.data?.data?._id]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, fetchBookings]);

  const CancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      await axios.post("/api/booking/cancelbooking", { bookingid, roomid });
      fetchBookings(); // Refresh bookings after canceling
      Swal.fire("Booking Cancelled Successfully", "success");
    } catch (error) {
      Swal.fire("Error canceling booking:", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>My Bookings</h1>
      <h3 className="mt-2">
        Hi <span className="text-danger">{user?.data?.data?.name},</span> Your
        Total Number of Bookings: {bookings?.length}
      </h3>
      <hr />

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="shadow p-3 mb-5 bg-body rounded" key={booking._id}>
            <h2>
              Booking ID: <span className="text-danger">{booking._id}</span>
            </h2>
            <p>
              Room: <span className="text-danger">{booking.room}</span>
            </p>
            <p>
              From Date: <span className="text-danger">{booking.fromdate}</span>
            </p>
            <p>
              To Date: <span className="text-danger">{booking.todate}</span>
            </p>
            <p>
              Total Days:{" "}
              <span className="text-danger">{booking.totaldays}</span>
            </p>
            <p>
              Total Amount:{" "}
              <span className="text-danger">${booking.totalamount}</span>
            </p>
            <p>
              Status:{" "}
              <span
                className={`p-2 rounded-3 ${
                  booking.status === "booked"
                    ? "bg-success text-dark bg-opacity-50"
                    : "bg-danger text-light"
                }`}
              >
                {booking.status === "booked" ? "Confirmed" : "Cancelled"}
              </span>
            </p>
            {booking.status === "booked" && (
              <button
                className="btn btn-danger ms-auto"
                onClick={() => CancelBooking(booking._id, booking.roomid)}
              >
                Cancel Booking
              </button>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default ProfileScreen;
