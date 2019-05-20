function APIService(){
    this.baseServiceAPI = {
        'order' : 'https://rapunjel.southeastasia.cloudapp.azure.com/api/',
        'payment' : 'https://pyradian.me:9443/api/v1/',
        'user' : 'https://rendoru.com/kuliah/pbkk/',
        'deals' : 'https://deals-if-its.azurewebsites.net/api/',
        'delivery' : '',
        'restaurant' : '',
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

APIService.prototype.initGeolocation = function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getUserPosition);
    }
}

APIService.prototype.getUserPosition = function() {
    this.userPosition = position.coords.longitude.toString() + ',' + position.coords.latitude.toString();
}

APIService.prototype.getOrderDeliveryCost = async function (restaurantPosition){
    let apiURL = this.baseServiceAPI['delivery'] + 'estimated/';
    apiURL += '?start='+this.userPosition+'&end='+restaurantPosition;

    let self = this;

    await fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.deliveryCost = data.cost;
        });

    return this.deliveryCost;
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
    let apiURL = this.baseServiceAPI['user'] + 'oauth/token/';

    return await fetch(apiURL, {
        method : "POST",
        body : JSON.stringify({
            grant_type : "password",
            username : username,
            password : password,
        }),
        headers : new Headers({
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Basic b3JkZXI6cXdlcnR5MTIz",
        }),
    })
        .then( response => response.json())
        .then( data => {
            let token = data.access_token;
            let encodedData = token.split('.')[1];
            let decodedData = JSON.parse(window.atob(encodedData));
            localStorage.setItem('token', token);
            localStorage.setItem('decodedJwt', decodedData);
            return data;
        });
}

APIService.prototype.findUser = async function(userId) {
    let apiURL = this.baseServiceAPI['user'] + 'users/';
    let token = localStorage.getItem('token');
    let decodedJwt = localStorage.getItem('decodedJwt');
    return await fetch(apiURL + userId.toString(), {
        method : "GET",
        headers : {
            "Authorization" : "Bearer "+token,
        }
    })
        .then( response => response.json() )
        .then( data => {
            console.log(data);
            if (data.status == 200 && data.identifier == decodedJwt.user_name ) {
                return data;
            } else {
                if (data.status == 404) return null;
                return this.findUser(userId+1);
            }
        })
}

APIService.prototype.getUserData = async function(username, password) {
    await this.getToken(username, password)
    return await this.findUser(1);
}