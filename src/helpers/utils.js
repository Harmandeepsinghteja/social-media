export function getFormBody (params) {
    let formBody = [];

    for(let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodeValue = encodeURIComponent(params[property]);

        formBody.push(encodeValue + '=' + encodeValue);
    }

    return formBody.join('&');
    
}


export function getAuthtokenFromLocalStorage () {
    return localStorage.getItem('token');
}