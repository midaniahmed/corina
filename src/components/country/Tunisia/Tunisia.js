import { Statistic, Card, Row, Col, Table, Typography, Tag } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDonation, getProvinces } from "ReduxActions/tunisiaActions";

import "./Tunisia.scss";

import { DollarOutlined } from "@ant-design/icons";

const actions = { getDonation, getProvinces };

function Tunisia(props) {
  useEffect(() => {
    props.getDonation();
    props.getProvinces();
  }, []);

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
  ];

  function sum(data, key) {
    return data.reduce((a, b) => a + (b[key] || 0), 0);
  }

  const getProvinces = () => props.provinces.map(it => ({ ...it.attributes }));
  const provinces = getProvinces();

  return (
    <div className="Tunisia">
      <div className="site-statistic-demo-card">
        <div className="mb-3">
        <Row gutter={16}>
          <Col lg={6} md={12} sm={12} xs={24}>
            <Card>
              <Statistic
                title={<span><DollarOutlined /> Total Donation</span>}
                value={props.totalDonation}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
                suffix="TND"
              />
            </Card>
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <Card>
              <Statistic
                title="Local cases"
                value={sum(provinces, "Nb_locaux")}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <Card>
              <Statistic
                title="Imported cases"
                value={sum(provinces, "Nb_importés")}
                valueStyle={{ color: "#fa541c" }}
              />
            </Card>
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <Card>
              <Statistic
                title="In quarantine"
                value={sum(provinces, "Nb_quarantaine")}
                valueStyle={{ color: "#108ee9" }}
              />
            </Card>
          </Col>
        </Row>
        </div>
        <Row gutter={16}>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={provinces}
              pagination={false}
              rowKey="FID"
              bordered={true}
              loading={props.loading}
            />
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
  };
}

export default connect(mapStateToProps, actions)(Tunisia);
