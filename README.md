# Assignment 2 COMP3074 - Currency Conversion Tool

Vincent Luu
StudentID: 101239401
COMP3074

This is assignment 2 for COMP3074 - Mobile Application Development where I created
a currency conversion tool, which is built with Expo and React Native and uses a
simple stack navigation setup with a main screen and about screen.

You can enter a base currency (Ex.  CAD or USD), followed by a destination
currency, and then the amount you want to convert. The app checks the input,
sends a request to the API, and then shows the converted amount together
with the live exchange rate used. Using the API offered by https://freecurrencyapi.com/.

## Features

- Converting a base currency to a destination currency
- Input validation for 3-letter ISO currency codes + positive amounts
- Live exchange rates fetched from https://freecurrencyapi.com/
- Loading indicator while fetching for exchange rates
- About screen displaying full name, student ID, and app description

### Error Handling

This app shows error messages for invalid inputs, too many requests, invalid API key responses, 
and unsupported destination currencies returned from the API.

## How to run

1. npm install
2. npx expo start
3. Press "a" to open the Android emulator, or scan the QR code in Expo Go on your phone.