import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import React, { useState } from "react";

function Rooms({ rooms, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (room) => {
    setSelectedRoom(room);
    setShow(true);
  };

  return (
    <div className="container">
      {rooms.map((room, index) => (
        <div key={index} className="row bg-dark bs shado p-3 mb-5 bg-body rounded">
          <div className="col-md-4">
            {room.imageurls && room.imageurls.length > 0 ? (
              <img
                src={room.imageurls[0]}
                alt={room.name}
                className="img-fluid rounded-3 mb-2 shado" style={{ width: 500}}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="col-md-7 mb-5">
            <h1>{room.name}</h1>
            <p className="text-danger">About: {room.description}</p>
            <p>Max Count: {room.maxcount}</p>
            <p>Type: {room.type}</p>
            <p className="text-danger">Phone Number: {room.phone}</p>

            {
              (fromdate && todate) && (
                <Link to={`/bookingscreen/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary m-1">Book Now</button>
            </Link>
              )
            }
            
            <Button className="btn btn-danger" onClick={() => handleShow(room)}>
              View Details
            </Button>
          </div>
          <hr />
        </div>
      ))}

      {selectedRoom && (
        <Modal show={show} className="text-center" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-2">{selectedRoom.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Description:{" "}
              <span className="text-danger">{selectedRoom.description}</span>
            </p>
            <p>
              Rent per day:{" "}
              <span className="text-danger">${selectedRoom.rentperday}</span>
            </p>

            {selectedRoom.imageurls && selectedRoom.imageurls.length > 0 ? (
              <Carousel>
                {selectedRoom.imageurls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={url}
                      style={{ width: 350 }}
                      alt={selectedRoom.name}
                      className="img-fluid mb-2 rounded-3"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Rooms;
