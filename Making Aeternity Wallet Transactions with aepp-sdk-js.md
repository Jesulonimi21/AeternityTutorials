# Tutorials How to make wallet transactions on the Web with aepp-sdk-js

## Tutorial Overview
This tutorial is mend for web developers who want to begin to build interesting applications on the aeternity blockchain.
In this tutorial we will cover the following:
- Wallet Creation
- Checking Wallet Balance
- Token transfer
- Connecting to a Smart Contract Instance

## Prerequisites
- A familiarity with the javascript programming language
- Basic understanding of some blockchain terminologies

## Setup And Configuration
Create a new folder and create an index.html file in it then include the cdn link for the javascript sdk, i will be using version 7.3.1 of the aeternity javascript sdk in this tutorial, also add a link to the Node.js Buffer for web cdn like it is done below

```html
<html>
    <head>
        <script src="https://unpkg.com/@aeternity/aepp-sdk@7.3.1/dist/aepp-sdk.browser-script.js"></script>
        <script src="https://bundle.run/buffer@5.6.0"></script>
    </head>
</html>
```
Lastly, create an index.js file in the same directory and include it in your index.html file just after the links to the buffer.This is the file where we will be doing most of our work in, your index.html file should look like this after
```
full head of the index.html file
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wallet Web Tutorial</title>
        <script src="https://unpkg.com/@aeternity/aepp-sdk@7.3.1/dist/aepp-sdk.browser-script.js"></script>
        <script src="https://bundle.run/buffer@5.6.0"></script>
        <script src="./index.js"></script>
    </head>
    <body>
        
    </body>
</html>
```
