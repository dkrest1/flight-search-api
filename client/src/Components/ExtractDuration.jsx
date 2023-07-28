import React from 'react'
import useFlightStore from './zustand store/ZStore';

const ExtractDuration = (flightData) => {
    // const {flightData} = useFlightStore()
    const times = flightData.map((value)=>{
        return value.duration
      })
      console.log(times)
    const getTimeInMinutes = (timeString) => {
        let totalMinutes = 0
        const [hours, hr, minutes , min] = timeString.split(' ')
        // console.log(hours, minutes)
        if(hours && hours !==0){
            totalMinutes = parseInt(hours)*60
            // console.log(totalMinutes)
        }
        if(minutes && minutes!==0){
            // console.log(totalMinutes)
            totalMinutes +=parseInt(minutes)
            // console.log()
        }
        return totalMinutes
      };
      const convertTimes = times.map((eachTime)=>getTimeInMinutes(eachTime))
      console.log(convertTimes)

    // // //   const getMaximumTime = (times) => {
    // // //     let maxTimeInMinutes = -Infinity;
    // // //     let maxTime = '';
      
    // // //     times.forEach((time) => {
    // // //       const timeInMinutes = getTimeInMinutes(time);
    // // //       if (timeInMinutes > maxTimeInMinutes) {
    // // //         maxTimeInMinutes = timeInMinutes;
    // // //         maxTime = time;
    // // //       }
    // // //     });
      
    // // //     return maxTime;
    // // //   };
    // //   const maxTime = getMaximumTime(times)
    // //   console.log('This is ', maxTime)

    return convertTimes
}

export default ExtractDuration
