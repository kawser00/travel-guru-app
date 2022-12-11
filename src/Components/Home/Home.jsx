import React, { useContext } from "react";
import Location from "../Location/Location";
import "./Home.css";
import { LocationContext } from "../../App";
import coxBazar from "../../Image/Rectangle-1.png";
import sreemongol from "../../Image/Sreemongol.png";
import sundorbon from "../../Image/sundorbon.png";
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  const [{ setPlace, selectedPlace }] = useContext(LocationContext);
  return (
    <Container className="my-5">
      <Row className="align-items-center justify-content-center pt-xl-5">
        <Col xl={4} md={10} className="mb-5 mb-xl-0">
          {selectedPlace && <Location />}
        </Col>
        <Col xl={8} className=" d-flex flex-wrap location-img">
          <div
            onClick={() => setPlace("cox's bazar")}
            className="position-relative"
          >
            <img
              src={coxBazar}
              alt="location"
              className={`${
                selectedPlace?.location === "cox's bazar" && "location-active"
              }`}
            />
            <h3 className="text-white font-weight-bold">COX'S BAZAR</h3>
          </div>
          <div
            onClick={() => setPlace("sreemongol")}
            className="position-relative "
          >
            <img
              src={sreemongol}
              alt="location"
              className={`${
                selectedPlace?.location === "sreemongol" && "location-active"
              }`}
            />
            <h3 className="text-white font-weight-bold">SREEMONGOL</h3>
          </div>
          <div
            onClick={() => setPlace("sundarban")}
            className="position-relative"
          >
            <img
              src={sundorbon}
              alt="location"
              className={`${
                selectedPlace?.location === "sundarban" && "location-active"
              }`}
            />
            <h3 className="text-white font-weight-bold">SUNDARBAN</h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
