import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import ChartOverView from "../components/home/ChartOverView";
import DataByZone from "../components/home/DataByZone";
import NewDraft from "../components/home/NewDraft";
import Discussions from "../components/home/Discussions";
import TopReferrals from "../components/common/TopReferrals";
import RangeDatePicker from "../components/common/RangeDatePicker";
import { connect } from "react-redux";
import * as smallStatsActions from "../actions/smallStatsActions";
import statsConfiguration from "../utils/stats-config";
class TexsulDashBoard extends React.Component {
  state = {
    startDateChange: false,
    finalDateChange: false,
    startDate: undefined,
    finalDate: undefined,
    dataChange: false,
    smallStats: statsConfiguration
  };

  componentDidMount() {
    //Llamar al API
    //this.props.getSmallStats();
    console.log("Component Did Mount");
  }

  handleStartDateChange = async e => {
    console.log("Cambio Fecha Inicio");
    console.log(e);
    await this.setState({
      startDateChange: true,
      startDate: e
    });
    this.handleChangeData();
  };

  handleEndDateChange = async e => {
    console.log("Cambio Fecha Final");
    await this.setState({
      finalDateChange: true,
      finalDate: e
    });
    this.handleChangeData();
  };

  formatDate = date => {
    const year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    return `${year}/${month}/${day}`;
  };

  handleChangeData = async () => {
    if (this.state.startDateChange && this.state.finalDateChange) {
      console.log("Renderizar API de nuevo");
      //this.setState({ smallStats: data2.smallStats, dataChange: true });
      const startDate = this.state.startDate;
      const finalDate = this.state.finalDate;
      try {
        const startDateString = this.formatDate(startDate);
        const finalDateString = this.formatDate(finalDate);
        const dates = {
          startDate: startDateString,
          finalDate: finalDateString
        };
        const smallStatsQuery = await this.props.getSmallStatsByInterval(dates);
        console.log("SMALLSTATS", smallStatsQuery);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  handleCharts = e => {
    console.log(e);
  };

  handleClick = e => {
    console.log(e);
    return e;
  };

  renderSmallStats = () => {
    //Se obtienen los datos del store
    const data = this.props.data
    const resumeValues = data.resumeValues;
    const chartValues = data.chartValues;

    console.log("DATOS", data);
    //A  cada SmallStat se le asigna los datos correspondientes
    const smallStats = this.state.smallStats.map((stats, idx) => {
      const chartLabels = chartValues.dates;
      const chartNumbers = chartValues.values.map((value) => {
        return value[stats.type]
      })
      console.log("CHART NUMBERS", chartNumbers);
      const dataSets = stats.datasets
      dataSets[0].data = chartNumbers
      return (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <Link
            to={{
              pathname: "tables",
              state: {
                holi: "holi"
              }
            }}
          >
            <SmallStats
              id={`small-stats-${idx}`}
              chartData={dataSets/*stats.datasets*/}
              chartLabels={chartLabels/*stats.chartLabels*/}
              label={stats.label}
              value={/*stats.value*/ resumeValues[stats.type]}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
              variation={"1"}
              onClick={this.handleClick}
            />
          </Link>
        </Col>
      );
    });
    return smallStats;
  };

  render() {
    console.log("PROPs", this.props);

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Container fluid>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p
              style={{
                margin: "10px",
                padding: 0,
                paddingTop: "5px",
                fontSize: "1.5em"
              }}
            >
              Dashboard
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ margin: "10px", paddingBottom: "15px" }}>
              <RangeDatePicker
                onStartDateChange={this.handleStartDateChange}
                onEndDateChange={this.handleEndDateChange}
              />
            </div>
          </div>
        </Container>
        {/* SmallStats */}
        <Row>
          {
            this.renderSmallStats()
          }
        </Row>

        <Row>
          {/* Chart Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <ChartOverView title={"Ingresos por ventas vs Gastos"} />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="12" sm="12" className="mb-4">
            <DataByZone />
          </Col>

          {/* Chart Overview */}
          <Col lg="12" md="12" sm="12" className="mb-4">
            <ChartOverView title={"Ingresos vs Egresos"} />
          </Col>

          {/* New Draft */}
          {/* <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col> */}

          {/* Discussions */}
          {/* <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col> */}

          {/* Top Referrals */}
          {/* <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col> */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.smallStatsReducer;
};

export default connect(
  mapStateToProps,
  smallStatsActions
)(TexsulDashBoard);
