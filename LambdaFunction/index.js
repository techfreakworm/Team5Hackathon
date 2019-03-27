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

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'A year on Mercury is just 88 days long.',
    'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
    'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
    'On Mars, the Sun appears about half the size as it does on Earth.',
    'Earth is the only planet not named after a god.',
    'Jupiter has the shortest day of all the planets.',
    'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
    'The Sun contains 99.86% of the mass in the Solar System.',
    'The Sun is an almost perfect sphere.',
    'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
    'Saturn radiates two and a half times more energy into space than it receives from the sun.',
    'The temperature inside the Sun can reach 15 million degrees Celsius.',
    'The Moon is moving approximately 3.8 cm away from our planet every year.',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function() {
        this.emit('AboutCompany');
    },
    'AboutCompany': function() {
        const about = "This is about company. ?What are the products offered?";

        this.response.cardRenderer(SKILL_NAME, about);
        this.response.speak(about).listen("more");
        this.emit(':responseReady');
    },
    'GetAllProducts': function() {
        const about = "These are the products:Product1, Product2. You can book any product by saying 'order followed by product name'.";

        this.response.cardRenderer(SKILL_NAME, about);
        this.response.speak(about).listen("more");
        this.emit(':responseReady');
    },
    'GetProduct': function() {
        const product = this.event.request.intent.slots.product_name.value;
        // const about = "These are the products:Product1, Product2. You can book any product by saying 'order followed by product name'.";
        const output = "We'll describe the product:" + product;
        this.response.cardRenderer(SKILL_NAME, output);
        this.response.speak(output).listen("more");
        this.emit(':responseReady');
    },
    'PlaceOrder': function() {
        // const username=httpGet()
        const name = this.event.request.intent.slots.name.value;
        const product_name = this.event.request.intent.slots.product_name.value;
        const product_quantity = this.event.request.intent.slots.product_quantity.value;
        const phone = this.event.request.intent.slots.phone.value;
        const house_no = this.event.request.intent.slots.house_no.value;
        const street_name = this.event.request.intent.slots.street_name.value;
        const email = this.event.request.intent.slots.email.value;

        const output = "Order is placed:" + product_quantity + product_name + ", receipt sent to " + email;
        this.response.cardRenderer(SKILL_NAME, output);
        this.response.speak(output).listen("more");
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function() {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function() {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function() {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

function httpGet(optionsHost, optionsPath) {
    return new Promise(((resolve, reject) => {
        var options = {
            host: optionsHost,
            port: 443,
            path: optionsPath,
            method: 'GET',
        };

        const request = https.request(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';

            response.on('data', (chunk) => {
                returnData += chunk;
            });

            response.on('end', () => {
                resolve(JSON.parse(returnData));
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
        request.end();
    }));
}

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};