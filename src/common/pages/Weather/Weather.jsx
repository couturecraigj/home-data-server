import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import WeatherForecast from './WeatherForecast';
import { getFahrenheit, getMiles } from './utilities';

const GET_WEATHER = gql`
  query GetWeather($days: Int!) {
    getWeather {
      id
      temp
      humidity
      pressure
      tempMin
      tempMax
      windSpeed
      visibility
      windDegrees
    }
    getWeatherForecast(days: $days) {
      id
      timeStamp
      tempMin
      tempDay
      tempMax
      tempNight
      tempEve
      tempMorn
      pressure
      humidity
      rain
      snow
      clouds
      windDegrees
      windSpeed
    }
  }
`;

const Weather = () => (
  <div>
    <h1>Weather</h1>
    <Query pollInterval={10000} query={GET_WEATHER} variables={{ days: 5 }}>
      {({ data, error, loading }) => {
        if (error) return <div>Error!</div>;

        if (loading) return <div>Loading!</div>;

        const weather = data.getWeather;

        const temp = `${getFahrenheit(weather.temp).toFixed(1)}°`;
        const tempMax = `${getFahrenheit(weather.tempMax).toFixed(1)}°`;
        const tempMin = `${getFahrenheit(weather.tempMin).toFixed(1)}°`;
        const humidity = `${weather.humidity.toFixed(0)}%`;
        const visibility = `${getMiles(weather.visibility).toFixed(1)} mi`;
        const pressure = `${weather.pressure.toFixed(0)} hPa`;

        return (
          <div>
            <div>
              <strong>High: </strong>
              <span>{tempMax}</span>
            </div>
            <div>
              <strong>Low: </strong>
              <span>{tempMin}</span>
            </div>
            <div>
              <strong>Temperature: </strong>
              <span>{temp}</span>
            </div>
            <div>
              <strong>Humidity: </strong>
              <span>{humidity}</span>
            </div>
            <div>
              <strong>Visibility: </strong>
              <span>{visibility}</span>
            </div>
            <div>
              <strong>Pressure: </strong>
              <span>{pressure}</span>
            </div>
            <WeatherForecast forecast={data.getWeatherForecast} />
          </div>
        );
      }}
    </Query>
  </div>
);

export default Weather;
