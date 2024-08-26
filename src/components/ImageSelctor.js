import React, { useState } from "react";

const ImageSelector = ({ images }) => {
  const [selected, setSelcted] = useState(images[0]);

  const handleClick = (e) => {
    setSelcted(e.target.src);
  };

  return (
    <div className="image-selector">
      <div className="scroller">
        {images.map((i) => (
          <img
            src={i}
            alt="pic"
            onClick={handleClick}
            className={selected === i ? "active" : ""}
          />
        ))}
      </div>
      <div className="selected">
        <img src={selected} alt="selected" />
      </div>
    </div>
  );
};

export default ImageSelector;
