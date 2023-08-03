import React from 'react';

const Landing = (props) => {
  return (
    <div className="headerDiv">
        <img className="headerImg" src={props.landingImage} />
        <h1>{props.title}</h1>
    </div>
  )
};

export default Landing;