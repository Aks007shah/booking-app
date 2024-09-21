import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function BookingsAdmin(props) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/booking/getalldetails`);

        setBookings(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <div className="col-md-10">
      <h2> There are total <span className="text-danger"> {bookings.length} </span> Bookings!
            </h2>
        {loading && <Loader />}

        <div className="container-fluid">
          <table className="table table-border table-dark">
          
            <thead className="bs bg-dark">
              <tr>
                <th className="text-danger">Booking Id</th>
                <th className="text-danger">User Id</th>
                <th className="text-danger">Room</th>
                <th className="text-danger">From</th>
                <th className="text-danger">To</th>
                <th className="text-danger">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length &&
                bookings.map((booking) => (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>

                    <td className={booking.status === 'booked' ? 'bg-success text-white text-center' : 'bg-danger text-center text-white'}>{booking.status}</td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingsAdmin;
