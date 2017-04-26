import QueryString from "querystring";
import Axios from "axios";
import Utils from "../helper/Utils";

export function getRequest(param) {
    return Axios.get(process.env.REACT_APP_JETSPREE_API_URL + '/requests?' + QueryString.stringify(param))
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}

export function getRequests(param) {
    return Axios.get(process.env.REACT_APP_JETSPREE_API_URL + '/requests?' + QueryString.stringify(param))
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
        });
}

export function getRequest2(param) {
	return Axios({
		method: 'get',
		url: 'https://serene-meadow-20972.herokuapp.com/items?' + QueryString.stringify(param)
	})
		.then((resp) => resp.data)
		.catch((error) => console.log(error));
}

export function postRequests(param) {
    return Axios.post(process.env.REACT_APP_JETSPREE_API_URL + '/auth/requests', param,
        {headers: {'x-access-token': Utils.getCookie('token')}})
        .then((response) => response.data)
        .catch(function (error) {
            console.log(error);
        });
}

export function PostRequest2(param) {
    return Axios({
        method: 'post',
        url: 'https://serene-meadow-20972.herokuapp.com/items',
        data: param
    })
        .then((resp) => resp.data)
        .catch((error) => console.log(error));
}

export function loadItems(param) {
    return Axios({
        method: 'GET', url: 'https://www.jetspree.com/api/items?' + QueryString.stringify(param),
        crossDomain: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.data)
        .catch((error) => {
        });
}