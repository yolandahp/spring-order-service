function APIService(){
    this.baseServiceAPI = {
        'order' : 'https://rapunjel.southeastasia.cloudapp.azure.com/api/',
        'payment' : 'https://pyradian.me:9443/api/v1/',
        'user' : 'https://rendoru.com/kuliah/pbkk/',
        'deals' : 'https://deals-if-its.azurewebsites.net/api/',
        'delivery' : 'http://delivery.eastus.cloudapp.azure.com/delivery/',
        'restaurant' : 'https://pbkkresserv.southeastasia.cloudapp.azure.com/',
        'kitchen' : '',
    };

    this.headers = {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJST09UIiwibmFtZSI6Im9yZGVyX3NlcnZpY2UiLCJyb2wiOiJBRE1JTiJ9.5B8OQdekrfbgw3XwA3dmCh-vZTmnaYVpfOT4bwI2KxG4B0ErEGBLIkF1CM5HwnITYLmT3cXal6FYXPzEtOXelQ",
    }

    this.deliveryCost = 0;
    this.dataOrders = [];
    this.order = {}
    this.orderDetail = {}
    this.returnValue = {}
}

// DELIVERY SERVICE

APIService.prototype.getOrderDeliveryCost = async function (restaurantPosition){
    let apiURL = "https://cors-anywhere.herokuapp.com/" + this.baseServiceAPI['delivery'] + 'estimated';
    apiURL += '?start='+this.userPosition+'&end='+restaurantPosition;

    let token = localStorage.getItem('token');

    let self = this;

    return await fetch(apiURL, {
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJfdHlwZSI6InVzZXIiLCJ1c2VyX25hbWUiOiJjdXN0b21lciIsInNjb3BlIjpbInJlYWRfZHJpdmVyIiwicmVhZF91c2VyIiwicmVhZF9yZXN0YXVyYW50Il0sImV4cCI6MTU1ODQ3OTU5NiwiYXV0aG9yaXRpZXMiOlsiVXNlciJdLCJqdGkiOiJhN2EzZjBiMi05Mjg1LTQwNjQtOGI1Mi0yYzU3NDNmOWU2Y2EiLCJjbGllbnRfaWQiOiJvcmRlciJ9.vYs8Cf8v4b6URRS_A_gpOBjLc7qTgSMTG0fqw9c5sSM", // + token.toString()
            "Authentication" : "hehe", 
        },
    })
        .then(response => response.json())
}

APIService.prototype.initGeolocation = async function(restaurantPosition) {
    if(navigator.geolocation) {
        return await navigator.geolocation.getCurrentPosition(this.getUserPosition.bind(this));
    } 
}

APIService.prototype.getUserPosition = function(position) {
    this.userPosition = position.coords.longitude.toString() + ',' + position.coords.latitude.toString();
    return this.getOrderDeliveryCost(window.end)
        .then( cost => {
            console.log(cost.cost);
            $('#delivery-cost').text(cost.cost);
        })
}

// ORDER SERVICE

APIService.prototype.getAllOrder = async function () {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';

    return await fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            self.dataOrders = data
            return data
        });
}

APIService.prototype.getOrder = async function (orderId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString();
    let self = this;

    return await fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            self.order[orderId] = data;
        });
}

APIService.prototype.createOrders = async function (order) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    return await fetch(apiURL, {
        method: 'POST',
        body : JSON.stringify( body ),
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
}

APIService.prototype.changeOrderStatus = async function (orderId, status) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/status';
    let self = this;

    return await fetch(apiURL, {
        method: 'PATCH',
        body : status.toString(),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
}

APIService.prototype.getOrderDetails = async function(orderId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details';
    let self = this;

    return await fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            self.orderDetail[orderId] = data;
        });
}

APIService.prototype.addOrderDetails = async function (orderDetail) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    return await fetch(apiURL, {
        method: 'POST',
        body : JSON.stringify(orderDetail),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
}

APIService.prototype.updateOrderDetails = async function (orderId, detailId, orderDetail) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details/' + detailId.toString();
    let self = this;

    return await fetch(apiURL, {
        method: 'PUT',
        body : JSON.stringify(orderDetail),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
}

APIService.prototype.deleteOrderDetails = async function (orderId, detailId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details/' + detailId.toString();
    let self = this;

    return await fetch(apiURL, {
        method: 'DELETE',
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
}


// PAYMENT SERVICE

APIService.prototype.paymentOrder = async function (order) {
    let apiURL = "https://cors-anywhere.herokuapp.com/" + this.baseServiceAPI['payment'] + 'transaction/foodorder/';
    let self = this;

    let jsonToSend = {
        food_order_bill : 12,
        food_order_wallets : {
            customer : {
                wallet_number : '6288804862376',
                amount : 12,
            },
            driver : {
                wallet_number : '6288804862377',
                amount : 12,
            },
            restaurant : {
                wallet_number : '6288804862378',
                amount : 12,
            },
        }
    }

    return await fetch(apiURL, {
        method: 'POST',
        body : JSON.stringify(jsonToSend),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
}

// USER SERVICE

APIService.prototype.getToken = async function (username, password) {
    let apiURL = "https://cors-anywhere.herokuapp.com/" + this.baseServiceAPI['user'] + 'oauth/token';

    return await fetch(apiURL, {
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Basic " + btoa("order:qwerty123"),
        },
        body : new URLSearchParams({
            grant_type : "password",
            username : username,
            password : password,
        }),
    })
        .then( response => response.json())
        .then( data => {
            console.log(data);
            let token = data.access_token;
            localStorage.setItem('token', token);
            return data;
        });
}

APIService.prototype.findUser = async function() {
    let apiURL = "https://cors-anywhere.herokuapp.com/" + this.baseServiceAPI['user'] + 'oauth/check_token';
    let apiURLUser = "https://cors-anywhere.herokuapp.com/" + this.baseServiceAPI['user'] + 'users/';

    let token = localStorage.getItem('token');
    let decodedJwt = localStorage.getItem('decodedJwt');

    return await fetch(apiURL, {
        method : "POST",
        body : new URLSearchParams({
            token : token
        }),
        headers : {
            "Authorization" : "Bearer "+token,
        }
    })
        .then( response => response.json() )
        .then( data => {
            userId = data.sub;
            return fetch(apiURLUser + userId.toString(), {
                headers : {
                    "Authorization" : "Bearer "+token,
                }  
            })
                .then( response => response.json())
                .then( dataUser => {
                    localStorage.setItem('user', JSON.stringify(dataUser));
                    return dataUser;
                })
        })
}

APIService.prototype.getUserData = async function(username, password) {
    await this.getToken(username, password)
    return await this.findUser();
}