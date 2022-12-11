import React from 'react';

const SubPlaceContainer = (props) => {
  const { service, offer, condition, price, title, star, image } = props.place
  return (
      <div className="d-flex flex-column flex-sm-row p-4">
        <div className="mr-5 mb-4 mb-sm-0">
          <img style={{ width: '250px' }} src={image} alt="" />
        </div>
        <div>
          <h4>{title}</h4>
          <p>{service}</p>
          <p>{offer}</p>
          <p>{condition}</p>
          <div >
            <span style={{ marginRight: '45px' }}><img style={{ width: '17px' }} src={star} alt="" />4.9(20)</span>
            <span>{price}</span>
          </div>
        </div>
      </div>
  );
};

export default SubPlaceContainer;