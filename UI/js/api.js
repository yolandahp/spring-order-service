function APIService(){
    this.baseServiceAPI = {
        'order' : 'https://rapunjel.southeastasia.cloudapp.azure.com/api/',
        'payment' : 'https://pyradian.me:9443/api/v1/',
        'user' : 'https://rendoru.com/kuliah/pbkk/',
        'restaurant' : '',
        'kitchen' : '',
        'deals' : '',
        'delivery' : '',
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
    let self = this;

    await fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            self.dataOrders = data;
        });

    return this.dataOrders;
}

APIService.prototype.getOrder = async function (orderId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString();
    let self = this;

    await fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.order[orderId] = data;
        });

    return this.order[orderId];
}

APIService.prototype.createOrders = async function (order) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    await fetch(apiURL, {
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

APIService.prototype.changeOrderStatus = async function (orderId, status) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/status';
    let self = this;

    await fetch(apiURL, {
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

APIService.prototype.getOrderDetails = async function(orderId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details';
    let self = this;

    await fetch(apiURL, {
        headers : self.headers,
    })
        .then(response => response.json())
        .then(data => {
            self.orderDetail[orderId] = data;
        });

    return this.orderDetail[orderId];
}

APIService.prototype.addOrderDetails = async function (orderDetail) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/';
    let self = this;

    await fetch(apiURL, {
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

APIService.prototype.updateOrderDetails = async function (orderId, detailId, orderDetail) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details/' + detailId.toString();
    let self = this;

    await fetch(apiURL, {
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

APIService.prototype.deleteOrderDetails = async function (orderId, detailId) {
    let apiURL = this.baseServiceAPI['order'] + 'orders/' + orderId.toString() + '/details/' + detailId.toString();
    let self = this;

    await fetch(apiURL, {
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

APIService.prototype.paymentOrder = async function (order) {
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

    await fetch(apiURL, {
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