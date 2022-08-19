const getTime = () => {
  /** milliseconds since epoch */
  const utcMilliSeconds = Date.now();
  /** date obj set to epoch */
  const time = new Date(0);
  time.setUTCSeconds(utcMilliSeconds / 1000);
  return time;
};

// const time = "2022-08-17T19:22:27.000Z";
const getTimeString = (time) => {
  const timeObj = new Date(time);

  // return timeObj.toTimeString();
  /** 20:20:41 GMT+0530 (India Standard Time) */

  // return timeObj.toUTCString();
  /** Sat, 23 Jul 2022 14:50:10 GMT */

  return timeObj.toLocaleTimeString().toUpperCase();
  /** 8:19:39 PM */
};

const getDateString = (time) => {
  const timeObj = new Date(time);
  
  // return timeObj.toLocaleDateString();
  /** 18/8/2022 */

  return timeObj.toDateString();
  /** Thu Aug 18 2022 */
};

module.exports = { getTime, getTimeString, getDateString };
