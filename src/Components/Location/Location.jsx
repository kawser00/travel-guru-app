import React, { useContext } from 'react';
import './Location.css';
import { Link } from 'react-router-dom';
import { LocationContext } from '../../App';

const Location = (props) => {
  const [{ selectedPlace }] = useContext(LocationContext)
  return (
    <div>
      <h1 style={{ fontSize: '50px' }} className="text-white font-weight-bold">{selectedPlace.title}</h1>
      <p className="text-white">{selectedPlace.description}</p>
      <Link to="/destination" className="btn btn-warning text-dark ">Booking &#8594;</Link>
    </div>
  );
};

export default Location;