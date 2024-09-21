import React, { useEffect, useState } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";
import { DatePicker } from "antd";
import "antd/dist/antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/rooms/getallrooms"
        );
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterByDate(dates) {
    const start = dates[0];
    const end = dates[1];
    setFromDate(start.format("DD-MM-YYYY"));
    setToDate(end.format("DD-MM-YYYY"));

    const tempRooms = duplicateRooms.filter((room) => {
      if (room.currentbookings.length > 0) {
        const isAvailable = room.currentbookings.every((booking) => {
          const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.todate, "DD-MM-YYYY");

          return end.isBefore(bookingFromDate) || start.isAfter(bookingToDate);
        });
        return isAvailable;
      }
      return true; // If no current bookings, the room is available
    });

    setRooms(tempRooms);
  }

  //filter by search
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    setRooms(tempRooms);
  }

  function filterByType(e) {
    setType(e);

    if (e !== "all") {
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-center homeHeadingOne text-danger mt-4">
          Best Hotels | Affordable Prices!
        </h1>
      </div>
      <div className="container shado">
        <div className="row mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded mb-3 justify-content-center align-items-center">
          <div className="col-md-3 mt-5 mb-3">
            <h6 className="text-center">
              Search By <span className="text-danger">Date</span>
            </h6>
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>

          <div className="col-md-3 mt-5 mb-3">
            <h6 className="text-center">
              Search By <span className="text-danger">Name</span>
            </h6>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              onKeyUp={filterBySearch}
              className="form-control"
              placeholder="search rooms..."
            />
          </div>

          <div className="col-md-3 mt-5 mb-3 ">
            <h6 className="text-center">
              Search By <span className="text-danger">Type</span>
            </h6>
            <select
              value={type}
              onChange={(e) => setType(filterByType(e.target.value))}
              className="form-control"
            >
              <option value="all">All</option>
              <option value="deluxe">Deluxe</option>
              <option value="standard">Standard</option>
              <option value="suite">Suite</option>
              <option value="family">Family</option>
              <option value="single">Single</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="bg-warning p-3">
          <Rooms rooms={rooms} fromdate={fromDate} todate={toDate} />
        </div>
      )}
    </div>
  );
}

export default Home;
