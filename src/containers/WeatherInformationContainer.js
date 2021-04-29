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

  const TextComponent = (LeftSide, RightSide) => (
    <p>
      {LeftSide}: {RightSide}
    </p>
  );
  return (
    <>
      {props?.currentLocationArray ? (
        <>
          {props.status === "current" ? (
            <>
              {TextComponent("temperature", current?.temp)}
              {TextComponent("clouds", current?.clouds)}
              {TextComponent("humidity", current?.humidity)}
              {TextComponent("pressure", current?.pressure)}
              {TextComponent("sunrise", current?.sunrise)}
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
                      {TextComponent("precipitation", each.precipitation)}

                      {TextComponent(
                        "date",
                        moment(each.dt).format("MMM DD YYYY, h:mm:ss a")
                      )}
                    </CardBody>
                    <CardFooter>{each.description}</CardFooter>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : props.status === "hourly" ? (
            <Row className="match-height">
              {_.map(hourly, (each, i) => (
                <Col lg="3" md="3" sm="6" key={`component-hourly-${i}`}>
                  <Card>
                    <CardBody>
                      {TextComponent(
                        "date",
                        moment(each.dt).format("MMM DD YYYY, h:mm:ss a")
                      )}
                      {TextComponent("Temp", each.temp)}
                      {TextComponent("Pressure", each.pressure)}
                      {TextComponent("humidity", each.humidity)}
                      {TextComponent("feels_like", each.feels_like)}
                      {TextComponent("clouds", each.clouds)}
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
                <Col lg="3" md="3" sm="6" key={`component-daily-${i}`}>
                  <Card>
                    <CardBody>
                      {TextComponent(
                        "date",
                        moment(each.dt).format("MMM DD YYYY, h:mm:ss a")
                      )}
                      {TextComponent("Temp", "")}
                      <ul>
                        <li>Min: {each.temp.min} </li>
                        <li>Max: {each.temp.max} </li>
                        <li>Morning : {each.temp.morn} </li>
                        <li>Night : {each.temp.night} </li>
                        <li>Day : {each.temp.day} </li>
                        <li>Eve : {each.temp.eve} </li>
                      </ul>
                      {TextComponent("feels like", "")}
                      <ul>
                        <li>Morning : {each.feels_like.morn} </li>
                        <li>Night : {each.feels_like.night} </li>
                        <li>Day : {each.feels_like.day} </li>
                        <li>Eve : {each.feels_like.eve} </li>
                      </ul>
                      {TextComponent("Pressure", each.pressure)}
                      {TextComponent("humidity", each.humidity)}
                      {TextComponent("clouds", each.clouds)}
                    </CardBody>
                    <CardFooter></CardFooter>
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
