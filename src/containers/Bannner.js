import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
} from "reactstrap";

export default function Banner(props) {
  const { geoLocation, geoError, CurrentLocation = "Current Location" } = props;
  if (geoError) {
    return <p className="banner warn">{geoError.message}</p>;
  } else if (geoLocation?.latitude) {
    return (
      <p className="banner success">
        Lat: <strong>{geoLocation?.latitude.toFixed(4)||'N/A'}</strong><br/>
        Long:<strong>{geoLocation?.longitude.toFixed(4)||'N/A'}</strong><br/>
        Your Location: {CurrentLocation}
      </p>
    );
  } else {
    return null;
  }
}
