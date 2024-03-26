import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

const chartsParams = {
  grid: { vertical: true },
  yAxis: [{ label: 'Temperature' }],
  margin: { bottom: 20, left: 45, right: 25 },
  height: 300,
};
export default function WeatherChart({ graphData }) {
  return (
    <>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
        Weekly Variation
      </Typography>

      <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
        <LineChart
          {...chartsParams}
          xAxis={[{ scaleType: 'point', data: graphData.xAxis }]}
          series={[
            {
              data: graphData.series,
              label: 'max temperature °C',
              color: 'rgb(138, 198, 84)',
            },
          ]}
        />
      </Stack>
    </>
  );
}
