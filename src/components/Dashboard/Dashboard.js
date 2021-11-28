import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AppHeader from "../AppHeader/AppHeader";
import SleepQualityByTimeInBed from "../SleepQualityByTimeInBed/SleepQualityByTimeInBed";
import SleepQualityByMovementsPerHour from "../SleepQualityByMovementsPerHour/SleepQualityByMovementsPerHour";

class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <AppHeader/>
        <Container>
          <Row>
            <Col>
              <SleepQualityByTimeInBed/>
            </Col>
          </Row>
          <Row>
            <Col>
              <SleepQualityByMovementsPerHour/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
