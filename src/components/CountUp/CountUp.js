import React from "react";
import CountUp from "react-countup";

export default function Counter({ number }) {
  return (
    <div className="number">
      <CountUp duration={3} className="counter" end={number} /> +
      {/* <span>{title}</span> */}
    </div>
  );
}
