const ClientsFileUtilities = (clientsDirectoryPath, fs, path, logger) => {
    const LINE_DELIMITER = "\n";
    const FIELD_DELIMITER = ",";

    const getClientsFileArray = () => {
        return (callback, value) => {
            if (value === undefined) {
                value = {};
            }

            fs.readdir(clientsDirectoryPath, (err, files) => {
                if (err) {
                    return callback(undefined, 'Unable to find or open the directory: ' + err);
                }

                const fileNameArray = files.map((filename) => {
                    return filename;
                });

                value.fileNameArray = fileNameArray;

                return callback(value, undefined);
            });
        }
    };

    const parseData = (info) => {
        const clientArray = [];

        const lineArray = info.split(LINE_DELIMITER);

        lineArray.forEach(line => {
            const fieldArray = line.split(FIELD_DELIMITER);

            const client = {};

            client.email = fieldArray[0];
            client.honorific = fieldArray[1];
            client.firstname = fieldArray[2];
            client.lastname = fieldArray[3];
            const phone = fieldArray[4];
            const phoneArray = phone.split("-");
            client.areacode = phoneArray[0];
            client.prefix = phoneArray[1];
            client.linenumber = phoneArray[2];
            client.city = fieldArray[5];
            client.state = fieldArray[6];
            client.zip = fieldArray[7];
            client.language = fieldArray[8];
            const birthdate = fieldArray[9];
            const birthdateArray = birthdate.split("/");
            client.birthmonth = birthdateArray[0];
            client.birthday = birthdateArray[1];
            client.birthyear = birthdateArray[2];

            clientArray.push(client);
        });

        return clientArray;
    };

    const importClients = (clientsFileName) => {
        const clientsFilePath = join(clientsDirectoryPath, clientsFileName);

        if (value === undefined) {
            value = {};
        }

        const readerStream = fs.createReadStream(clientsFilePath);

        let info = "";

        readerStream.on("data", (data) => {
            let chunk = data.toString();
            info += chunk;
        });

        readerStream.on("end", () => {
            value.clientArray = parseData(info);

            logger.debug(`Successfully read clients file: ${filePath}`);

            return callback(value);
        });

        readerStream.on("error", (err) => {
            return callback(undefined, err);
        });
    };

    const exportClients = (clientsFileName) => {
        const clientsFilePath = join(clientsDirectoryPath, clientsFileName);

        if (value === undefined) {
            value = {};
        }

        const writeStream = fs.createWriteStream(clientsFilePath);

        return (callback, value) => {
            if (value === undefined) {
                value = {};
            }

            const clientArray = value.clientArray;

            clientArray.forEach(client => {
                ;
            });
        };
    };

    return Object.freeze({
        getClientsFileArray,
        importClients,
        exportClients
    });
};

module.exports = ClientsFileUtilities;
