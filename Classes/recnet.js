var axios = require("axios");

// GET RecNet
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

// POST RecNet
async function postData(url, formData) {
    //console.log(formData);
        axios({
            method: "post",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                //console.log(response);
                return response;
            })
            .catch(function (error) {
                //handle error
                console.log('=============================================== Error ====================================================');
                //console.log(error);
                console.log(error.response.data);
                console.log(error.response.headers);
                console.log(error.response.status);
                return error;
            });
}

module.exports.postData = postData;