import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LocationContext } from '../../App';
import mapImg from '../../Image/map.png'
import SubPlaceContainer from '../SubPlaceContainer/SubPlaceContainer';

const Booking = () => {
  const [{ place, selectedPlace }] = useContext(LocationContext)
  return (
    <div className="back-img">
      <h3 className="pt-4 ml-4 font-weight-bold">Stay with {place}</h3>
      <Row>
        <Col xl={6}>
          {selectedPlace &&
            selectedPlace.subPlace &&
            selectedPlace.subPlace.map((place) => (
              <SubPlaceContainer place={place} key={place.id} />
            ))}
        </Col>
        <Col xl={6} className="d-none d-xl-block">
          <img style={{ maxWidth: "500px" }} src={mapImg} alt="" />
        </Col>
      </Row>
    </div>
  );
};

export default Booking;