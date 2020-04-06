import { Table, Avatar, Typography, Select } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { countries } from "../TimelineContext/countries";
import { loadAllCountries, loadGlobalStatsByCountry, onUnmountDetails } from "ReduxActions/dashboardActions";

import "./DashboardContext.scss";

const { Text } = Typography;
const { Option } = Select;
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
  const [selectedCountries, setSelectedCountries] = useState([]);

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
      fixed: "left",
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
      sorter: (a, b) => a.cases - b.cases,
    },
    {
      title: "New Cases",
      dataIndex: "todayCases",
      key: "todayCases",
      render: text => <Text type="warning">{formatNumber(text)}</Text>,
      sorter: (a, b) => a.todayCases - b.todayCases,
    },
    {
      title: "Total Deaths",
      dataIndex: "deaths",
      key: "deaths",
      render: text => <Text strong>{formatNumber(text)}</Text>,
      sorter: (a, b) => a.deaths - b.deaths,
    },
    {
      title: "New Deaths",
      dataIndex: "todayDeaths",
      key: "todayDeaths",
      render: text => <Text type="danger">{formatNumber(text)}</Text>,
      sorter: (a, b) => a.todayDeaths - b.todayDeaths,
    },
    {
      title: "Total Recovered",
      dataIndex: "recovered",
      key: "recovered",
      render: text => <Text strong>{formatNumber(text)}</Text>,
      sorter: (a, b) => a.recovered - b.recovered,
    },
    {
      title: "Active Cases",
      dataIndex: "active",
      key: "active",
      render: text => <Text strong>{formatNumber(text)}</Text>,
      sorter: (a, b) => a.active - b.active,
    },
    {
      title: "Serious, Critical",
      dataIndex: "critical",
      key: "critical",
      render: text => <Text strong>{formatNumber(text)}</Text>,
      sorter: (a, b) => a.critical - b.critical,
    },
    {
      title: "Tot Cases/ 1M pop",
      dataIndex: "casesPerOneMillion",
      key: "casesPerOneMillion",
      render: text => <Text strong>{formatNumber(text)}</Text>,
      sorter: (a, b) => a.casesPerOneMillion - b.casesPerOneMillion,
    },
    {
      title: "Deaths/ 1M pop",
      dataIndex: "deathsPerOneMillion",
      key: "deathsPerOneMillion",
      render: text => <Text strong>{formatNumber(text)}</Text>,
      sorter: (a, b) => a.deathsPerOneMillion - b.deathsPerOneMillion,
    },
  ];

  function handleChange(value) {
    setSelectedCountries(value);
  }

  function filterCountries(data) {
    if(selectedCountries.length) {
      const selected = data.filter(it => selectedCountries.includes(it.country));
      return selected;
    }
    return data;
  }
  return (
    <div className="DashboardContext">
      {/* <Affix offsetTop={top}></Affix> */}
      <div className="flex-end">
            <Select
              mode="multiple"
              style={{ width: "50%" }}
              placeholder="Search for countries"
              defaultValue={selectedCountries}
              onChange={handleChange}
              optionLabelProp="label"
            >
              {countries.map(country => (
                <Option
                  key={country.code}
                  value={country.name}
                  label={
                    <div>
                      <span
                        role="img"
                        aria-label={country.name}
                        className="mr-2"
                      >
                        <img src={country.flag} height="16px" width="32px" />
                        <span className="ml-2">
                         {country.name}
                        </span>
                      </span>
                    </div>
                  }
                >
                  <span role="img" aria-label={country.name} className="mr-2">
                    <img src={country.flag} height="16px" width="32px" />
                  </span>
                  {country.name}
                </Option>
              ))}
            </Select>
          </div>
      <Table
        columns={columns}
        dataSource={filterCountries(props.all)}
        pagination={false}
        rowKey="country"
        bordered={true}
        loading={props.loading}
        scroll={{ x: 1000 }}
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
