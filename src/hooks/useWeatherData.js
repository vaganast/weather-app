import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function useWeatherData() {
  const client = axios.create({
    baseURL:
      // 'https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric',
      'http://localhost:8000/weather',
    //now the response with localhost and some changes in .json file data is an array with 1 object
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = async () => {
    try {
      let response = await client.get();
      // set nextDay array from api call ,reduce function to create new values feels_like, temp and dt
      const nextDays = response.data[0].daily.reduce(
        (newValue, currentValue) => {
          const feels_like =
            (currentValue.feels_like.day + currentValue.feels_like.night) / 2;
          const temp = (currentValue.temp.day + currentValue.temp.night) / 2;
          const dt = dayjs(new Date(currentValue.dt * 1000));
          //spreading old array and add the new values
          newValue.push({ ...currentValue, feels_like, temp, dt });
          return newValue;
        },
        []
      );
      //getting days for the chart
      let xAxis = nextDays.map(day => day.dt.format('DD/MM'));
      //getting max temp for the chart
      let series = response.data[0].daily.map(day => Math.round(day.temp.max));
      //create new object with the values to use in frontend
      setData({
        now: {
          ...response.data[0].current,
          //no usable now.dt but setting the days in the same format we use
          dt: dayjs(new Date(response.data[0].current.dt * 1000)),
        },
        today: nextDays[0],
        nextDays: nextDays,
        graphData: {
          xAxis: xAxis,
          series: series,
        },
        lastUpdate: dayjs().format('HH:mm DD/MM/YYYY'),
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  //checking if we have data
  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  //call function to get the data and use interval to auto update data every 2min
  useEffect(() => {
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading };
}
