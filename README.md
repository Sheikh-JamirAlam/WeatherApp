# StudentAttendance

Here are the steps to run WeatherApp on your local system :-

## Prerequisites

- NodeJS
- Git

## Installation

Run these commands in your terminal to install the app:

```sh
git clone https://github.com/Sheikh-JamirAlam/WeatherApp.git
cd WeatherApp
npm i
```

Create a .env file using this command:

```sh
cp cp .env.example .env
```

Add the required environment variables:

```
VITE_API_KEY= <Openweathermap Api key, https://openweathermap.org/current>
VITE_TIME_UNAME= <Geonames Api username, http://www.geonames.org/export/web-services.html#timezone>
```

## Deployment

Run this command in your terminal to run the app in your local system:

```sh
npm run dev
```

## Production build

Run this command in your terminal to build the app:

```sh
npm run build
```

To preview the build run:

```sh
npm run preview
```
