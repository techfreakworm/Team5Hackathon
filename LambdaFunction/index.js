/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
const https = require('https');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.2431ad4d-8bab-4951-91a4-3f4c8fffc56d";

const SKILL_NAME = 'Soft Widget';
const ABOUT_COMPANY = 'Soft Widget is a hotshot tech company. For more info say, "help me"'
const listen_message = 'What do you want to do next?'
const HELP_MESSAGE = "you can get info about products, place an order, modify an order, get status of order and even delete an order"
const STOP_MESSAGE = "Goodbye! have a great day ahead!"
const handlers = {
    'LaunchRequest': function () {
        this.emit('AboutCompany');
    },
    'AboutCompany': function () {
        const about = ABOUT_COMPANY;

        this.response.cardRenderer(SKILL_NAME, about);
        this.response.speak(about).listen(listen_message);
        this.emit(':responseReady');
    },
    'GetAllProducts': function () {
        httpsGet('/api/products', (theResult) => {
            const result = theResult;
            const allProducts = JSON.parse(result).data;
            var productList = [];
            for (let i = 0; i<allProducts.length;i++){
                productList.push(allProducts[i].name)
            }
            const speechOutput = "Here are all the products: "+productList.toString();
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput).listen(listen_message);
            this.emit(':responseReady');
        });
    },
    'GetProduct': function () {
        //const product_name = this.event.request.intent.slots.product_name.value;
        const product_name = "Soft Generation 2";
        httpsGet('/api/products', (theResult) => {
            const result = theResult;
            const allProducts = JSON.parse(result).data;
            // var thisProduct= "Product not found";
            // for (let i =0; i<allProducts.length; i++)
            // {
            //     if(allProducts[i].name.toLowerCase() == product_name){
            //         thisProduct = allProducts[i]
            //     }
            // }
            const productDescription = allProducts[0].description;
            const speechOutput = "Here's the description about "+product_name+", "+productDescription+". Rate is: "+allProducts[0].price +" dollars.";
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput).listen(listen_message);
            this.emit(':responseReady');
        });
    },
    'InfoOrder': function () {
        
         var product = null;
         httpsGet('/api/products', (theResult) => {
            const result = theResult;
            product = JSON.parse(result).data[0];
            
        });
        
        
        
        
        var speechOutput = "No orders to fetch";
        var cardMessage = "No orders to fetch";
        httpsGet('/api/orders', (theResult) => {
            const result = theResult;
            const orders = JSON.parse(result).data;
            var product_names = [];
            var ordered_by=[];
            var order_id=[];
            var status=[];
            var total=[];
            
            //console.log(allProducts)
            
           
            
            for (let i=0; i<orders.length;i++){
                
                
                product_names.push(orders[i].product.name);
                ordered_by.push(orders[i].customer.firstName);
                order_id.push(orders[i].orderNumber);
                status.push(orders[i].state);
                total.push(orders[i].total);
            }
            // var productIndex = orders.length -1;
            // product_names.push(orders[productIndex].product.name);
            //     ordered_by.push(orders[productIndex].customer.firstName);
            //     order_id.push(orders[productIndex].orderNumber);
            //     status.push(orders[productIndex].state);
            //console.log(orders);
            speechOutput = "";
            cardMessage = "";
            console.log("Before loop");
            for (let i=0; i<orders.length;i++){
                
                
                speechOutput = speechOutput+ "Order for "+product_names[i]+ " with order number "+order_id[i]+" and amount "+total[i]+" dollars ordered by "+ordered_by[i]+" is "+ status[i]+", ";
                
            }
            // let i=0;
            // speechOutput = speechOutput+ "Order for "+product_names[i]+ " ordered by "+ordered_by[i]+" is "+ status[i]+ ", ";
            
            console.log("SPech output------->"+speechOutput);
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput).listen(listen_message);
            this.emit(':responseReady');
        });
    },
    'GetOrder': function () {
       
        const order_number = this.event.request.intent.slots.order_number.value;
        httpsGet('/api/orders', (theResult) => {
            const result = theResult;
            const orders = JSON.parse(result).data;

            var order=null;
            
            for (let i=0; i<orders.length;i++){
                if(order_number == orders[i].orderNumber){
                    order = orders[i];
                }
            }
            
            const speechOutput =  "Order for "+ order.product.name + " with order number "+order.orderNumber+" ordered by "+order.customer.firstName+" is "+ order.state+", ";
            
            
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput).listen(listen_message);
            this.emit(':responseReady');
        });
    },
    'CancelOrder': function () {
        const order_number = this.event.request.intent.slots.order_number.value;
        httpsDelete('/api/order/'+order_number, (theResult) => {
            const result = theResult;

            const speechOutput = JSON.parse(result).message;
            this.response.cardRenderer(SKILL_NAME, result);
            this.response.speak(speechOutput).listen(listen_message);
            this.emit(':responseReady');
        });
    },
    'ModifyOrder': function () {
        const order_number = this.event.request.intent.slots.order_number.value;
        const address1 = this.event.request.intent.slots.address_one.value;
        const address2 = this.event.request.intent.slots.address_two.value;
        const state = this.event.request.intent.slots.state.value;
        const zip = this.event.request.intent.slots.zip.value;
        const phoneNumber = this.event.request.intent.slots.phone.value;
        const firstName = this.event.request.intent.slots.firstName.value;
        const lastName = this.event.request.intent.slots.lastName.value;
        
         var updateParams = {
                "shippingAddress":{
                    "address1":address1,
                    "address2":address2,
                    "state":state,
                    "zip":zip
                },
                "customer":{
                    "phoneNumber":phoneNumber,
                    "firstName":firstName,
                    "lastName":lastName
                }
                
            };
            console.log(updateParams);
         httpsPut(updateParams,'/api/order/'+order_number, (theResult) => {
             console.log(theResult);
            const result = theResult;
            
           

            const speechOutput = JSON.parse(result).message;
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput+" Goodbye and have a nice day");
            this.emit(':responseReady');
        });
    },
    'PlaceOrder': function () {
        //const username=httpGet()
        //const name = this.event.request.intent.slots.name.value;
        //const product_name = this.event.request.intent.slots.product_name.value;
        //const product_quantity = this.event.request.intent.slots.product_quantity.value;
        //const phone = this.event.request.intent.slots.phone.value;
        //const house_no = this.event.request.intent.slots.house_no.value;
        //const street_name = this.event.request.intent.slots.street_name.value;
        //const email = this.event.request.intent.slots.email.value;

        //const output = "Order is placed:" + product_quantity + product_name + ", receipt sent to " + email;
        
        const address1=this.event.request.intent.slots.address_one.value;
        const address2=this.event.request.intent.slots.address_two.value;
        const state=this.event.request.intent.slots.state.value;
        const zip=this.event.request.intent.slots.zip.value;
        const shippingMethod=this.event.request.intent.slots.shippingMethod.value;
        const paymentMethod=this.event.request.intent.slots.paymentMethod.value;
        const firstName=this.event.request.intent.slots.firstName.value;
        const lastName=this.event.request.intent.slots.lastName.value;
        const phone=this.event.request.intent.slots.phone.value;
        const quantity=this.event.request.intent.slots.quantity.value;
        
        
 
        var data={
    "total": 30,
    "product": "5c9d3c4ce5ca625d33612e8f",
    "shippingAddress": {
        "address1": address1,
        "address2": address2,
        "state": state,
        "zip": zip
    },
    "billingAddress": {
       "address1": address1,
        "address2": address2,
        "state": state,
        "zip": zip
    },
    "salesTax": "10.25",
    "shippingMethod": shippingMethod+ " delivery",
    "state": "pending",
    "paymentMethod": paymentMethod,
    "quantity": quantity,
    "customer": {
        "firstName": firstName,
        "lastName": lastName,
        "email": "dummytest@testmail.com",
        "phoneNumber": phone
    }
}
      
        httpsPost(data, '/api/orders', (theResult) => {
            const result = JSON.parse(theResult);
            console.log(theResult);
            const speechOutput = result.message + "with order number " +result.data.orderNumber;
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput+". Goodbye. Have a great day ahead!");
            this.emit(':responseReady');
        });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        

        this.response.speak(speechOutput).listen(listen_message);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

function httpsGet(apiPath, callback) {

    var options = {
        port: 443,
        host: 'softwidgetapi-qa.herokuapp.com',
        path: apiPath,
        method: 'GET',
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var responseString = "";

        //accept incoming data asynchronously
        res.on('data', chunk => {
            responseString = responseString + chunk;
        });

        //return the data when streaming is complete
        res.on('end', () => {
            console.log(responseString);
            callback(responseString);
        });

    });
    req.end();
}

function httpsDelete(apiPath, callback) {

    var options = {
        port: 443,
        host: 'softwidgetapi-qa.herokuapp.com',
        path: apiPath,
        method: 'DELETE',
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var responseString = "";

        //accept incoming data asynchronously
        res.on('data', chunk => {
            responseString = responseString + chunk;
        });

        //return the data when streaming is complete
        res.on('end', () => {
            console.log(responseString);
            callback(responseString);
        });

    });
    req.end();
}

function httpsPut(data,apiPath, callback) {

    var options = {
        port: 443,
        host: 'softwidgetapi-qa.herokuapp.com',
        path: apiPath,
        method:'PUT',
        headers: {
    'Content-Type': 'application/json',
    //'Content-Length': data.length
  }
    };
    
    

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var responseString = "";

        //accept incoming data asynchronously
        res.on('data', chunk => {
            responseString = responseString + chunk;
            console.log(chunk);
        });

        //return the data when streaming is complete
        res.on('end', () => {
            console.log(responseString);
            callback(responseString);
        });

    });
    req.write(JSON.stringify(data));
    req.end();
}

function httpsPost(requestData, apiPath, callback) {
    var options = {
        port: 443,
        host: 'softwidgetapi-qa.herokuapp.com',
        path: apiPath,
        //json: requestData,
        method: 'POST',
        headers: {
    'Content-Type': 'application/json',
    //'Content-Length': data.length
  }
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var responseString = "";

        //accept incoming data asynchronously
        res.on('data', chunk => {
            responseString = responseString + chunk;
        });

        //return the data when streaming is complete
        res.on('end', () => {
            console.log(responseString);
            callback(responseString);
        });

    });
    req.write(JSON.stringify(requestData))
    req.end();
}

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};