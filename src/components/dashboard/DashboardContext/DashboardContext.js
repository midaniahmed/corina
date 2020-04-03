import { Table, Avatar, Typography, Affix } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { loadAllCountries, loadGlobalStatsByCountry, onUnmountDetails } from "ReduxActions/dashboardActions";

import "./DashboardContext.scss";

const { Text } = Typography;
// const status = {
//   1: {color: "#64ea91"},
//   2: {color: "#f69899"},
//   3: {color: "#8fc9fb"},
//   4: {color: "#f8c82e"},
// }

function formatNumber(num) {
  if(!num) return ""
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function DashboardContext(props) {
  useEffect(() => {
    props.loadAllCountries();
    return function cleanup() {
      props.onUnmountDetails();
    };
  }, []);

  const redirectToCountry = (code) => {
    if(code)
      props.loadGlobalStatsByCountry(code.toLowerCase());
  };

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text, row) => (
        <Link to={row.countryInfo.iso2 ? "details/"+row.countryInfo.iso2.toLowerCase() : "details"} onClick={() => redirectToCountry(row.countryInfo.iso2)}>
          <div className="cursor-pointer">
            <span className="mr-2">
              {
                row.countryInfo.iso2 ? (
                  <img src={`https://www.countryflags.io/${row.countryInfo.iso2}/shiny/64.png`} className="flag-class"  />
                ) : <Avatar shape="square" size={48} />
              }
            </span>
            <span className="country-name">{text}</span>
          </div>
        </Link>
      ),
    },
    {
      title: "Total Cases",
      dataIndex: "cases",
      key: "cases",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
    {
      title: "New Cases",
      dataIndex: "todayCases",
      key: "todayCases",
      render: text => <Text type="warning">{formatNumber(text)}</Text>,
    },
    {
      title: "Total Deaths",
      dataIndex: "deaths",
      key: "deaths",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
    {
      title: "New Deaths",
      dataIndex: "todayDeaths",
      key: "todayDeaths",
      render: text => <Text type="danger">{formatNumber(text)}</Text>,
    },
    {
      title: "Total Recovered",
      dataIndex: "recovered",
      key: "recovered",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
    {
      title: "Active Cases",
      dataIndex: "active",
      key: "active",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
    {
      title: "Serious, Critical",
      dataIndex: "critical",
      key: "critical",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
    {
      title: "Tot Cases/ 1M pop",
      dataIndex: "casesPerOneMillion",
      key: "casesPerOneMillion",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
    {
      title: "Deaths/ 1M pop",
      dataIndex: "deathsPerOneMillion",
      key: "deathsPerOneMillion",
      render: text => <Text strong>{formatNumber(text)}</Text>,
    },
  ];
  return (
    <div className="DashboardContext">
      {/* <Affix offsetTop={top}></Affix> */}
      <Table
        columns={columns}
        dataSource={props.all}
        pagination={false}
        rowKey="country"
        bordered={true}
        loading={props.loading}
        summary={pageData => {

          let cases = 0;
          let todayCases = 0;
          let deaths = 0;
          let todayDeaths = 0;
          let recovered = 0;
          let active = 0;
          let critical = 0;

          pageData.forEach((row) => {
            cases += row.cases;
            todayCases += row.todayCases;
            deaths += row.deaths;
            todayDeaths += row.todayDeaths;
            recovered += row.recovered;
            active += row.active;
            critical += row.critical;
          });
    
          return (
              <tr>
                <th>World</th>
                <td><Text strong>{formatNumber(cases)}</Text></td>
                <td><Text type="warning" strong>{formatNumber(todayCases)}</Text></td>
                <td><Text strong>{formatNumber(deaths)}</Text></td>
                <td><Text type="danger" strong>{formatNumber(todayDeaths)}</Text></td>
                <td><Text strong>{formatNumber(recovered)}</Text></td>
                <td><Text strong>{formatNumber(active)}</Text></td>
                <td><Text strong>{formatNumber(critical)}</Text></td>
                <td><Text></Text></td>
                <td><Text></Text></td>
              </tr>
          );
        }}
      />
    </div>
  );
}

function mapStateToProps({ dashboard }) {
  return {
    all: dashboard.allCountries,
    loading: dashboard.loading,
  };
}

export default connect(mapStateToProps, { loadAllCountries, loadGlobalStatsByCountry, onUnmountDetails })(DashboardContext);
