import React from "react";
import { Card } from "antd";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";

const COLORS = {
  cases: "hsl(208, 93%, 77%)",
  deaths: "hsl(355, 83%, 44%)",
  recovered: "hsl(140, 76%, 65%)",
};

function formatNumber(num) {
  if(!num) return 0;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


export default function CustomChart({title, timeline}) {
  function parseData() {
    let result = [];
    Object.keys(timeline).map(block => {
      result.push({
        id: block,
        color: COLORS[block],
        data: Object.keys(timeline[block]).map(val => ({x: val, y:timeline[block][val]})),
      })
    })

    return result;
  };

  return (
    <Card className="number-card" bordered={true} bodyStyle={{ padding: 0 }}>
      <div className="CustomChart" style={{ height: "400px", width: "100%" }}>
        <ResponsiveLine
          data={parseData()}
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
          colors={["hsl(208, 93%, 77%)", "hsl(355, 83%, 44%)", "hsl(140, 76%, 65%)"]}
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
  );
}
