import axios from 'axios';

class Http {
    static REQUEST = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
    });
    static axios = axios;

    constructor() {
        this.handleRequest();
        this.handleResponse();
    }

    /**
     * @name requestHandler
     * @param {object} request
     * @desc Callback being fired upon every request.
     * @return {object} modifedRequest
     */
    async requestHandler(request: any) {
        request.headers['Content-Type'] = 'application/json';
        return request;
    }

    /**
     * @name errorHandler
     * @param {object} error
     * @desc Callback being fired when error occurs while making HTTP call.
     * @return {object} error
     */
    errorHandler(error: Error) {
        throw error;
    }

    /**
     * @name successHandler
     * @param {object} response
     * @desc Callback being fired when HTTP request passes with success state.
     * @return {object}
     */
    successHandler(response: any) {
        return response;
    }

    /**
     * @name handleRequest
     * @desc Wrapper method handling all requests.
     * @return {void}
     */
    handleRequest() {
        Http.REQUEST.interceptors.request.use(async request => {
            return await this.requestHandler(request);
        });
    }

    /**
     * @name handleResponse
     * @desc Wrapper method handling all response.
     * @return {void}
     */
    handleResponse() {
        Http.REQUEST.interceptors.response.use(
            response => this.successHandler(response),
            error => this.errorHandler(error),
        );
    }
}

export default Http;