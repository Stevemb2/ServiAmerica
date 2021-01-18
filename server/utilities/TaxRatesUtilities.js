const TaxRatesUtilities = (fs, path, logger) => {
   let federalTaxRates = {};
   let stateTaxRates = {};

   const parseData = data => {
      const taxRates = {};

      if (data) {
         data = data.toString();

         let lineArray = data.split("\n");

         lineArray.forEach(line => {
            if (line) {
               let [filingType, percent, amount] = line.split(",");

               if (taxRates[filingType] === undefined) {
                  taxRates[filingType] = [];
               }

               taxRates[filingType].push({
                  percent,
                  amount
               });
            }
         });
      }

      return taxRates;
   };

   const createFileRequestor = (filePath, type) => {
      return (callback, value) => {
         const readerStream = fs.createReadStream(filePath);

         let info = "";

         readerStream.on("data", (data) => {
            let chunk = data.toString();
            info += chunk;
         });

         readerStream.on("end", () => {
            if (type === "Federal") {
               federalTaxRates = parseData(info);

               logger.debug(
                  `Successfully read federal tax rates file: ${filePath}`
               );
            } else {
               stateTaxRates = parseData(info);

               logger.debug(
                  `Successfully read state tax rates file: ${filePath}`
               );
            }

            return callback(value);
         });

         readerStream.on("error", (err) => {
            return callback(undefined, err);
         });
      };
   };

   const createFileRequestor2 = (filePath, type) => {
      return (callback, value) => {
         return fs.readFile(filePath, "utf-8", (err, data) => {
            if (!value) {
               value = "";
            }

            if (type === "Federal") {
               federalTaxRates = parseData(data);

               logger.debug(
                  `Successfully read federal tax rates file: ${filePath}`
               );
            } else {
               stateTaxRates = parseData(data);

               logger.debug(
                  `Successfully read state tax rates file: ${filePath}`
               );
            }

            return err ? callback(undefined, err) : callback(value);
         });
      };
   };

   const calculateTaxRate = (income, filingType, isFederal) => {
      if (isFederal === false) {
         if (filingType !== "single") {
            filingType = "married-jointly";
         }
      }

      let taxRatesArray = isFederal ? federalTaxRates[filingType] : stateTaxRates[filingType];

      if (taxRatesArray === undefined) {
         throw "Failed to read federal tax rates from file!";
      }

      taxRatesArray.sort((a, b) => {
         return +a.amount - +b.amount;
      });

      let percent = 0;

      taxRatesArray.every(taxRates => {
         if (income < taxRates.amount) {
            percent = taxRates.percent;
            return false;
         } else {
            return true;
         }
      });

      return percent;
   };

   return Object.freeze({
      createFileRequestor,
      calculateTaxRate
   });
};

module.exports = TaxRatesUtilities;
