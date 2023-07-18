import rateLimit from "express-rate-limit";

const WindowSizeInHour = 0.5; // half an hour
const maxWindowRequestCount = 15;

export const flightRateLimiter = rateLimit({
    windowMs: WindowSizeInHour * 60 * 60 * 1000, // 1hr
    max: maxWindowRequestCount, // Limit each IP to 100 requests per `window` (here, per 1hr)
    message: async (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many request, please try again later."
        })
    },

    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

