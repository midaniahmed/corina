import React from "react";
import CountUp from "react-countup";
import Card from "antd/lib/card";

import "./NumberCard.scss";

function NumberCard({ icon, color, title, number, countUp }) {
  return (
    <div className="NumberCard">
      <Card className="number-card" bordered={true} bodyStyle={{ padding: 24 }}>
        <div className="flex-between">
          <div className="flex-1">
            <span className="material-icons" style={{ fontSize: "40px", color }}>{icon}</span>
          </div>
          <div className="number-card-content flex-3 ml-2">
            <p className="number-card-title number-card-text-overflow">
              {title || "No Title"}
            </p>
            <p className="number-card-number number-card-text-overflow" style={{ color }}>
              <CountUp
                start={0}
                end={number}
                duration={1.5}
                useEasing
                useGrouping
                separator=","
                {...countUp || {}}
              />
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default NumberCard;
