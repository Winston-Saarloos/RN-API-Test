var axios = require("axios");
var qs = require("qs");
const puppeteer = require('puppeteer');
const config = require("../Config/config.json");

var axiosResult = {
    'headers': {},
    'data': {},
    'status': 0,
}

// GET RecNet
async function getData(url) {
    return new Promise(function (resolve, reject) {
        var result = {
            data: {},
            status: 0
        }
        axios.get(url, {
            validateStatus: function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        })
            .then(function (response) {
                // handle success
                result.data = response.data;
                result.status = response.status;

                resolve(result);
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
                console.log('Error');
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    result.data = error.response.data;
                    result.status = error.response.status;

                    resolve(result);

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js

                    result.status = -1;

                    resolve(result);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    reject(error.message);
                }
                //console.log(error.config);
            })
            .then(function () {
                // Always Execute
            });
    });
}

module.exports.getData = getData;

// POST RecNet
async function postData(url, formData) {
    console.log("FORM DATA");
    console.log(encodeURI(formData.id));
    var responseResult = axiosResult;
    axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then(function (response) {
            //handle success
            //console.log(response);

            responseResult.data = response.data;
            return responseResult;
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                responseResult.data = error.response.data;
                responseResult.status = error.response.status;
                responseResult.headers = error.response.headers;

                console.log('An error occured with the RESPONSE.');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('An error occured with the REQUEST.');
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

    return responseResult;
}

module.exports.postData = postData;

// Used for logging into recnet using a Rec Room account.
// A 'bearer token' is used for making authenticated requests
async function getBearerToken() {
    const browser = await puppeteer.launch({ headless: true, slowMo: 0, devtools: false });
    const page = await browser.newPage();
    console.log(config.rrPassword);
    await page.goto('https://auth.rec.net/Account/Login');
    await page.type('#Input_Username', config.rrUsername);
    await page.type('#Input_Password', config.rrPassword);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.goto('https://rec.net/user/Mr.Filmz');

    // await page.on('response', async (response) => {
    //     if (response.url() == "https://match.rec.net/player?id=300314" || response.url() == "https://match.rec.net/player?id=1546112&id=300314") {
    //         console.log('XHR response received');
    //         console.log(await response.json());
    //     }
    // });

    var accessTokenObj = await page.evaluate(() => { return localStorage.getItem("Bearer") });

    console.log("Access Token: ", accessTokenObj);

    const localStorageData = await page.evaluate(() => {
        let json = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            json[key] = localStorage.getItem(key);
        }
        return json;
    });

    var oneStep = localStorageData["oidc.user:https://auth.rec.net:recnet"];
    //console.log(oneStep);
    var twoStep = JSON.parse(oneStep);
    //console.log(twoStep["access_token"]);

    return twoStep["access_token"];
    //await page.setRequestInterception(false);
    //await browser.close();
};    

module.exports.getBearerToken = getBearerToken;