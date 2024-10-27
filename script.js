// function init(inputId, outputId) {
//     var input = $(inputId);
//     var output = $(outputId);

//     $('#searchButton').on('click', function() {
//         search(input.val(), output);
//     });

//     input.on("keypress", function(e) {
//         if (e.which === 13) { 
//             search(input.val(), output);
//         }
//     });
// }

// const token = ""; // Replace with your actual API token


// function search(keyword, output) {
//     var info = token === "demo" ? "(based on demo token)" : "";
//     output.html("<h2>Search results " + info + ":</h2>");
//     output.append($("<div/>").html("Loading..."));
//     output.append($("<div/>").addClass("cp-spinner cp-meter"));

//     // let url = "https://api.waqi.info/v2/search/?token=" + token + "&keyword=" + keyword;
//     let url = `https://api.waqi.info/v2/search/?token=${token}&keyword=${encodeURIComponent(keyword)}`;


//     fetch(url)
//         .then((x) => x.json())
//         .then((result) => {
//             output.html("<h2>Search results " + info + ":</h2>");
//             if (!result || result.status !== "ok") {
//                 throw result.data;
//             }

//             if (result.data.length === 0) {
//                 output.append("Sorry, there is no result for your query!");
//                 return;
//             }

//             var table = $("<table/>").addClass("result");
//             output.append(table);
//             output.append($("<div/>").html("Click on any of the stations to see the detailed AQI"));

//             var stationInfo = $("#stationInfoId");

//             result.data.forEach(function(station, i) {
//                 var tr = $("<tr>");
//                 tr.append($("<td>").html(station.station.name));
//                 tr.append($("<td>").html(colorize(station.aqi)));
//                 tr.append($("<td>").html(station.time.stime));
//                 tr.on("click", function() {
//                     showStation(station, stationInfo);
//                 });
//                 table.append(tr);
//                 if (i === 0) showStation(station, stationInfo);
//             });
//         })
//         .catch((e) => {
//             output.html("<div class='ui negative message'>" + e + "</div>");
//         });
// }

// function showStation(station, output) {
//     output.html("<h2>Pollutants & Weather conditions:</h2>");
//     output.append($("<div/>").html("Loading..."));
//     output.append($("<div/>").addClass("cp-spinner cp-meter"));

//     const city = station.station.name; // Get the city name
//     const apiUrl = `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`;

//     $.get(apiUrl)
//         .done(function(data) {
//             console.log("API response:", data);
//             output.empty(); // Clearing previous content

//             if (!data || data.status !== "ok") {
//                 output.append("Sorry, something went wrong: ");
//                 if (data.message) output.append($("<code>").html(data.message));
//                 return;
//             }

//             var names = {
//                 pm25: "PM<sub>2.5</sub>",
//                 pm10: "PM<sub>10</sub>",
//                 o3: "Ozone",
//                 no2: "Nitrogen Dioxide",
//                 so2: "Sulphur Dioxide",
//                 co: "Carbon Monoxide",
//                 t: "Temperature",
//                 w: "Wind",
//                 r: "Rain (precipitation)",
//                 h: "Relative Humidity",
//                 d: "Dew",
//                 p: "Atmospheric Pressure",
//             };

//             output.append(
//                 $("<div>").html(
//                     "Station: " +
//                     data.data.city.name +
//                     " on " +
//                     data.data.time.s
//                 )
//             );

//             var table = $("<table/>").addClass("result");
//             output.append(table);

//             for (var specie in data.data.iaqi) {
//                 var aqi = data.data.iaqi[specie].v;
//                 var tr = $("<tr>");
//                 tr.append($("<td>").html(names[specie] || specie));
//                 tr.append($("<td>").html(colorize(aqi, specie)));
//                 table.append(tr);
//             }
//         })
//         .fail(function(jqXHR) {
//             console.error("Error fetching data:", jqXHR.status, jqXHR.statusText);
//             output.html("<h2>Sorry, an error occurred: " + jqXHR.statusText + "</h2>");
//         });
// }

// // Function to create the chart
// function createChart(days, pm25Avg, pm10Avg, o3Avg) {
//     const ctx = document.getElementById('airQualityChart').getContext('2d');
    
//     const chart = new Chart(ctx, {
//         type: 'line', // Choose the chart type (line, bar, etc.)
//         data: {
//             labels: days, // X-axis labels
//             datasets: [
//                 {
//                     label: 'PM2.5 Average',
//                     data: pm25Avg,
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     fill: false,
//                 },
//                 {
//                     label: 'PM10 Average',
//                     data: pm10Avg,
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     fill: false,
//                 },
//                 {
//                     label: 'O3 Average',
//                     data: o3Avg,
//                     borderColor: 'rgba(255, 206, 86, 1)',
//                     fill: false,
//                 }
//             ]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// function colorize(aqi, specie) {
//     specie = specie || "aqi";
//     if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
//         return aqi;

//     var spectrum = [
//         { a: 0, b: "#cccccc", f: "#ffffff" },
//         { a: 50, b: "#009966", f: "#ffffff" },
//         { a: 100, b: "#ffde33", f: "#000000" },
//         { a: 150, b: "#ff9933", f: "#000000" },
//         { a: 200, b: "#cc0033", f: "#ffffff" },
//         { a: 300, b: "#660099", f: "#ffffff" },
//         { a: 500, b: "#7e0023", f: "#ffffff" },
//     ];

//     var i = 0;
//     for (i = 0; i < spectrum.length - 2; i++) {
//         if (aqi === "-" || aqi <= spectrum[i].a) break;
//     }
//     return $("<div/>")
//         .html(aqi)
//         .css("font-size", "120%")
//         .css("min-width", "30px")
//         .css("text-align", "center")
//         .css("background-color", spectrum[i].b)
//         .css("color", spectrum[i].f);
// }

// $(document).ready(function() {
//     init('#inputId', '#outputId'); 
// });

// // Example usage when the search button is clicked
// $('#searchButton').on('click', function() {
//     const city = $('#inputId').val(); // Get the city from input
//     $('#stationName').html(city); // Display the station name
//     fetchForecastData(city); // Fetch and plot data for the selected city
// });

// // Function to fetch forecast data
// async function fetchForecastData(city) {
//     //const response = await fetch(`https://api.waqi.info/feed/${city}/?token=MY_API`); // Use the city in the API URL
//     const response = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`);
//     const data = await response.json();
//     plotForecastData(data.data.forecast); // Access the forecast part of the fetched data
// }

// async function plotForecastData(forecast) {
//     if (!forecast || !forecast.daily) {
//         console.error("No valid forecast data available.");
//         return; // Exit if forecast data is not available
//     }

//     const dailyData = forecast.daily;

//     // Check if the expected pollutants are present in the data
//     if (!dailyData.o3 || !dailyData.pm10 || !dailyData.pm25 || !dailyData.uvi) {
//         console.error("Daily data for pollutants is missing.");
//         return; // Exit if any expected data is missing
//     }

//     // Plot Ozone (o3)
//     plotChart('o3Chart', dailyData.o3, 'Ozone Levels (O3)', 'blue');

//     // Plot PM10
//     plotChart('pm10Chart', dailyData.pm10, 'PM10 Levels', 'orange');

//     // Plot PM2.5
//     plotChart('pm25Chart', dailyData.pm25, 'PM2.5 Levels', 'green');

//     // Plot UV Index
//     plotChart('uviChart', dailyData.uvi, 'UV Index', 'purple');
// }

// function plotChart(canvasId, data, label, color) {
//     const dates = data.map(item => item.day);
//     const avgValues = data.map(item => item.avg);
//     const maxValues = data.map(item => item.max);
//     const minValues = data.map(item => item.min);

//     const ctx = document.getElementById(canvasId).getContext('2d');
//     const chart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: dates,
//             datasets: [
//                 {
//                     label: `${label} Average`,
//                     data: avgValues,
//                     borderColor: color,
//                     fill: false,
//                 },
//                 {
//                     label: `${label} Max`,
//                     data: maxValues,
//                     borderColor: 'red',
//                     fill: false,
//                 },
//                 {
//                     label: `${label} Min`,
//                     data: minValues,
//                     borderColor: 'lightgray',
//                     fill: false,
//                 }
//             ]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }




//gpt'd changes
function init(inputId, outputId) {
    var input = $(inputId);
    var output = $(outputId);

    $('#searchButton').on('click', function() {
        search(input.val(), output);
    });

    input.on("keypress", function(e) {
        if (e.which === 13) { 
            search(input.val(), output);
        }
    });
}

const token = "53eb6a4f6d599e4356eba3b58a23a4e4da02000d"; // Replace with your actual API token

function search(keyword, output) {
    var info = token === "demo" ? "(based on demo token)" : "";
    output.html("<h2>Search results " + info + ":</h2>");
    output.append($("<div/>").html("Loading..."));
    output.append($("<div/>").addClass("cp-spinner cp-meter"));

    let url = `https://api.waqi.info/v2/search/?token=${token}&keyword=${encodeURIComponent(keyword)}`;

    fetch(url)
        .then((x) => x.json())
        .then((result) => {
            output.html("<h2>Search results " + info + ":</h2>");
            if (!result || result.status !== "ok") {
                throw result.data;
            }

            if (result.data.length === 0) {
                output.append("Sorry, there is no result for your query!");
                return;
            }

            var table = $("<table/>").addClass("result");
            output.append(table);
            output.append($("<div/>").html("Click on any of the stations to see the detailed AQI"));

            var stationInfo = $("#stationInfoId");

            result.data.forEach(function(station, i) {
                var tr = $("<tr>");
                tr.append($("<td>").html(station.station.name));
                tr.append($("<td>").html(colorize(station.aqi)));
                tr.append($("<td>").html(station.time.stime));
                tr.on("click", function() {
                    showStation(station, stationInfo);
                });
                table.append(tr);
                if (i === 0) showStation(station, stationInfo);
            });
        })
        .catch((e) => {
            output.html("<div class='ui negative message'>" + e + "</div>");
        });
}

function showStation(station, output) {
    output.html("<h2>Pollutants & Weather conditions:</h2>");
    output.append($("<div/>").html("Loading..."));
    output.append($("<div/>").addClass("cp-spinner cp-meter"));

    const city = station.station.name; // Get the city name
    const apiUrl = `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`;

    $.get(apiUrl)
        .done(function(data) {
            console.log("API response:", data);
            output.empty(); // Clearing previous content

            if (!data || data.status !== "ok") {
                output.append("Sorry, something went wrong: ");
                if (data.message) output.append($("<code>").html(data.message));
                return;
            }

            var names = {
                pm25: "PM<sub>2.5</sub>",
                pm10: "PM<sub>10</sub>",
                o3: "Ozone",
                no2: "Nitrogen Dioxide",
                so2: "Sulphur Dioxide",
                co: "Carbon Monoxide",
                t: "Temperature",
                w: "Wind",
                r: "Rain (precipitation)",
                h: "Relative Humidity",
                d: "Dew",
                p: "Atmospheric Pressure",
            };

            output.append(
                $("<div>").html(
                    "Station: " +
                    data.data.city.name +
                    " on " +
                    data.data.time.s
                )
            );

            var table = $("<table/>").addClass("result");
            output.append(table);

            for (var specie in data.data.iaqi) {
                var aqi = data.data.iaqi[specie].v;
                var tr = $("<tr>");
                tr.append($("<td>").html(names[specie] || specie));
                tr.append($("<td>").html(colorize(aqi, specie)));
                table.append(tr);
            }

            // Fetch forecast data
            fetchForecastData(city);
        })
        .fail(function(jqXHR) {
            console.error("Error fetching data:", jqXHR.status, jqXHR.statusText);
            output.html("<h2>Sorry, an error occurred: " + jqXHR.statusText + "</h2>");
        });
}

// Function to create the chart
function createChart(days, pm25Avg, pm10Avg, o3Avg) {
    const ctx = document.getElementById('airQualityChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'line', // Choose the chart type (line, bar, etc.)
        data: {
            labels: days, // X-axis labels
            datasets: [
                {
                    label: 'PM2.5 Average',
                    data: pm25Avg,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                },
                {
                    label: 'PM10 Average',
                    data: pm10Avg,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                },
                {
                    label: 'O3 Average',
                    data: o3Avg,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function colorize(aqi, specie) {
    specie = specie || "aqi";
    if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
        return aqi;

    var spectrum = [
        { a: 0, b: "#cccccc", f: "#ffffff" },
        { a: 50, b: "#009966", f: "#ffffff" },
        { a: 100, b: "#ffde33", f: "#000000" },
        { a: 150, b: "#ff9933", f: "#000000" },
        { a: 200, b: "#cc0033", f: "#ffffff" },
        { a: 300, b: "#660099", f: "#ffffff" },
        { a: 500, b: "#7e0023", f: "#ffffff" },
    ];

    var i = 0;
    for (i = 0; i < spectrum.length - 2; i++) {
        if (aqi === "-" || aqi <= spectrum[i].a) break;
    }
    return $("<div/>")
        .html(aqi)
        .css("font-size", "120%")
        .css("min-width", "30px")
        .css("text-align", "center")
        .css("background-color", spectrum[i].b)
        .css("color", spectrum[i].f);
}

$(document).ready(function() {
    init('#inputId', '#outputId'); 
});

// Example usage when the search button is clicked
$('#searchButton').on('click', function() {
    const city = $('#inputId').val(); // Get the city from input
    $('#stationName').html(city); // Display the station name
});

// Function to fetch forecast data
async function fetchForecastData(city) {
    const response = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`);
    const data = await response.json();
    
    if (data.status === "ok" && data.data.forecast) {
        plotForecastData(data.data.forecast);
    } else {
        // If forecast data is not available
        $('#stationInfoId').append("<div>No forecast data available.</div>");
    }
}

async function plotForecastData(forecast) {
    if (!forecast || !forecast.daily) {
        console.error("No valid forecast data available.");
        return; // Exit if forecast data is not available
    }

    const dailyData = forecast.daily;

    // Check if the expected pollutants are present in the data
    if (!dailyData.o3 || !dailyData.pm10 || !dailyData.pm25 || !dailyData.uvi) {
        console.error("Daily data for pollutants is missing.");
        return; // Exit if any expected data is missing
    }

    // Plot Ozone (o3)
    plotChart('o3Chart', dailyData.o3, 'Ozone Levels (O3)', 'blue');

    // Plot PM10
    plotChart('pm10Chart', dailyData.pm10, 'PM10 Levels', 'orange');

    // Plot PM2.5
    plotChart('pm25Chart', dailyData.pm25, 'PM2.5 Levels', 'green');

    // Plot UV Index
    plotChart('uviChart', dailyData.uvi, 'UV Index', 'purple');
}

let charts = {}; // Object to store chart instances

function plotChart(canvasId, data, label, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Destroy existing chart if it exists
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }

    const dates = data.map(item => item.day);
    const avgValues = data.map(item => item.avg);
    const maxValues = data.map(item => item.max);
    const minValues = data.map(item => item.min);

    // Create a new chart instance
    charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: `${label} Average`,
                    data: avgValues,
                    borderColor: color,
                    fill: false,
                },
                {
                    label: `${label} Max`,
                    data: maxValues,
                    borderColor: 'red',
                    fill: false,
                },
                {
                    label: `${label} Min`,
                    data: minValues,
                    borderColor: 'lightgray',
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
