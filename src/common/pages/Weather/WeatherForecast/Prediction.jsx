import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getFahrenheit } from '../utilities';

const Wrapper = styled.div`
  padding: 1em;
`;

const Prediction = ({
  timeStamp,
  clouds,
  pressure,
  humidity,
  tempMin,
  tempMax
}) => {
  const date = new Date(timeStamp * 1000);

  return (
    <Wrapper>
      <div>
        <strong>Date: </strong>
        <span>{date.toLocaleDateString()}</span>
      </div>

      <div>
        <strong>Clouds: </strong>
        <span>{clouds}</span>
      </div>
      <div>
        <strong>Pressure: </strong>
        <span>{pressure}</span>
      </div>
      <div>
        <strong>Humidity: </strong>
        <span>{humidity}</span>
      </div>
      <div>
        <strong>High: </strong>
        <span>{getFahrenheit(tempMax)}</span>
      </div>
      <div>
        <strong>Low: </strong>
        <span>{getFahrenheit(tempMin)}</span>
      </div>
    </Wrapper>
  );
};

Prediction.propTypes = {
  timeStamp: PropTypes.string.isRequired,
  clouds: PropTypes.number.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired
};

export default Prediction;
