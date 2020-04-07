import { Card, Select, Row, Col } from "antd";
import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";

export default function CustomPie(props) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);

  function handleChange(value) {
    let found = [];
    setSelectedCountries(value);
     value.forEach(element => {
      const i = props.provinces.find(it => it.state == element);
      if(i) found.push({
        province: element,
        data: [
          {
            "id": "cases",
            "value": i.cases,
            "label": "Cases",
            "color": "hsl(208, 93%, 77%)",
          },
          {
            "id": "deaths",
            "value": i.deaths,
            "label": "Deaths",
            "color": "hsl(355, 83%, 44%)",
          },
          {
            "id": "active",
            "value": i.active,
            "label": "Active",
            "color": "hsl(140, 76%, 65%)",
          },
        ]
      }
      );
    });
    setSelectedObjects(found);
  }
  
  return (
    <Card className="number-card" bordered={true} bodyStyle={{ padding: 0 }}>
      <div className="CustomMap">
        <div className="flex-end mb-3">
          <Select
            mode="multiple"
            style={{ width: "50%" }}
            placeholder="Search by provinces"
            defaultValue={selectedCountries}
            onChange={handleChange}
            optionLabelProp="label"
          >
            {props.cityNames.map(country => (
              <Select.Option key={country} value={country} label={country}>
                {country}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Row justify="center">
          {
            selectedObjects.map((obj , idx) => (<Col key={idx + 1} lg={12} md={12} sm={23} xs={23}>
              <div style={{ height: "200px", width: "100%", padding: "8px" }}>
                {/* <Card bordered={true} bodyStyle={{ padding: 8 }}> */}
                  <span>{obj.province}</span>
                  <ResponsivePie
                    data={obj.data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={["hsl(208, 93%, 77%)", "hsl(355, 83%, 44%)", "hsl(140, 76%, 65%)"]}
                    borderWidth={1}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: "color" }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[]}
                  />
                {/* </Card> */}
              </div>
            </Col>))
          }
        </Row>
      </div>
    </Card>
  );
}
