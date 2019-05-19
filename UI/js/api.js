function APIService(){
    this.BASE_URL_API = {
        'order' : 'https://rapunjel.southeastasia.cloudapp.azure.com/api/',
        'payment' : 'https://pyradian.me:9443/api/v1/',
        'restaurant' : '',
        'kitchen' : '',
        'deals' : '',
        'delivery' : '',
        'user' : '',
    };

    this.headers = {
        "Content-Type" : "application/json",
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

APIService.prototype.getOrderDeliveryCost = function (restaurantPosition){
    let apiURL = this.baseServiceAPI['delivery'] + 'estimated/';
    apiURL += '?start='+this.userPosition+'&end='+restaurantPosition;

    let self = this;

    fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.deliveryCost = data.cost;
        });

    return this.deliveryCost;
}

// ORDER SERVICE

APIService.prototype.getAllOrder = function () {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.dataOrders = data;
        });

    return this.dataOrders;
}

APIService.prototype.getOrder = function (orderId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString();
    let self = this;

    fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.order[orderId] = data;
        });

    return this.order[orderId];
}

APIService.prototype.createOrders = function (order) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    fetch(apiURL, {
        method: 'POST',
        body : JSON.stringify(order),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
    
    return this.returnValue;
}

APIService.prototype.changeOrderStatus = function (orderId, status) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/status';
    let self = this;

    fetch(apiURL, {
        method: 'PATCH',
        body : status.toString(),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })

    return this.returnValue;
}

APIService.prototype.getOrderDetails = function(orderId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details';
    let self = this;

    fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.orderDetail[orderId] = data;
        });

    return this.orderDetail[orderId];
}

APIService.prototype.addOrderDetails = function (orderDetail) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    fetch(apiURL, {
        method: 'POST',
        body : JSON.stringify(orderDetail),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
    
    return this.returnValue;
}

APIService.prototype.updateOrderDetails = function (orderId, detailId, orderDetail) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details/' + detailId.toString();
    let self = this;

    fetch(apiURL, {
        method: 'PUT',
        body : JSON.stringify(orderDetail),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
    
    return this.returnValue;
}

APIService.prototype.deleteOrderDetails = function (orderId, detailId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details/' + detailId.toString();
    let self = this;

    fetch(apiURL, {
        method: 'DELETE',
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
    
    return this.returnValue;
}


// PAYMENT SERVICE

APIService.prototype.paymentOrder = function (order) {
    let apiURL = this.baseServiceAPI['payment'] + 'transaction/foodorder/';
    let self = this;

    let jsonToSend = {
        food_order_bill : order.total_price,
        food_order_wallets : {
            customer : {
                wallet_number : 'asd',
                amount : order.total_price,
            },
            driver : {
                wallet_number : 'asd',
                amount : order.delivery_cost,
            },
            restaurant : {
                wallet_number : 'asd',
                amount : order.total_price - order.delivery_cost,
            },
        }
    }

    fetch(apiURL, {
        method: 'POST',
        body : JSON.stringify(jsonToSend),
        headers : self.headers
    })
        .then(response => response.json())
        .then(data => {
            self.returnValue = data;
        })
    
    return this.returnValue;
}