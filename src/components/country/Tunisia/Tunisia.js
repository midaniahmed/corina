import { Statistic, Card, Row, Col } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDonation } from "ReduxActions/tunisiaActions";
import "./Tunisia.scss";

import { DollarOutlined } from "@ant-design/icons";

const actions = { getDonation };

function Tunisia(props) {
  useEffect(() => {
    props.getDonation();
  }, []);

  return (
    <div className="Tunisia">
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={6}>
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
        </Row>
      </div>
    </div>
  );
}

function mapStateToProps({ tunisia }) {
  return {
    totalDonation: tunisia.totalDonation,
  };
}

export default connect(mapStateToProps, actions)(Tunisia);
