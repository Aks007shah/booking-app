import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

function RoomsAdmin(props) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rooms/getallrooms`);

        setRooms(response.data);
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
      <div>
        <div className="col-md-10">
          <h2> Total Number of Rooms <span className="text-danger">{rooms.length}</span>
          </h2>
          {loading && <Loader />}

          <div className="container-fluid">
            <table className="table table-dark table-border bs">
              <thead className="bs bg-dark">
                <tr>
                  <th className="text-danger">Room Id</th>
                  <th className="text-danger">Current Booking</th>
                  <th className="text-danger">Name</th>
                  <th className="text-danger">Description</th>
                  <th className="text-danger">Rent/Day</th>
                  <th className="text-danger">Phone</th>
                  <th className="text-danger">Type</th>
                </tr>
              </thead>

              <tbody>
                {rooms.length &&
                  rooms.map((room) => (
                    <tr>
                      <td key={room._id}>{room._id}</td>

                      <td>{room?.currentbookings?.length}</td>

                      <td>{room.name}</td>

                      <td>{room.description}</td>

                      <td>{room.rentperday}</td>
                      
                      
                      <td>{room.phone}</td>


                      <td>{room.type}</td>

                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomsAdmin;
