import Amadeus from "amadeus"
import { logger } from "../../config/logger.config.js"

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
        return {
            id: flight.id,
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

//book flight service
export const bookFlightService = async () => {
    amadeus.booking.flightOrders.post(
        JSON.stringify({
            'type': 'flight-order',
            'flightOffers': [priced - offers],
            'travelers': []
        })
    )

}
