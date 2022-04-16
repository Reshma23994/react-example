import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    // timeout: 10000,
    //headers: {"Content-Type": "application/json"}
});

instance.interceptors.response.use(
    (res) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        try {
            console.log("instance.interceptors.response res.data ->", res.data.statusCode);
            if (res.data.statusCode === 401) {
                sessionStorage.clear();
                window.location.href = '/';
            }
            return res;
        } catch (e) {
            console.log("instance.interceptors.response Error ->", e);
        }
    },
    (res) => {
        try {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log("res.data ->", res.response);
            if (res.response.status === 401) {
                sessionStorage.clear();
                window.location.href = '/sign-in';
            }
            return res;
        } catch (e) {
            console.log("instance.interceptors.response Error ->", e);
        }
    }
);

instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('userToken') || JSON.stringify({});
        try {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: `Bearer ${token || ""}`,
                },
            };
        } catch (error) {
            console.error(`instance.interceptors.request Error : -`, error);
        }
    },
    (error) => {
        console.log("instance.interceptors.request Error ->", error);
    }
);

export default instance;