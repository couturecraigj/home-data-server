const { gql } = require('apollo-server');

const typeDefs = gql`
  enum ThermostatState {
    HEAT
    OFF
    COOL
  }
  enum FuelEnum {
    DIESEL
    WOOD
    PELLETS
    PROPANE
    ELECTRIC
  }
  type Location {
    id: ID!
    name: String!
    lat: Float!
    lon: Float!
    cityCode: Int!
    days: [DayLocation!]!
  }
  type Device {
    ipAddress: String!
    macAddress: String!
    room: Room!
    thermostat: Thermostat
  }
  type Thermostat {
    currentTemp: Float!
    heatingMin: Float!
    heatingMax: Float!
    coolingMin: Float!
    coolingMax: Float!
    occupied: Boolean!
    running: Boolean!
    state: ThermostatState!
  }
  type ThermostatHistory {
    heatingMin: Float!
    heatingMax: Float!
    coolingMin: Float!
    coolingMax: Float!
    occupied: Boolean!
    timeStamp: Float!
    running: Boolean!
    state: ThermostatState!
  }
  type Day {
    dayOfMonth: Int!
    month: Int!
    year: Int!
    sunrise: Float!
    sunset: Float!
    locations: [DayLocation!]!
  }
  type FuelDelivery {
    id: ID!
    type: FuelEnum!
    costPerUnit: Float!
    numberOfUnits: Float!
    dayLocation: DayLocation!
  }
  type DayLocation {
    day: Day!
    sunset: Float!
    sunrise: Float!
    location: Location!
    deliveries: [FuelDelivery!]!
  }
  type Room {
    id: ID!
    name: String!
    currentTemp: Float!
    currentHumidity: Float!
    occupied: Boolean!
    running: Boolean!
    lat: Float!
    lon: Float!
    location: Location!
    history: [RoomHistory!]!
  }

  type RoomHistory {
    id: ID!
    room: Room
    timeStamp: Float!
    temp: Float!
    humidity: Float!
  }

  type Weather {
    id: ID!
    timeStamp: Float!
    temp: Float!
    humidity: Float!
    pressure: Float!
    tempMax: Float!
    tempMin: Float!
    windSpeed: Float!
    windDegrees: Float!
    visibility: Float!
    forecast(days: Int): [WeatherForecast!]!
    location: Location!
  }

  type Zone {
    thermostat: Thermostat!
    location: Location!
    devices: [Device!]!
    rooms: [Room!]!
  }

  type WeatherForecast {
    id: ID!
    location: Location!
    timeStamp: String!
    tempMin: Float!
    tempDay: Float!
    tempMax: Float!
    tempNight: Float!
    tempEve: Float!
    tempMorn: Float!
    pressure: Float!
    humidity: Float!
    rain: Float!
    snow: Float!
    clouds: Float!
    windDegrees: Float!
    windSpeed: Float!
  }

  input RoomInput {
    id: ID
    zone: ZoneInput
    name: String
    lat: Float
    lon: Float
    temperature: Float
    humidity: Float
  }
  input ZoneInput {
    id: ID
    location: LocationInput
    thermostat: ThermostatInput
    name: String!
    avgTemperature: Float
    avgHumidity: Float
  }

  input DayLocationInput {
    id: ID
    timeStamp: Float!
    location: LocationInput!
  }
  input FuelDeliveryInput {
    id: ID
    type: FuelEnum!
    costPerUnit: Float
    numberOfUnits: Float
    dayLocation: DayLocationInput
  }
  input LocationInput {
    id: ID
    name: String
    cityCode: String
    id: String
    lat: Float
    lon: Float
  }

  input DeviceInput {
    ipAddress: String!
    macAddress: String!
    zone: ZoneInput
    room: RoomInput
  }

  input ThermostatInput {
    id: ID
    zone: ZoneInput
    currentTemp: Float!
    heatingMin: Float!
    heatingMax: Float!
    coolingMin: Float!
    coolingMax: Float!
    occupied: Boolean!
    running: Boolean!
    state: ThermostatState!
  }

  type Query {
    hello: String!
    getRoom(id: ID!): Room!
    getWeather(id: ID): Weather!
    getWeatherForecast(locationId: ID, days: Int!): [WeatherForecast]!
    getLocation(id: ID!): Location!
    getDay(dayOfMonth: Int!, month: Int!, year: Int!): Day!
    getFuelPrice(locationId: ID!): Float
  }

  type Mutation {
    addLocation(input: LocationInput!): Location!
    addThermostat(input: ThermostatInput!): Thermostat!
    addRoom(input: RoomInput!): Room!
    addZone(input: ZoneInput!): Zone!
    addDevice(input: DeviceInput!): Device!
    updateThermostat(input: ThermostatInput!): Thermostat!
    updateRoom(id: ID!, input: RoomInput!): RoomHistory!
  }
`;

export default typeDefs;
