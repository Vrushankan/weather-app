import _ from "lodash";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader,Row,Col} from "reactstrap";

export default function WeatherInformationContainer(props) {
  const { current={}, minutely={}, hourly={}, daily={} } = props?.currentLocationArray;
  console.log(current);
  return (
    <>
      {props?.currentLocationArray ? (
        <>
          <p>temperature: {current?.temp} metric</p>
          <p>clouds: {current?.clouds}</p>
          <p>humidity: {current?.humidity}</p>
          <p>pressure: {current?.pressure}</p>
          <p>sunrise: {current?.sunrise}</p>
          <Row className="match-height">
          {_.map(current.weather,(each,i)=>(
              <Col lg="4" md="4" sm="12">
               <Card>
                   <CardHeader>Weather Condition</CardHeader>
                   <CardBody><img src={`http://openweathermap.org/img/wn/${each.icon}.png`}/> </CardBody>
                   <CardFooter>{each.description}</CardFooter>
          </Card>
          </Col>
          ))}
          </Row>
        </>
      ) : (
        <>
          <p>Loading</p>
        </>
      )}
    </>
  );
}
