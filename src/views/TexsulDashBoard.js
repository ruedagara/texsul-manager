import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";
import RangeDatePicker from "../components/common/RangeDatePicker";

class TexsulDashBoard extends React.Component {
  state = {
    smallStats: []
  };

  componentDidMount() {
    //Llamar al API
    this.setState({
      smallStats: data.smallStats
    });
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            title=""
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <div>
              
            </div>
            <div>
              <RangeDatePicker />
            </div>
          </div>
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {this.state.smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

          {/* New Draft */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col>

          {/* Discussions */}
          <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col>

          {/* Top Referrals */}
          <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col>
        </Row>
      </Container>
    );
  }
}

TexsulDashBoard.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

const data = {
  smallStats: [
    {
      label: "Ventas",
      value: "$3.800M",
      percentage: "10.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [500, 600, 200, 300, 600, 250, 100, 150, 800, 100, 200]
        }
      ]
    },
    {
      label: "Gastos",
      value: "$3.648M",
      percentage: "-13.5",
      increase: false,
      dicrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Resultados",
      value: "$152M",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "12", sm: "12", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    },
    {
      label: "Ingresos de Efectivo",
      value: "$8.147M",
      percentage: "3.8%",
      increase: true,
      decrease: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "Egresos de Efectivo",
      value: "$2.900M",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "Saldo de Efectivo",
      value: "$5.247M",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "12", sm: "12", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [500, 600, 200, 300, 600, 250, 100, 150, 800, 100, 200]
        }
      ]
    }
  ]
};

export default TexsulDashBoard;
