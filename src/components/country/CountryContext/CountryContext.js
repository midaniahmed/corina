import { Row, Col } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  loadCountryHistory,
  onUnmount,
  loadByProvinces,
} from "ReduxActions/countryActions";

import CustomChart from "../CustomChart";
import CustomMap from "../CustomMap";

import "./CountryContext.scss";

const actions = { loadCountryHistory, onUnmount, loadByProvinces };
function CountryContext(props) {
  useEffect(() => {
    props.loadCountryHistory(props.params.country);
    if (props.params.country.includes("us")) props.loadByProvinces("states");
    return function cleanup() {
      props.onUnmount();
    };
  }, []);

  return (
    <div className="mt-3">
      <Row justify="center">
        <Col lg={23} md={23} sm={23} xs={23}>
          <CustomChart title="Total Stats" timeline={props.timeline} />
        </Col>
      </Row>
      <Row justify="center">
        <Col lg={23} md={23} sm={23} xs={23}>
          <CustomMap
            title="Stats By Provinces"
            country={props.country}
            provinces={props.statsByProvinces}
          />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps({ country }) {
  return {
    statsByProvinces: country.statsByProvinces,
    timeline: country.timeline,
    country: country.country,
    loading: country.loading,
  };
}

export default connect(mapStateToProps, actions)(CountryContext);

{/* <Col lg={12} md={12} sm={24} xs={24}> */}