const DateUtility = () => {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const getMonth = monthValue => {
    let month;

    switch (monthValue) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
    }

    return month;
  };

  const now = new Date();

  let currentMonth = getMonth(now.getMonth() + 1);
  let currentDay = now.getDate();
  let currentYear = now.getFullYear();

  const getCurrentMonth = () => {
    return currentMonth;
  };

  const getCurrentDay = () => {
    return currentDay;
  };

  const getCurrentYear = () => {
    return currentYear;
  };

  const getCurrentDate = () => {
    return `${currentMonth}/${currentDay}/${currentYear}`;
  };

  const getIsLeapYear = year => {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  };

  const getMaxDayInMonth = (month, year) => {
    let maxDay = 31;

    let isLeapYear = false;

    if (year) {
      isLeapYear = getIsLeapYear(year);
    }

    switch (month) {
      case "January":
        maxDay = 31;
        break;
      case "February":
        if (isLeapYear) {
          maxDay = 29;
        } else {
          maxDay = 28;
        }

        break;
      case "March":
        maxDay = 31;
        break;
      case "April":
        maxDay = 30;
        break;
      case "May":
        maxDay = 31;
        break;
      case "June":
        maxDay = 30;
        break;
      case "July":
        maxDay = 31;
        break;
      case "August":
        maxDay = 31;
        break;
      case "September":
        maxDay = 30;
        break;
      case "October":
        maxDay = 31;
        break;
      case "November":
        maxDay = 30;
        break;
      case "December":
        maxDay = 31;
        break;
      default:
        break;
    }

    return maxDay;
  };

  const getMonthArray = () => {
    return monthArray;
  };

  const getDayArray = (month, year) => {
    const dayArray = [];

    const maxDay = getMaxDayInMonth(month, year);

    for (let day = 1; day <= maxDay; day++) {
      dayArray.push(day);
    }

    return dayArray;
  };

  const getYearArray = () => {
    const yearArray = [];

    for (let year = currentYear; year >= currentYear - 80; year--) {
      yearArray.push(year);
    }

    return yearArray;
  };

  return Object.freeze({
    getCurrentMonth,
    getCurrentDay,
    getCurrentYear,
    getCurrentDate,
    getMaxDayInMonth,
    getMonthArray,
    getDayArray,
    getYearArray
  });
};

export default DateUtility;
