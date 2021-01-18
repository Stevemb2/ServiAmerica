const ValidationUtility = () => {
  const validateTaxTable = taxRateFile => {
    if (
      !taxRateFile.match(
        /((federal_tax_rates\.csv)|(california_tax_rates\.csv))/
      )
    ) {
      return `Tax rate file:  ${taxRateFile} is not valid.  Must be either federal_tax_rates.csv or california_tax_rates.csv`;
    } else {
      return;
    }
  };

  const validateMortgage = mortgage => {
    const principle = mortgage.amount - mortgage.downpayment;

    if (isNaN(principle) || principle < 0) {
      return `Principle amount: ${mortgage.principle} is not valid.  Principle amount must be a positive number.`;
    }

    if (isNaN(principle) || mortgage.rate < 0) {
      return `Interest rate amount: ${mortgage.rate} is not valid.  Interest rate amount must be a positive number.`;
    }

    if (isNaN(principle) || mortgage.downpayment < 0) {
      return `Downpayment amount: ${mortgage.downpayment} is not valid.  Downpayment amount must be a positive number.`;
    }
  };

  const validateClient = (client, isPersonal, isDelete) => {
    if (!client.email.match(/\w+@\w+\.(com|net|org|gov)/)) {
      return `Email:  ${client.email} is not valid.  Email must have format xxx@xxx.com or xxx@xxx.net or xxx@xxx.org or xxx@xxx.gov.`;
    }

    if (client.firstname.length < 3) {
      return `First name: ${client.firstname} is not valid.  First name must be at least 3 characters in length.`;
    }

    if (client.lastname.length < 3) {
      return `Last name: ${client.lastname} is not valid.  Last name must be at least 3 characters in length.`;
    }

    if (
      !Number.isInteger(client.areacode) ||
      client.areacode > 999 ||
      client.areacode < 0
    ) {
      return `Phone area Code: ${client.areacode} is not valid. Phone area code must be format xxx.`;
    }

    if (
      !Number.isInteger(client.prefix) ||
      client.prefix > 999 ||
      client.prefix < 0
    ) {
      return `Phone prefix: ${client.prefix} is not valid. Phone prefix must be format xxx.`;
    }

    if (
      !Number.isInteger(client.linenumber) ||
      client.linenumber > 9999 ||
      client.linenumber < 0
    ) {
      return `Phone line number: ${client.linenumber} is not valid. Phone line number must be format xxxx.`;
    }

    if (!isPersonal && !isDelete) {
      if (client.address.length < 3) {
        return `Address: ${client.address} is not valid.  Address must be at least 3 characters in length.`;
      }

      if (client.city.length < 3) {
        return `City: ${client.city} is not valid.  City must be at least 3 characters in length.`;
      }
    }

    if (
      !Number.isInteger(client.zip) ||
      client.zip < 10000 ||
      client.zip > 99999
    ) {
      return `Zip: ${client.zip} is not valid.  Zip code must be 5 digits.`;
    }

    return;
  };

  const validateTemplate = template => {
    if (template.name.length < 3) {
      return `Name: ${template.name} is not valid.  Name must be at least 3 characters in length.`;
    }

    if (template.subject.length < 3) {
      return `Subject: ${template.name} is not valid.  Subject must be at least 3 characters in length.`;
    }

    if (template.body.length < 3) {
      return `Body: ${template.name} is not valid.  Body must be at least 3 characters in length.`;
    }

    return;
  };

  const validateUser = user => {
    if (!user.email.match(/\w+@\w+\.(com|net|org)/)) {
      return `Email:  ${user.email} is not valid.`;
    }

    if (user.password.length < 8) {
      return `Password: ${user.password} is not valid. Password must be at least 8 characters in length.`;
    }

    if (user.name.length < 3) {
      return `Name: ${user.name} is not valid.  Name must be be at least 3 characters in length.`;
    }

    return;
  };

  const getCookie = name => {
    let cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i += 1) {
      let cookiePair = cookieArray[i].split("=");

      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return;
  };

  return Object.freeze({
    validateTaxTable,
    validateMortgage,
    validateClient,
    validateTemplate,
    validateUser,
    getCookie
  });
};

export default ValidationUtility;
