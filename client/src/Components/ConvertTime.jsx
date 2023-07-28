import React from 'react'

const ConvertTime = (totalMinutes) => {
    const timeStringToMinutes = (totalMinutes) => {
        // const [hours, hr, minutes, min] = timeString.split(' ');
        let hours = Math.floor(totalMinutes / 60)
        let minutes =totalMinutes % 60
        const timeConverted =`${hours} hours ${minutes} minutes`
        console.log(timeConverted)
        return timeConverted
        }
      const time = timeStringToMinutes(totalMinutes)
        return time
}

export default ConvertTime