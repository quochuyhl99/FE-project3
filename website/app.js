/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "80e478470edd82b0abecebc376559669";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial`;

const genButton = document.querySelector("#generate");
genButton.addEventListener("click", () => {
    const zipCode = document.querySelector("#zip").value;
    getWeather(apiUrl, zipCode);
});

const getWeather = async (apiUrl, zipCode) => {
    const url = `${apiUrl}&zip=${zipCode}`;
    const request = await fetch(url);
    try {
        const response = await request.json();
        let tempObj = JSON.parse(`{"epoch_time": "${response.dt}"}`);
        tempObj = new Date(1000 * tempObj.epoch_time);
        const date = tempObj.toLocaleString();
        const temp = response.main.temp;
        const feelings = document.querySelector("#feelings").value;
        postData("/add", { date, temp, feelings }).then((data) => {
            addRecentEntry(data);
        });
    } catch (error) {
        console.log("error", error);
    }
};

// POST request
const postData = async (url = "", dataReq = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataReq),
    });

    try {
        const dataRes = await response.json();
        return dataRes;
    } catch (error) {
        console.log("error", error);
    }
};

const addRecentEntry = (data) => {
    document.querySelector("#date").innerHTML = `date: ${data.date}`;
    document.querySelector("#temp").innerHTML = `temp :${data.temp}`;
    document.querySelector("#content").innerHTML = `Feel: ${data.feelings}`;
};
