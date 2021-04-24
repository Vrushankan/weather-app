import React from "react";
import { Row, Col, Card } from "reactstrap";
import ReactSearchBox from "react-search-box";
import { history } from "../history";
import Banner from "./Bannner";
import SwitchComponent from "./SwitchComponent";
import WeatherInformationContainer from "./WeatherInformationContainer";
import { getWeatherResponse, getNearbyPlaces } from "../sevices/geolocation";
import "bootstrap/dist/css/bootstrap.min.css";

class AnalyticsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoLocation: {},
      geoError: null,
      searchResult: {},
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
  async onSearchChange(query) {
    if (query.length > 0) {
      getNearbyPlaces(
        query,
        this.state.geoLocation.latitude,
        this.state.geoLocation.longitude
      ).then((searchResult) => {
        this.setState({
          searchResults: searchResult,
        });
        const data = searchResult.results
          ?.map((result) => ({
            key: result.id,
            name: result.poi.name,
            dist: result.dist,
            value: result.poi.name,
          }))
          .sort((a, b) => a.dist - b.dist);
        this.setState({
          searchData: data,
        });
        const records = this.state.searchResults.results
          ?.map((result) => ({
            key: result.id,
            name: result.poi.name,
            dist: result.dist,
            value: `${result.poi.name} | ${(result.dist / 1000).toFixed(2)}km `,
          }))
          .sort((a, b) => a.dist - b.dist);
          this.setState({
            searchRecords: records,
          });
      });
    }
  }

  render() {
    const { geoLocation, currentLocation, geoError,searchData,searchRecords } = this.state;
    console.log(searchData);
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
              <ReactSearchBox
                placeholder="Search for nearby places"
                data={searchData}
                onSelect={(place) => console.log(place)}
                autoFocus={true}
                onChange={(query) => this.onSearchChange(query)}
                fuseConfigs={{
                  minMatchCharLength: 0,
                  threshold: 1,
                  distance: 100000,
                  sort: false,
                }}
                keys={["name"]}
              />
              <SwitchComponent />
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
