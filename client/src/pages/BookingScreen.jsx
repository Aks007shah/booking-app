import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function BookingScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const { roomid, fromdate, todate } = useParams();

  const navigate = useNavigate();

  const fromDate = moment(fromdate, "DD-MM-YYYY");
  const toDate = moment(todate, "DD-MM-YYYY");
  const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroomsbyid", {
          roomid,
        });
        setRoom(response.data.room);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchRoom();
  }, [roomid]);

  async function onToken(token) {
    const user = JSON.parse(localStorage.getItem("users"));

    if (!user || !user.data.data._id) {
      Swal.fire("User not found. Please log in.");
      return;
    }

    const bookingDetails = {
      room,
      userid: user?.data?.data?._id,
      fromdate,
      todate,
      totalamount: room.rentperday * totalDays,
      totaldays: totalDays,
      token: token,
    };

    try {
      setLoading(true);
      const result = await axios.post(`/api/booking/bookroom`, bookingDetails);

      Swal.fire(
        "Congratulations",
        "Your room is booked successfully",
        "success"
      ).then((result) =>
        setTimeout(() => {
          navigate("/profile");
        }, 1500)
      );
      setLoading(false);
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire(
        "Booking Failed",
        "There was an issue with your booking",
        "error"
      );
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      {loading ? (
        <h1 className="text-center">
          <Loader />
        </h1>
      ) : error ? (
        <Error />
      ) : (
        <>
          {room && (
            <div className="row shadow-lg p-3 mb-5 bg-body rounded">
              <div className="col-md-5">
                {room.imageurls && room.imageurls.length > 0 && (
                  <img
                    src={room.imageurls[0]}
                    alt={room.name}
                    style={{ height: 350 }}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="col-md-5">
                <div>
                  <h4 className="mt-3">Name: {room.name}</h4>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                  <hr />
                </div>

                <div>
                  <b>
                    <h4>Amount</h4>
                  </b>
                  <p>Total Days: {totalDays}</p>
                  <p>Rent Per Day: {room.rentperday}</p>
                  <p>Total Amount: {room.rentperday * totalDays}</p>
                </div>

                <StripeCheckout
                  token={onToken}
                  amount={room.rentperday * totalDays * 100}
                  currency="INR"
                  stripeKey="pk_test_51PN9N100uc8vEUEWanu5woSDNQqKIYSqLBWENwp2sEijBC7HFCODYUKOpptSRF21XoQN565Z7zS5pJJNn6wkQtD100ibzH0yGE"
                >
                  <button className="btn btn-success">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookingScreen;
