const request = require("request");

let coordinateAddress = (Lattitude, Longitude) => {
    console.log(Lattitude);
    request(
        {
            url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${Lattitude}%2C${Longitude}&apiKey=xwqzui1BYBZZXx2JdbO5gZEy_T5ZXN6eVwdYyt9nXCE`,
            json: true,
        },
        (error, body, response) => {
            // console.log(JSON.stringify(response, undefined, 4));
            if (body.body.items[0] === undefined) {
                console.log("The address you provided does not exist");
            } else if (error) {
                console.log(
                    "unable to reach the server please check your internet connection"
                );
            } else {
                console.log(`Address: ${body.body.items[0].title}`);
                // console.log(`Longitude: ${body.body.items[0].position.lng}`);
                //console.log(`Lattitude: ${body.body.items[0].position.lat}`);
                request(
                    {
                        url: `https://api.openweathermap.org/data/2.5/weather?lat=${Lattitude}&lon=${Longitude}&appid=151424fbe812fef9072439933e047003`,
                        json: true,
                    },
                    (body, response, error) => {
                        let temprature = response.body.main.temp - 273;
                        let humidity = response.body.main.humidity;
                        let description = response.body.weather.description;
                        let winSpeed = response.body.wind.speed;

                        // console.log(JSON.stringify(response, undefined, 4));
                        console.log(description);
                        console.log(`It feels like: ${temprature}`);
                        console.log(`Current Humidity: ${humidity}`);
                        console.log(
                            `Current Wind Speed: ${winSpeed} meter/sec`
                        );
                        if (response.body.rain) {
                            let rain = JSON.stringify(response.body.rain["3h"]);
                            console.log(`Rain in last 3 hours: ${rain} mm`);
                        } else {
                            console.log("There is no rain in last 3 hours");
                        }
                    }
                );
            }
        }
    );
};

module.exports.coordinateRequest = coordinateAddress;
