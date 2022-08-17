const getTime = () => {
  /** milliseconds since epoch */
  const utcMilliSeconds = Date.now();
  /** date obj set to epoch */
  const time = new Date(0);
  time.setUTCSeconds(utcMilliSeconds / 1000);
  return time;
};

const getTimeString = (time) => {
  const timeObj = new Date(time);

  // return timeObj.toTimeString();
  /** 20:20:41 GMT+0530 (India Standard Time) */

  // return timeObj.toUTCString();
  /** Sat, 23 Jul 2022 14:50:10 GMT */

  return timeObj.toLocaleTimeString();
  /** 8:19:39 pm */
};

module.exports = { getTime, getTimeString };
