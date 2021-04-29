import React from "react";
import { Row, Col } from "reactstrap";

export default function Banner(props) {
  const { geoLocation, geoError, locationName = "Current Location" } = props;
  if (geoError) {
    return <p className="banner warn">{geoError.message}</p>;
  } else if (geoLocation?.latitude) {
    return (
      <Row className="match-height" style={{ padding: 15 }}>
        <Col lg="3" md="3">
          Lat: <strong>{geoLocation?.latitude.toFixed(4) || "N/A"}</strong>
        </Col>
        <Col lg="3" md="3">
          Long:<strong>{geoLocation?.longitude.toFixed(4) || "N/A"}</strong>
        </Col>
        <Col lg="3" md="3">
          Your Location: {locationName}
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}
