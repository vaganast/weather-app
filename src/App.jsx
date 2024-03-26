import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import WeatherWidget from './components/WeatherWidget';

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: 600,
      color: 'rgb(51, 51, 51)',
    },
    subtitle1: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: 'rgb(151, 151, 151)',
    },
  },
  palette: {
    primary: {
      main: 'rgb(138, 198, 84)',
      // contrastText: 'rgb(138, 198, 84)',
    },
    secondary: {
      main: 'rgb(138, 198, 84)',
    },
    background: {
      default: 'rgb(252 252 252)',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgb(231, 243, 221, 50%)',
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <WeatherWidget />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
