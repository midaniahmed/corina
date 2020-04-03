import { Card, Radio } from "antd";
import React, { useState, useEffect } from "react";
import world_countries from "./world_countries.json";
import { ResponsiveChoropleth } from "@nivo/geo";

import { connect } from "react-redux";

import { loadAllCountries, loadAllHistoricalData, onUnmountDetails } from "ReduxActions/dashboardActions";

const Group = props => (
  <Radio.Group onChange={(e) => props.onChange(e.target.value)} value={props.value}>
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

const COLORS = {
  cases: "blues",
  deaths: "reds",
  recovered: "greens",
}

function MapContext(props) {
  const [ filter, setFilter] = useState("cases");

  useEffect(() => {
    props.loadAllCountries();
    props.loadAllHistoricalData();
    return function cleanup() {
      props.onUnmountDetails();
    };
  }, []);

  function parseData() {
    const parsed = props.all.map((country, idx) => ({
      id: country.countryInfo.iso3 || idx,
      value: country[filter],
    }))
    return parsed;
  }
  
  const maxValue = () => {
    const max = Math.max.apply(Math, props.all.map(function(o) { return o[filter]; }));
    return max > 0 ? max : 0;
  };

  return (
    <div className="MapContext" style={{ height: "400px", width: "100%" }}>
      <Card className="number-card m-3" bordered={true} bodyStyle={{ padding: 0 }}>
        <Group onChange={e => setFilter(e)} value={filter} />
        <ResponsiveChoropleth
          data={parseData()}
          features={world_countries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={COLORS[filter]}
          domain={[0, maxValue()]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={true}
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          isInteractive={true}
          onClick={country => console.log(country.id.toLowerCase())}
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: "#444444",
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Card>
      <Card className="number-card m-3" bordered={true} bodyStyle={{ padding: 0 }}>
        time line
      </Card>
    </div>
  );
}

function mapStateToProps({ dashboard }) {
  return {
    all: dashboard.allCountries,
    loading: dashboard.loading,
  };
}

export default connect(mapStateToProps, { loadAllCountries, loadAllHistoricalData, onUnmountDetails })(MapContext);
