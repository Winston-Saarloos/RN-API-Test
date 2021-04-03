var axios = require("axios");

async function getData(url) {
    return new Promise(function (resolve, reject) {
       axios.get(url)
           .then(function (response) {
               // handle success
               resolve(response);
           })
           .catch(function (error) {
               // handle error
               console.log(error);
               reject(error);
           })
           .then(function () {
               // always executed
           });
    });
}

module.exports.getData = getData;