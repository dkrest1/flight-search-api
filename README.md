# FLIGHT SEARCH API

## Description

A flight search API integrated with a third party API [Amadeus] to retrieve flight information and display search results.

## Technologies Used

- Frontend: React, TailwindCSS
- Backend: NodeJS, Express
- Third Party API: Amadeus API
- Mongoose With MongoDB
- Environment-based Configuration

## Design

You can view the design and wireframes of the project on Figma:

- [Click here to view](https://www.figma.com/file/FSC6oEZ85iWekoCO5weufS/Flight-Website?node-id=0%3A1&mode=dev "Flight Search")

## Prequesites

- Node.js(16.x)
- React (18.x)

# Getting Started

1. Clone the Repository:

```bash
$ git clone https://github.com/dkrest1/flight-search-api.git
```

### Frontend

```bash
$ cd client
$ npm run dev
```

### Backend

create a .env file and put in the right credentials

```bash
$ cd server
$ cp .env.sample .env
$ npm run dev
```

### API documentation

http://localhost:3000/api-docs/
