import { Row, Col } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { loadCountryHistory, onUnmount } from "ReduxActions/countryActions";

import CustomChart from "../CustomChart";

import "./CountryContext.scss";

function CountryContext(props) {
  useEffect(() => {
    props.loadCountryHistory(props.params.country);
    return function cleanup() {
      props.onUnmount();
    };
  }, []);

  return (
    <div className="HeaderLayout mt-3">
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={23} md={23} sm={23} xs={23}>
          <CustomChart title="Total Cases" timeline={props.timeline} />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps({ country }) {
  return {
    provinces: country.provinces,
    timeline: country.timeline,
    country: country.country,
    loading: country.loading,
  };
}

export default connect(mapStateToProps, { loadCountryHistory, onUnmount })(CountryContext);

        {/* <Col lg={12} md={12} sm={24} xs={24}>
          <CustomChart title="Total Deaths" />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomChart title="Total Recovered" />
        </Col> */}