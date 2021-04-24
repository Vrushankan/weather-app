import React from "react";
import { Row, Col,Card } from "reactstrap";
import { history } from "../history";
import Banner from "./Bannner";
import SwitchComponent from './SwitchComponent'
import WeatherInformationContainer from "./WeatherInformationContainer";
import { getWeatherResponse } from "../sevices/geolocation";
import 'bootstrap/dist/css/bootstrap.min.css';

class AnalyticsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoLocation: {},
      geoError: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        this.setState({
          geoLocation: e.coords,
        });
        getWeatherResponse(
          e.coords.latitude,
          e.coords.longitude,
          "metric"
        ).then((data) => {
          this.setState({
            currentLocation: data,
          });
        });
      },
      async (err) => {
        this.setState({
          geoError: err,
        });
      }
    );
  }
  render() {
    const { geoLocation, currentLocation, geoError } = this.state;
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12" md="12">
            <Card>
              <Banner geoLocation={geoLocation} geoError={geoError} />
            </Card>
          </Col>
          <Col lg="12" md="12">
          <Card>
            <SwitchComponent/>
          </Card>
          </Col>
          <Col lg="12" md="12">
            <Card>
            {currentLocation !== undefined ? (
              <WeatherInformationContainer
                currentLocationArray={currentLocation}
              />
            ) : null}
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AnalyticsDashboard;
