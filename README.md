# Longbox

:warning: **This code is a work in progress. It should be considered unstable, untested, and unsupported.** :warning:

## Overview

This is a simple comic book collection tracking app that allows a user to organize their collection and avoid purchasing duplicates. Future idaes and enhancements include:
  
   * View common writers and artists in their collection.
   * Graph purchases and spending over time.
   * Track a pull list of upcoming releases. 

## Prerequisites

   * Node 4.2+
   * MongoDB server
   
## Setting up the app

   * Run `npm install` at the root folder to download dependencies.
   * Make sure Mongo server is running. You can start it by sudo mongod which starts at localhost:27017 with default configurations. The app creates a database called `longbox` by default.
   * Run `npm start` to start the application.
   * Navigate to http://localhost:3000/ in your favourite browser.

