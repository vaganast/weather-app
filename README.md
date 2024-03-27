# Project Title:

Weather-app
Appearing forecast information for a specific town of Greece Thessaloniki.

## Project Description:

The app gets data from the API (https://openweathermap.org/api/one-call-api) .
On the top showing the date and time from last updated weather data.
First data the user see, is the current weather information which are auto updated every 2 minutes on "tab" now,
users have options to see weather data from today "tab" which are the mean values of the current day and also from select day "tab" can select 6days ahead from today that are the mean values of that days.
At the end an independent chart on bottom of the app showing max temps from today on 6 days ahead.

## How to Install and Run the Project

Download or clone the repository
cd weather-app
npm install
npm run dev
the app will run in local: http://localhost:3000/

Because the api we use is local
open new terminal cd weather-app , if not in the project folder,
and run the following command:
json-server --watch api/weatherAPI.json --port 8000

the api end point is : http://localhost:8000/weather

## Technologies Used

The app was create with React + Vite and for styling Mui
