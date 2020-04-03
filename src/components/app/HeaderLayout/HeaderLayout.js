import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Avatar, Card, Spin, Tabs } from "antd";
import { PageHeader, Descriptions } from "antd";
import { NumberCard } from "SharedComponents";
import { browserHistory } from "react-router";

import { loadGlobalStats, loadGlobalStatsByCountry } from "ReduxActions/dashboardActions";

import corina from "Assets/images/corina.png";
import bo7 from "Assets/images/bo7.png";

import "./HeaderLayout.scss";

const { TabPane } = Tabs;

function HeaderLayout(props) {
  useEffect(() => {
    if(props.params.country) props.loadGlobalStatsByCountry(props.params.country);
    else props.loadGlobalStats();
  }, []);

  function callback(key) {
    browserHistory.push(key);
  }

  const renderContent = (column = 2) => (
    <div>
      <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={6} md={12} sm={12} xs={24}>
          <Card className="number-card" bordered={true} bodyStyle={{ padding: 0 }}>
            <img src={props.countryMap} height="104px" width="100%" />
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <NumberCard
            color="#8fc9fb"
            icon="gps_fixed"
            number={props.cases}
            title="Total Cases"
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <NumberCard
            color="#cf1322"
            icon="warning"
            number={props.deaths}
            title="Total Deaths"
          />
        </Col>
        <Col lg={6} md={12} sm={12} xs={24}>
          <NumberCard
            color="#64ea91"
            icon="local_hospital"
            number={props.recovered}
            title="Recovered"
          />
        </Col>
      </Row>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created by"><img style={{ padding: "8px" }} height="40" src={bo7} />Bo7-tech</Descriptions.Item>
        <Descriptions.Item label="Creation Time">2020-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2020-4-10</Descriptions.Item>
      </Descriptions>
    </div>
  );

  const Content = ({ children, extra }) => {
    return (
      <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
      </div>
    );
  };

  function onBack() {
    window.history.back();
    props.loadGlobalStats();
  }

  return (
    <div className="HeaderLayout">
      <div>
        <PageHeader
          className="site-page-header-responsive"
          onBack={props.params.country ? () => onBack() : null}
          title={<Avatar src={corina} />}
          subTitle="Corina كورينا"
          extra={[<h3 key="1">{moment(props.updated).format("LLL")}</h3>]}
          footer={
            props.params.country ? null : (
              <div className="flex-start">
                <Tabs
                  defaultActiveKey={props.location.pathname}
                  onChange={callback}
                >
                  <TabPane tab="Details" key="/details" />
                  <TabPane tab="Map" key="/map" />
                  <TabPane tab="Timeline" key="/timeline" />
                </Tabs>
              </div>
            )
          }
        >
          <Spin spinning={props.statsLoaging}>
            <Content>{renderContent()}</Content>
          </Spin>
        </PageHeader>
      </div>
      {props.children}
    </div>
  );
}

function mapStateToProps({ dashboard }) {
  return {
    cases: dashboard.global.cases,
    deaths: dashboard.global.deaths,
    recovered: dashboard.global.recovered,
    active: dashboard.global.active,
    updated: dashboard.global.updated,
    affectedCountries: dashboard.global.affectedCountries,
    countryMap: dashboard.countryMap,
    statsLoaging: dashboard.statsLoaging,
  };
}

export default connect(mapStateToProps, { loadGlobalStats, loadGlobalStatsByCountry })(HeaderLayout);