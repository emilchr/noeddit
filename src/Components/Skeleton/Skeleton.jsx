import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, variant }) => {

    const style = {
        width,
        height,
    };

  return (
    <>
      <span className={`skeleton ${variant? variant: ''}`} style={style}></span>
      <br />
    </>
  )
}
export default Skeleton