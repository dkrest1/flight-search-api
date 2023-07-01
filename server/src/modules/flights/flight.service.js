import Amadeus from "amadeus"
import { logger } from "../../config/logger.config.js"
import { formatDuration } from "../utils/helper.utils.js";
import { redisClient } from "../../config/redis.config.js";

// amadeus config
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_SECRET_KEY,
    logger
});

//flight offer
const flightOffers = async (origin, destination, departureDate, adults) => {
    //implementing catching
    const flights = await redisClient.hGet('flight', `${origin}-${destination}-${departureDate}-${adults}`)
    if (flights) {
        return JSON.parse(flights)
    } else {
        const newFlights = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            adults,
            max: '10' // this is hardcoded, you can always make it dynamic, default = 10
        })
        await redisClient.hSet('flight', `${origin}-${destination}-${departureDate}-${adults}`, JSON.stringify(newFlights))
        return newFlights
    }

}



//search flight offers
export const flightSearcService = async (origin, destination, departureDate, adults) => {
    const flights = await flightOffers(origin, destination, departureDate, adults);
    return flights.data.map((flight) => {
        return {
            id: flight.id,
            airline: flight.validatingAirlineCodes[0],
            flightNumber: flight.itineraries[0].segments[0].number,
            departure: flight.itineraries[0].segments[0].departure,
            arrival: flight.itineraries[0].segments[0].arrival,
            duration: formatDuration(flight.itineraries[0].duration),
            numberOfBookableSeats: flight.numberOfBookableSeats,
            price: flight.price.grandTotal,
            currency: flight.price.currency
        }
    })
}

export const flightComfirmationService = async (origin, destination, departureDate, adults, id) => {
    const flights = await flightOffers(origin, destination, departureDate, adults)

    const flightPriceComfirmation = await redisClient.hGet('price', `${origin}-${destination}-${departureDate}-${adults}`)
    if (flightPriceComfirmation) {
        return JSON.parse(flightPriceComfirmation)
    } else {
        const newFlightPriceComfirmation = await amadeus.shopping.flightOffers.pricing.post(
            JSON.stringify({
                "data": {
                    "type": "flight-offers-pricing",
                    "flightOffers": [
                        flights.data[id]
                    ]
                }
            })
        )
        await redisClient.hSet('price', `${origin}-${destination}-${departureDate}-${adults}`, JSON.stringify(newFlightPriceComfirmation.data))
        return newFlightPriceComfirmation.data
    }
}

export const flightBookingService = async (origin, destination, departureDate, adults, id, contactDetails) => {
    const pricing = await flightComfirmationService(origin, destination, departureDate, adults, id)

    // implementing redis for caching
    const booking = await redisClient.hGet('booking', `${origin}-${destination}-${departureDate}-${adults}`)
    if (booking) {
        return JSON.parse(booking)
    } else {
        const flightBooking = await amadeus.booking.flightOrders.post(
            JSON.stringify({
                'data': {
                    'type': 'flight-order',
                    'flightOffers': [pricing.flightOffers[0]],
                    'travelers': [
                        ...contactDetails
                    ]
                }
            })

        );

        await redisClient.hSet('booking', `${origin}-${destination}-${departureDate}-${adults}`, JSON.stringify(flightBooking.data))
        return flightBooking.data
    }
}


