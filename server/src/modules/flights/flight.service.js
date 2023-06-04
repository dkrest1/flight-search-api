import Amadeus from "amadeus"
import winston from "winston";

//logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'flight-search-api' },
    transports: [
        new winston.transports.Console()
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_SECRET_KEY,
    logger
});


//search flight info
export const flightInfoService = async (origin, destination, departureDate, returnDate, numOfPassengers) => {
    const result = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        returnDate,
        adults: numOfPassengers
    })

    const flightInfo = result.data.map((flight) => {
        console.log(flight)
        return {
            airline: flight.validatingAirlineCodes[0],
            flightNumber: flight.itineraries[0].segments[0].number,
            departure: flight.itineraries[0].segments[0].departure,
            arrival: flight.itineraries[0].segments[0].arrival,
            duration: flight.itineraries[0].duration,
            numberOfBookableSeats: flight.numberOfBookableSeats,
            price: flight.price.grandTotal,
            currency: flight.price.currency
        }
    })
    
    return flightInfo;
}

