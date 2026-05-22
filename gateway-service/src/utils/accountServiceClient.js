const axios = require("axios");
const axiosRetry = require("axios-retry").default;

const client = axios.create({
    baseURL: process.env.ACCOUNT_SERVICE_URL,
    timeout: 2000
});

axiosRetry(client, {
    retries: 3,

    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },

    retryCondition: (error) => {
        return axiosRetry.isNetworkError(error) ||
            error.response?.status >= 500;
    }
});

module.exports = client;