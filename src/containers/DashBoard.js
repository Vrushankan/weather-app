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
      locationName: "",
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        const location = {};
        location.latitude = e.coords.latitude;
        location.longitude = e.coords.longitude;
        this.setState({
          geoLocation: location,
        });
        this.getWeatherData(e.coords.latitude,e.coords.longitude)
      },
      async (err) => {
        this.setState({
          geoError: err,
        });
      }
    );
  }
  getWeatherData=(latitude,longitude)=>{
    getWeatherResponse(
      latitude,
      longitude,
      "metric"
    ).then((data) => {
      this.setState({
        currentLocation: data,
      });
    });
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
            position: result.position,
          }))
          .sort((a, b) => a.dist - b.dist);
        this.setState({
          searchData: data,
        });
      });
    }
  }
  setPlace = (place) => {
    let geoLoc = this.state.geoLocation;
    geoLoc.latitude = place.position.lat;
    geoLoc.longitude = place.position.lon;
    this.getWeatherData(geoLoc.latitude,geoLoc.longitude)
    this.setState({ geoLocation: geoLoc, locationName: place.value });

  };
  render() {
    const {
      geoLocation,
      currentLocation,
      geoError,
      searchData,
      locationName,
    } = this.state;
    console.log(currentLocation);
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12" md="12">
            <Card>
              <Banner
                geoLocation={geoLocation}
                geoError={geoError}
                locationName={locationName}
              />
            </Card>
          </Col>
          <Col lg="12" md="12">
            <Card>
              <ReactSearchBox
                placeholder="Search for nearby places"
                data={searchData}
                onSelect={(place) => this.setPlace(place)}
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
