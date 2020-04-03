import { Card, Radio, Select } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadAllHistoricalData } from "ReduxActions/dashboardActions";

import { countries } from "./countries";

import { ResponsiveLine } from "@nivo/line";

const { Option } = Select;

const Group = props => (
  <Radio.Group
    onChange={e => props.onChange(e.target.value)}
    value={props.value}
  >
    <Radio style={radioStyle} value="cases">
      Total Cases
    </Radio>
    <Radio style={radioStyle} value="deaths">
      Total Deaths
    </Radio>
    <Radio style={radioStyle} value="recovered">
      Recovered
    </Radio>
  </Radio.Group>
);

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

function formatNumber(num) {
  if (!num) return 0;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function TimelineContext(props) {
  const [filter, setFilter] = useState("cases");
  const [selectedCountries, setSelectedCountries] = useState(["USA","Italy","Spain","Germany","France"]);

  useEffect(() => {
    props.loadAllHistoricalData();
  }, []);

  function parseAllHistory() {
    let result = [];
    const selected = props.allHistory.filter(it => selectedCountries.includes(it.country));
    selected.map(ctr => {
      result.push({
        id: ctr.province ? `${ctr.country} - ${ctr.province}` : ctr.country,
        color: intToRGB(hashCode(ctr.country)),
        data: Object.keys(ctr.timeline[filter]).map(val => ({
          x: val,
          y: ctr.timeline[filter][val],
        })),
      });
    });
    return result;
  }

  function handleChange(value) {
    setSelectedCountries(value);
  }

  return (
    <React.Fragment>
      <div className="MapContext">
        <Card
          className="number-card m-3"
          bordered={true}
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex-between">
            <Group onChange={e => setFilter(e)} value={filter} />
            <Select
              mode="multiple"
              style={{ width: "50%" }}
              placeholder="Select countries"
              defaultValue={selectedCountries}
              onChange={handleChange}
              optionLabelProp="label"
            >
              {countries.map(country => (
                <Option
                  key={country.code}
                  value={country.name}
                  label={
                    <div>
                      <span
                        role="img"
                        aria-label={country.name}
                        className="mr-2"
                      >
                        <img src={country.flag} height="16px" width="32px" />
                        <span className="ml-2">
                         {country.name}
                        </span>
                      </span>
                    </div>
                  }
                >
                  <span role="img" aria-label={country.name} className="mr-2">
                    <img src={country.flag} height="16px" width="32px" />
                  </span>
                  {country.name}
                </Option>
              ))}
            </Select>
          </div>
          <div
            className="CustomChart"
            style={{ height: "600px", width: "100%" }}
          >
            <ResponsiveLine
              data={parseAllHistory()}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
              }}
              axisTop={null}
              yFormat={e => formatNumber(e)}
              xFormat={e => moment(e).format("ll")}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              // colors={["#DF7D89"]}
              enablePoints={false}
              pointSize={1}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps({ dashboard }) {
  return {
    allHistory: dashboard.allHistory,
    loading: dashboard.loading,
  };
}

export default connect(mapStateToProps, { loadAllHistoricalData })(
  TimelineContext
);

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  const col = "00000".substring(0, 6 - c.length) + c;
  return "#" + col;
}
