import express from "express"

const app = express()

app.listen(3000, () => {
    console.log("app is live on port 3000")
})