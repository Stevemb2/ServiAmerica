const TaxTableService = (fs, logger) => {
  const getTaxTableArray = taxTableDirectoryPath => {
    return (callback, value) => {
      const taxTableArray = [];

      fs.readdir(taxTableDirectoryPath, function(err, taxTables) {
        if (err) {
          return callback(undefined, err);
        } else {
          taxTables
            .filter(taxTable => {
              return taxTable.startsWith(".") ? false : true;
            })
            .forEach(taxTable => {
              taxTableArray.push(taxTable);
            });

          return callback(taxTableArray);
        }
      });
    };
  };

  const readTaxTable = (taxTableName, taxTablePath) => {
    return (callback, value) => {
      if (fs.existsSync(taxTablePath) === true) {
        fs.readFile(taxTablePath, (err, data) => {
          if (err) {
            const message = `Failed to read tax table file: ${taxTableName} from filesystem, error: ${err}`;
            logger.warn(message);
            return callback({}, message);
          } else {
            const message = `Successfully read tax table file: ${taxTableName} from filesystem`;
            logger.debug(message);

            data = data.toString();

            const taxTableDataArray = [];

            // Convert to array of arrays
            const dataArray = data.split(/\n/);

            dataArray.forEach(line => {
              const lineArray = line.split(",");

              taxTableDataArray.push({
                status: lineArray[0],
                rate: lineArray[1],
                income: lineArray[2]
              });
            });

            return callback(taxTableDataArray, undefined);
          }
        });
      } else {
        const message = `Failed to read tax table file: ${taxTablePath} from filesystem, error: ${err}`;
        logger.warn(message);
        return callback({}, message);
      }
    };
  };

  const removeTaxTable = (taxTableName, taxTablePath) => {
    return (callback, value) => {
      fs.unlink(taxTablePath, err => {
        if (err) {
          const message = `Failed to delete tax table file: ${taxTableName} from filesystem, error: ${err}`;

          return callback(undefined, message);
        } else {
          return callback("", undefined);
        }
      });
    };
  };

  return Object.freeze({
    getTaxTableArray,
    readTaxTable,
    removeTaxTable
  });
};

export default TaxTableService;
