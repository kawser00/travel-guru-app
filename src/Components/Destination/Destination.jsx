import React, { useContext } from "react";
import "./Destination.css";
import { Button, Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LocationContext } from "../../App";

const Destination = () => {
  const history = useHistory();
  const [{ selectedPlace }] = useContext(LocationContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/contact");
  }
  return (
    <div>
      {selectedPlace && (
        <div
          style={{ padding: "100px" }}
          className="row d-flex justify-content-between"
        >
          <div className="col-md-5 col-12">
            <h1
              style={{ fontSize: "50px" }}
              className="text-white font-weight-bold"
            >
              {selectedPlace.title}
            </h1>
            <p className="text-white">{selectedPlace.description}</p>
          </div>
          <div className="col-md-5 col-12 booking-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold">
                  Origin
                </Form.Label>
                <Form.Control placeholder="Type any origin" type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-muted font-weight-bold">
                  Destination
                </Form.Label>
                <Form.Control
                  className="font-weight-bold"
                  type="text"
                  defaultValue={selectedPlace.title}
                  disabled
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="text-muted font-weight-bold">
                    From
                  </Form.Label>
                  <Form.Control required type="date" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="text-muted font-weight-bold">
                    To
                  </Form.Label>
                  <Form.Control required type="date" />
                </Form.Group>
              </Form.Row>
              <Button
                className="w-100 text-dark"
                variant="warning"
                type="submit"
              >
                Start Booking
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destination;
