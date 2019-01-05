import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Prediction from './Prediction';

const Wrapper = styled.div`
  display: flex;
  padding: 1em;
`;

const WeatherForecast = ({ forecast }) => {
  return (
    <Wrapper>
      {forecast.map(prediction => (
        <Prediction key={prediction.id} {...prediction} />
      ))}
    </Wrapper>
  );
};

WeatherForecast.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default WeatherForecast;
