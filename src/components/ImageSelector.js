import React, { useState } from "react";

const ImageSelector = ({ images }) => {
  const [selected, setSelected] = useState(images[0]);

  const handleClick = (e) => {
    setSelected(e.target.src);
  };

  return (
    <div className="image-selector">
      <div className="scroller">
        {images.map((img, i) => (
          <img
          key={i}
            src={img}
            alt="pic"
            onClick={handleClick}
            className={selected === img ? "active" : ""}
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
