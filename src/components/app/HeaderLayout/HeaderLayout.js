import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Avatar } from "antd";
import { PageHeader, Button, Descriptions } from "antd";
import { NumberCard } from "SharedComponents";

import { loadGlobalStats } from "ReduxActions/dashboardActions";

import corina from "Assets/images/corina.png";
import bo7 from "Assets/images/bo7.png";

import "./HeaderLayout.scss";

function HeaderLayout(props) {
  useEffect(() => {
    props.loadGlobalStats();
  }, []);

  const renderContent = (column = 2) => (
    <div>
      
      <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={6} md={12} sm={12} xs={24}>
          <h3>{moment(props.update).format("LLL")}</h3>
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

  return (
    <div className="HeaderLayout">
      <div>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title={<Avatar src={corina} />}
          subTitle="Corina كورينا"
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
          ]}
        >
          <Content>{renderContent()}</Content>
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
    update: dashboard.global.update,
    affectedCountries: dashboard.global.affectedCountries,
  };
}

export default connect(mapStateToProps, { loadGlobalStats })(HeaderLayout);