import React from "react";

const SizeSelector = ({sizes}) => {
  return (
    <div className="size-selector">
      {sizes.map(({size, available}) => (
        // <div className={available ? "available" : ""} >{size}</div>
        <>
        <button type="radio" name="size" disabled={!available}>{size}</button>
        </>
      ))}
    </div>
  );
};

export default SizeSelector;
