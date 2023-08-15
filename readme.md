# Weather App with OpenWeather API, PHP, and MySQL

This is a simple weather app that fetches 7-day weather forecast data from the OpenWeather API using JavaScript, stores the data in a MySQL database using PHP, and displays the stored data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Fetching Weather Data](#fetching-weather-data)
  - [Storing Weather Data](#storing-weather-data)
  - [Displaying Weather Data](#displaying-weather-data)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Web server (e.g., Apache)
- PHP
- MySQL
- OpenWeather API Key

### Installation

1. Clone this repository to your web server directory.
2. Replace `'YOUR_API_KEY'` in `script.js` with your OpenWeather API key.
3. Configure your MySQL database credentials in `2357932_sajanmainali_weatherhistory.php` and `2357932_sajanmainali_getweatherdata.php`.
4. Create the MySQL schema by running the provided SQL script `create_schema.sql` in the `sql_scripts` directory.

## Usage

### Fetching Weather Data

- Open `index.html` in your web browser.
- The JavaScript code in `script.js` will fetch 7-day weather forecast data from the OpenWeather API for the specified city.

### Storing Weather Data

- The fetched weather data will be sent to `2357932_sajanmainali_weatherhistory.php`.
- Modify the MySQL connection credentials in `2357932_sajanmainali_weatherhistory.php`.
- This script will store the received data in the MySQL database.

### Displaying Weather Data

- The stored weather data can be displayed using `2357932_sajanmainali_getweatherdata.php`.
- Modify the MySQL connection credentials in `2357932_sajanmainali_getweatherdata.php`.
- This script retrieves the stored data from the database and displays it.

## Database Schema

Here's the table schema used to store weather data:

```sql
CREATE TABLE data_weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature DECIMAL(5, 2),
    description VARCHAR(255),
    city VARCHAR(100),
    date VARCHAR(255),
    day_of_week VARCHAR(20),
    icon VARCHAR(10),
    UNIQUE KEY unique_date_city (date, city)
);


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## License

This project is licensed under the MIT License. 


Copyright (c) 2023 Sajan Mainali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


