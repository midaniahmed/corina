import React from "react";
import Card from "antd/lib/card";
import Icon from "antd/lib/icon";
import Statistic from "antd/lib/statistic";

export const StaticCard = props => (
  <div className="StaticCard">
    <Card style={{ width: props.width }}>
      <Statistic
        title={props.title}
        value={props.value}
        suffix={props.suffix}
        prefix={props.prefixIcon ? <Icon type={props.prefixIcon} /> : props.prefix}
        precision={props.precision}
        valueStyle={{ color: props.color }}
      />
    </Card>
  </div>
);

export const StaticLabel = props => (
  <div className="StaticCard" style={props.styles}>
    <Statistic
      title={props.title}
      value={props.value}
      suffix={props.suffix}
      prefix={props.prefixIcon ? <Icon type={props.prefixIcon} /> : props.prefix}
      precision={props.precision}
      valueStyle={{ color: props.color }}
    />
  </div>
);

StaticCard.defaultProps = {
  title: "Static",
  width: "100%",
  value: 0,
};
