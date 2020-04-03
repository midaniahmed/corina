import React, { useEffect } from "react";
import { connect } from "react-redux";


import "./CountryContext.scss";

function CountryContext(props) {
  useEffect(() => {
    console.log("country context")
  }, []);

  return (
    <div className="HeaderLayout">
      CountryContext
    </div>
  );
}

function mapStateToProps({ dashboard }) {
  return {};
}

export default connect(mapStateToProps, {  })(CountryContext);