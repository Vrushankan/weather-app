import React from "react";
import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import ReactSearchBox from "react-search-box";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { history } from "../history";
import Banner from "./Bannner";
import SwitchComponent from "./SwitchComponent";
import AutoSearchComponent from "./AutoSearchComponent";
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
      dropDownValue: "current",
      defaultDropDown:{
        label: `current`,
        value: `current`,
        isFixed: true,
      },
      dropdownOpen: false,
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
        this.getWeatherData(e.coords.latitude, e.coords.longitude);
      },
      async (err) => {
        this.setState({
          geoError: err,
        });
      }
    );
  }

  setDropdown = (e) => {
    this.setState({ dropDownValue: e.value });
  };

  getWeatherData = (latitude, longitude) => {
    getWeatherResponse(latitude, longitude, "metric").then((data) => {
      this.setState({
        currentLocation: data,
      });
    });
  };
  onSearchChange(query) {
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
    this.getWeatherData(geoLoc.latitude, geoLoc.longitude);
    this.setState({ geoLocation: geoLoc, locationName: place.value });
  };
  render() {
    const {
      geoLocation,
      currentLocation,
      geoError,
      searchData,
      locationName,
      defaultDropDown,
      dropDownValue,
    } = this.state;
    const selectOptions = [
      {
        label: `current`,
        value: `current`,
        isFixed: true,
      },
      {
        label: `minutely`,
        value: `minutely`,
        isFixed: true,
      },
      {
        label: `hourly`,
        value: `hourly`,
        isFixed: true,
      },
      {
        label: `daily`,
        value: `daily`,
        isFixed: true,
      },
    ];
    const animatedComponents = makeAnimated();
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
          <Col lg="6" md="6">
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
          <Col lg="6" md="6">
            <Card>
              <Select
                options={selectOptions}
                className="React font-Mont-13LH15"
                classNamePrefix="Select"
                defaultValue={defaultDropDown}
                onChange={(category) => this.setDropdown(category)}
              />
            </Card>
          </Col>
          <Col lg="12" md="12">
            <Card>
              {currentLocation !== undefined ? (
                <WeatherInformationContainer
                  currentLocationArray={currentLocation}
                  status={dropDownValue}
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
