import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import WeatherChart from './WeatherChart';
import useWeatherData from '../hooks/useWeatherData';

let buttonText = [
  { id: 'now', label: 'Now' },
  { id: 'today', label: 'Today' },
];

export default function WeatherWidget() {
  const [activeIndex, setActiveIndex] = useState('now');
  const [widgetData, setWidgetData] = useState(null);
  const { data, loading } = useWeatherData();

  const handleClick = value => {
    setActiveIndex(value);
    setWidgetData(data[value]);
  };

  const handleChange = date => {
    const selectedDate = data.nextDays.filter(dailyWeather =>
      dailyWeather.dt.isSame(date, 'day')
    );
    setWidgetData(selectedDate[0]);
    setActiveIndex('selectedDate');
  };

  //appearing current weather data
  useEffect(() => {
    if (loading) return;
    setWidgetData(data.now);
  }, [loading]);

  //if we dont have data a loader will appear
  if (loading || !widgetData)
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size='5rem' color='warning' />
      </Box>
    );

  return (
    <Container maxWidth='sm' sx={{ py: 5 }}>
      <Box className='refresh-timer'>
        <Typography variant='span' sx={{ fontSize: '12px' }}>
          Last Update {data.lastUpdate ? data.lastUpdate : '0'}
        </Typography>
      </Box>
      <Box
        bgcolor='white'
        display='flex'
        flexDirection='column'
        gap={1}
        p={2}
        sx={{ boxShadow: 2 }}
      >
        <Stack direction='row' spacing={1}>
          {buttonText.map(button => (
            <button
              onClick={() => handleClick(button.id)}
              className={`my-button ${
                activeIndex === button.id ? 'active' : ''
              }`}
              key={button.id}
            >
              {button.label}
            </button>
          ))}
          <Box sx={{ width: { xs: '100%', md: '30%', lg: '30%' } }}>
            <DatePicker
              onChange={date => handleChange(date)}
              label='Select Date'
              minDate={data.nextDays[0].dt}
              maxDate={data.nextDays[6].dt}
              className={`my-button ${
                activeIndex === 'selectedDate' ? 'active' : ''
              }`}
            />
          </Box>
        </Stack>
        <Box
          mt={4}
          mb={2}
          justifyContent='space-between'
          display='flex'
          alignItems='center'
          gap={4}
        >
          <Box>
            <Typography variant='h3'>
              {Math.floor(widgetData.temp)}°C
            </Typography>
            <Typography variant='subtitle1'>
              {Array.isArray(widgetData.weather) &&
                widgetData.weather[0].description}
            </Typography>
          </Box>
          <Box>
            <img
              width={100}
              alt='weather icon'
              src={`https://openweathermap.org/img/w/${
                Array.isArray(widgetData.weather) && widgetData.weather[0].icon
              }.png`}
            />
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor='white'
        my={1}
        p={2}
        sx={{
          boxShadow: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        <Box
          sx={{
            border: 1,
            px: 2,
            py: 4,
            m: 1,
            borderColor: 'rgb(232 232 232)',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h5'>
            {Math.floor(widgetData.feels_like)}°C
          </Typography>
          <Typography variant='subtitle1'>Feels like</Typography>
        </Box>
        <Box
          sx={{
            border: 1,
            px: 2,
            py: 4,
            m: 1,
            borderColor: 'rgb(232 232 232)',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h5'>
            {widgetData.wind_speed}
            <span style={{ fontSize: '13px' }}> m/s</span>
          </Typography>
          <Typography variant='subtitle1'>Wind</Typography>
        </Box>
        <Box
          sx={{
            border: 1,
            px: 2,
            py: 4,
            m: 1,
            borderColor: 'rgb(232 232 232)',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h5'>
            {widgetData.wind_gust > 0 ? widgetData.wind_gust : '0'}
            <span style={{ fontSize: '13px' }}> m/s</span>
          </Typography>
          <Typography variant='subtitle1'>Wind Gust</Typography>
        </Box>
        <Box
          sx={{
            border: 1,
            px: 2,
            py: 4,
            m: 1,
            borderColor: 'rgb(232 232 232)',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h5'>{widgetData.wind_deg}°</Typography>
          <Typography variant='subtitle1'>Wind Deg</Typography>
        </Box>
        <Box
          sx={{
            border: 1,
            px: 2,
            py: 4,
            m: 1,
            borderColor: 'rgb(232 232 232)',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h5'>
            {widgetData.humidity}
            <span style={{ fontSize: '13px' }}> %</span>
          </Typography>
          <Typography variant='subtitle1'>Humidity</Typography>
        </Box>
        <Box
          sx={{
            border: 1,
            px: 2,
            py: 4,
            m: 1,
            borderColor: 'rgb(232 232 232)',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h5'>
            {widgetData.wind_deg}
            <span style={{ fontSize: '13px' }}> hpa</span>
          </Typography>
          <Typography variant='subtitle1'>Pressure</Typography>
        </Box>
      </Box>
      <Box
        bgcolor='white'
        mt={2}
        display='flex'
        flexDirection='column'
        gap={1}
        p={2}
        sx={{ boxShadow: 2 }}
      >
        <WeatherChart graphData={data.graphData} />
      </Box>
    </Container>
  );
}
