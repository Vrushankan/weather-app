import _ from "lodash";
import React from "react";
import moment from "moment";
import { Card, CardBody, CardFooter, CardHeader, Row, Col } from "reactstrap";

export default function WeatherInformationContainer(props) {
  const {
    current = {},
    minutely = {},
    hourly = {},
    daily = {},
  } = props?.currentLocationArray;
  return (
    <>
      {props?.currentLocationArray ? (
        <>
          {props.status === "current" ? (
            <>
              <p>temperature: {current?.temp} metric</p>
              <p>clouds: {current?.clouds}</p>
              <p>humidity: {current?.humidity}</p>
              <p>pressure: {current?.pressure}</p>
              <p>sunrise: {current?.sunrise}</p>
              <Row className="match-height">
                {_.map(current.weather, (each, i) => (
                  <Col lg="4" md="4" sm="12" key={`component-current-${i}`}>
                    <Card>
                      <CardHeader>Weather Condition</CardHeader>
                      <CardBody>
                        <img
                          src={`http://openweathermap.org/img/wn/${each.icon}.png`}
                        />{" "}
                      </CardBody>
                      <CardFooter>{each.description}</CardFooter>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : props.status === "minutely" ? (
            <Row className="match-height">
              {_.map(minutely, (each, i) => (
                <Col lg="2" md="2" sm="6" key={`component-minutely-${i}`}>
                  <Card>
                    <CardBody>
                      <p>precipitation: {each.precipitation}</p>
                      <p>
                        date: {moment(each.dt).format("MMM DD YYYY, h:mm:ss a")}
                      </p>
                    </CardBody>
                    <CardFooter>{each.description}</CardFooter>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : props.status === "hourly" ? (
            <Row className="match-height">
              {_.map(hourly, (each, i) => (
                <Col lg="2" md="2" sm="6" key={`component-hourly-${i}`}>
                  <Card>
                    <CardBody>
                      <p>precipitation: {each.precipitation}</p>
                      <p>
                        date: {moment(each.dt).format("MMM DD YYYY, h:mm:ss a")}{" "}
                      </p>
                      <p>Temp: {each.temp} </p>
                      <p>Pressure: {each.pressure} </p>
                      <p>humidity: {each.humidity} </p>
                      <p>feels_like: {each.feels_like} </p>
                      <p>clouds: {each.clouds} </p>
                    </CardBody>
                    <CardFooter>
                      {each.weather[0].description}{" "}
                      <img
                        src={`http://openweathermap.org/img/wn/${each.weather[0].icon}.png`}
                      />
                    </CardFooter>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : null}
          {props.status === "daily" ? (
            <Row className="match-height">
              {_.map(daily, (each, i) => (
                <Col lg="2" md="2" sm="6" key={`component-daily-${i}`}>
                  <Card>
                    <CardBody>
                      <p>
                        date: {moment(each.dt).format("MMM DD YYYY, h:mm:ss a")}{" "}
                      </p>
                      <p>Temp:</p>
                      <ul>
                        <li>Min: {each.temp.min} </li>
                        <li>Max: {each.temp.max} </li>
                        <li>Morning : {each.temp.morn} </li>
                        <li>Night : {each.temp.night} </li>
                        <li>Day : {each.temp.day} </li>
                        <li>Eve : {each.temp.eve} </li>
                      </ul>
                      <p>feels_like:</p>
                    <ul>
                        <li>Morning : {each.feels_like.morn} </li>
                        <li>Night : {each.feels_like.night} </li>
                        <li>Day : {each.feels_like.day} </li>
                        <li>Eve : {each.feels_like.eve} </li>
                      </ul>
                      <p>Pressure: {each.pressure} </p>
                      <p>humidity: {each.humidity} </p>
                      {/* <p>feels_like: {each.feels_like} </p> */}
                      <p>clouds: {each.clouds} </p>
                    </CardBody>
                    {/* <CardFooter>
                      {each.weather[0].description}{" "}
                      <img
                        src={`http://openweathermap.org/img/wn/${each.weather[0].icon}.png`}
                      />
                    </CardFooter> */}
                  </Card>
                </Col>
              ))}
            </Row>
          ) : null}
        </>
      ) : (
        <>
          <p>Loading</p>
        </>
      )}
    </>
  );
}
