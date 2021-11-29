import React from "react";
import SleepSessionService from "../../services/sleepSessions";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {
  createContainer,
  VictoryAxis,
  VictoryChart,
  VictoryGroup, VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme
} from "victory";

class SleepQualityByActiveTime extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let startDate = new Date(date.setDate(date.getDate()-7));
    let endDate = new Date();
    
    this.state = {
      startDate: startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(),
      endDate: endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate(),
      chartWidth: window.innerWidth >= 1000 ? 800 : 350,
      sleepQualityByActiveTime: []
    };
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    SleepSessionService.index(this.state.startDate, this.state.endDate).then(
      response => {
        let data = response.map(sleepSession => ({ x: sleepSession.activity_session?.active_time, y: sleepSession.sleep_quality}));
        this.setState({sleepQualityByActiveTime: data})
      },
      error => {
        console.log(error);
      });
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  
  render() {
    return(
      <Card>
        <Card.Header className="text-center" as="h4">
          Sleep Quality by Active Time
        </Card.Header>
        <Card.Body>
          {this.formComponent()}
          {!this.state.sleepQualityByActiveTime.length ? this.noGraphDate() : this.graphComponent()}
        </Card.Body>
      </Card>
    );
  };
  
  handleResize = () => {
    let chartWidth = window.innerWidth >= 1000 ? 800 : 350;
    this.setState({ chartWidth: chartWidth });
  };
  
  formComponent = () => (
    <Form onSubmit={this.getGraphData}>
      <Row className="justify-content-center">
        <Col md="auto">
          <Form.Control
            id="formStartDate"
            type="date"
            className="mb-2"
            value={this.state.startDate}
            onChange={(e) => this.setState({startDate: e.target.value})}
          />
        </Col>
        <Col md="auto">
          <Form.Control
            id="formEndDate"
            type="date"
            className="mb-2"
            value={this.state.endDate}
            onChange={(e) => this.setState({endDate: e.target.value})}
          />
        </Col>
        <Col md="auto">
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
  
  getGraphData = (event) => {
    event.preventDefault();
    SleepSessionService.index(this.state.startDate, this.state.endDate).then(
      response => {
        let data = response.map(sleepSession => ({ x: sleepSession.activity_session?.active_time, y: sleepSession.sleep_quality}));
        this.setState({sleepQualityByActiveTime: data})
      },
      error => {
        console.log(error);
      });
  };
  
  graphComponent = () => {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    
    return (
      <VictoryChart
        width={this.state.chartWidth}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomVoronoiContainer
            voronoiBlacklist={["line"]}
            labels={({ datum }) => `${datum.y}%`}
          />
        }
      >
        <VictoryGroup
          data={this.state.sleepQualityByActiveTime}
          colorScale={"qualitative"}
        >
          <VictoryLine name="line"/>
          <VictoryScatter/>
        </VictoryGroup>
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}%`}
          tickLabelComponent={<VictoryLabel dx={7}/>}
          axisLabelComponent={<VictoryLabel dy={-27} />}
          label="Sleep Quality"
        />
        <VictoryAxis
          tickFormat={(tick) => `${Math.floor(tick / 3600)}h ${Math.floor((tick % 3600) / 60)}m` }
          tickLabelComponent={<VictoryLabel dy={-8}/>}
          axisLabelComponent={<VictoryLabel dy={12} />}
          label="Active Time"
        />
      </VictoryChart>
    );
  };
  
  noGraphDate = () => (
    <Card.Body>
      <Card.Title className="text-center">No data available</Card.Title>
      <Card.Text className="text-center">Please import your data</Card.Text>
    </Card.Body>
  );
}

export default SleepQualityByActiveTime;
