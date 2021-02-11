const DateUtilities = logger => {
   const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

   const format = value => {
      if (value < 10) {
         value = "0" + value;
      }

      return value;
   };

   const monthStringToIntMap = {
      "January": 31,
      "February": 28,
      "March": 31,
      "Aprile": 30,
      "May": 31,
      "June": 30,
      "July": 31,
      "August": 31,
      "September": 30,
      "October": 31,
      "November": 30,
      "December": 31
   };

   const monthToDaysInMonthMap = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
   };

   const getIsLeapYear = year => {
      return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
   };

   const getDaysInMonth = (month, year) => {
      let days = 0;

      const isLeapYear = getIsLeapYear(year);

      if (year === isLeapYear && month === 2) {
         days = 29;
      } else {
         days = monthToDaysInMonthMap[month];
      }

      return days;
   };

   const getYearInMilliseconds = (year) => {
      let yearInMilliseconds = 0;

      for (let month = 1; month <= 12; month++) {
         yearInMilliseconds += getDaysInMonth(month, year) * DAY_IN_MILLISECONDS;
      }

      return yearInMilliseconds;
   };

   const getCurrentYearInMilliseconds = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      return getYearInMilliseconds(currentYear);
   };

   const getMillisecondsUntilBirthdate = (birthdayString, birthmonth) => {
      const birthDay = monthStringToIntMap[birthdayString];

      const now = new Date();

      const year = now.getFullYear();

      const millisecondsUntilBirthdate = 0;

      for (let month = 1; month < birthmonth; month += 1) {
         millisecondsUntilBirthdate += getDaysInMonth(month, year) * DAY_IN_MILLISECONDS;
      }

      millisecondsUntilBirthdate += birthday * DAY_IN_MILLISECONDS;

      return millisecondsUntilBirthdate;
   };

   const getTodaysDateTime = () => {
      const now = new Date();

      const year = format(now.getFullYear());
      const month = format(now.getMonth() + 1);
      const day = format(now.getDate());
      const hours = format(now.getHours());
      const minutes = format(now.getMinutes());
      const seconds = format(now.getSeconds());

      const todaysDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return todaysDate;
   };

   return Object.freeze({
      getYearInMilliseconds,
      getCurrentYearInMilliseconds,
      getMillisecondsUntilBirthdate,
      getTodaysDateTime
   });
};

export default DateUtilities;
