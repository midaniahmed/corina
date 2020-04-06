import { Card } from "antd";
import React, { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

export default function CustomMap(props) {
  const [viewport, setViewport] = useState();

  return (
    <Card className="number-card" bordered={true} bodyStyle={{ padding: 0 }}>
      <div className="CustomMap">{props.country} map</div>
    </Card>
  );
}
