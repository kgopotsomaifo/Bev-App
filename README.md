# Bev-App

## Description
This Bev Web App is designed to streamline the process of tracking South African Breweries aligned outlets/clubs/bars, enabling users to submit, track, and update outlets.
- This app was built with a React Frontend and MongoDB server backend

## Installation
- Download the repository
- Open the folder as a project in your IDE
- Open a new terminal in the folder window
- Type `npm install` in terminal
- To Start - Type `npm start` 

## How To Use
- Once loaded, you will see input fields, fill them accordingly and hit the submit button
- Ensure you have some sort of database connectivity application (eg.MongoDB) to allow the data you input to be stored

## Features
- Submit Outlets: Users can submit outlets with detailed descriptions(outlet Name and brand affilation) and location. Each outlet is categorized into one of the two statuses: in progress, or completed.
- Outlet List: Displays all outlets ordered by their status and the date they were submitted.
- Outlet Update: Provides the ability to update information for individual outlets.
- Batch Outlet Status Update: Allows bulk status updates for multiple outlets at once.
- Outlet Archival: Enables archiving specific outlets, removing them from the list while retaining their records.
- Status-based Filtering: Filters and displays outlets based on their status, showing only outlets of a specified status at a time.
