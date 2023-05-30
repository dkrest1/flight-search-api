import Amadeus from "amadeus"

//configuration
let amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_SECRET_KEY
});

const result = await amadeus.airport.directDestinations.get({
    departureAirportCode: 'LGA',
})

console.log(result)
