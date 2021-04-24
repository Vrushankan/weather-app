import React from "react";
import { Row, Col } from "reactstrap";
import Banner from "./Bannner";
import { history } from "../history";
import {getWeatherResponse} from '../sevices/geolocation';


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
        })
        getWeatherResponse(e.coords.latitude,e.coords.longitude).then((data)=>{
          console.log(data);
        })
      },
      async (err) => {
        this.setState({
          geoError: err,
        });
      }
    );
  }
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12" md="12">
            <div>
              <Banner
                geoLocation={this.state.geoLocation}
                geoError={this.state.geoError}
              />
            </div>
          </Col>
          <Col lg="12" md="12">
            Response
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AnalyticsDashboard;
