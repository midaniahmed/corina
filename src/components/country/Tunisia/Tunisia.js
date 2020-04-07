import { Statistic, Card, Row, Col, Table, Typography, Tag } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getDonation,
  getProvinces,
  getCaseByAge,
} from "ReduxActions/tunisiaActions";

import "./Tunisia.scss";

import { DollarOutlined } from "@ant-design/icons";
import { ResponsiveBar } from "@nivo/bar";

const actions = { getDonation, getProvinces, getCaseByAge };

function Tunisia(props) {
  useEffect(() => {
    props.getDonation();
    props.getProvinces();
    props.getCaseByAge();
  }, []);

  function formatNumber(num) {
    if (!num) return "";
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const columns = [
    {
      title: "Governorate",
      dataIndex: "gouvernora",
      key: "gouvernora",
      render: text => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Total Cases",
      children: [
        {
          title: "Confirmed",
          dataIndex: "Nb_cas",
          key: "Nb_cas",
          render: text => <Tag color="geekblue">{text}</Tag>,
          sorter: (a, b) => a.Nb_cas - b.Nb_cas,
        },
        {
          title: "Deaths",
          dataIndex: "Nb_deces",
          key: "Nb_deces",
          render: text => <Tag color="volcano">{text}</Tag>,
          sorter: (a, b) => a.Nb_deces - b.Nb_deces,
        },
        {
          title: "Recovered",
          dataIndex: "Nb_retablis",
          key: "Nb_retablis",
          render: text => <Tag color="green">{text}</Tag>,
          sorter: (a, b) => a.Nb_retablis - b.Nb_retablis,
        },
      ],
    },
    {
      title: "Population",
      dataIndex: "Pop_19",
      key: "Pop_19",
      render: text => (
        <Typography.Text strong>{formatNumber(text)}</Typography.Text>
      ),
      sorter: (a, b) => a.Pop_19 - b.Pop_19,
    },
  ];

  function sum(data, key) {
    return data.reduce((a, b) => a + (b[key] || 0), 0);
  }

  const getProvinces = () => props.provinces.map(it => ({ ...it.attributes }));
  const provinces = getProvinces();

  return (
    <div className="Tunisia">
      <div className="site-statistic-demo-card">
        <Row gutter={16} justify="center">
          <Col lg={18} md={20} sm={24} xs={24}>
            <Table
              columns={columns}
              dataSource={provinces}
              pagination={false}
              rowKey="FID"
              bordered={true}
              loading={props.loading}
            />
          </Col>
          <Col lg={6} md={18} sm={24} xs={24}>
            <div>
              <Card>
                <Statistic
                  title={
                    <span>
                      <DollarOutlined /> Total Donation
                    </span>
                  }
                  value={props.totalDonation}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  suffix="TND"
                />
              </Card>
            </div>
            <div className="mt-3" style={{ height: "450px", width: "100%" }}>
              <Card >
                <ResponsiveBar
                  reverse={true}
                  height="400"
                  // width="100%"
                  data={props.ages}
                  keys={["value"]}
                  indexBy="age"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  layout="horizontal"
                  colors={{ scheme: "dark2" }}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  // legends={[
                  //   {
                  //     dataFrom: "keys",
                  //     anchor: "bottom-right",
                  //     direction: "column",
                  //     justify: false,
                  //     translateX: 120,
                  //     translateY: 0,
                  //     itemsSpacing: 2,
                  //     itemWidth: 100,
                  //     itemHeight: 20,
                  //     itemDirection: "left-to-right",
                  //     itemOpacity: 0.85,
                  //     symbolSize: 20,
                  //     effects: [
                  //       {
                  //         on: "hover",
                  //         style: {
                  //           itemOpacity: 1,
                  //         },
                  //       },
                  //     ],
                  //   },
                  // ]}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function mapStateToProps({ tunisia }) {
  return {
    totalDonation: tunisia.totalDonation,
    provinces: tunisia.provinces,
    ages: tunisia.ages,
  };
}

export default connect(mapStateToProps, actions)(Tunisia);
