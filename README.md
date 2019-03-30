# Soft Widget Market
Repository for Soft Widget Market Alexa Skill.

## Interaction Model
Alexa skill has an interaction model defining the words and phrases users can say to make the skill do what they want.

## Lambda Function
Intents use to call Lambda Functions to process the requests based on the given inputs.
Lambda Function is a compute service provided by AWS and, runs only when required.

## Launching Alexa Skills Console
Here is the [link](https://developer.amazon.com/alexa/console/ask/test/amzn1.ask.skill.79868a91-9176-4bbe-a2a6-2365f0ada6cd/development/en_US/) to launch Alexa Skill's Developer Console.

## Voice Commands
## Skill Wake Phrase
- Invocation: open soft widget market

## Intents
Intents are the handlers that are invoked against the utterances.

##	Intent [AboutCompany]
  -	what is the company about
  -	Tell me about the company

##	Intent [GetProduct]
  -	product
  -	about product
  -	what is the product about
  -	what is the product
  -	tell me more about the product

##	Intent [PlaceOrder]
  -	place order

##	Intent [ModifyOrder]
  -	change my order
  -	modify order {order_number}
  -	update order {order_number}
  
##	Intent [CancelOrder]
  -	cancel my order
  -	cancel order {order_number}

##	Intent [InfoOrder]
  -	show orders
  -	show me all orders
  -	fetch all orders
  -	fetch orders
  -	get orders
  -	get all orders

##	Intent [GetOrder]
  -	order number {order_number}
  -	what's the status of order with order number {order_number}
  -	tell me about order number {order_number}
  -	get order with order number {order_number}