const FormatterUtilities = (logger) => {
    const formatBody = (body, client) => {
        body = body.replace(/\{email\}/, client.email);
        body = body.replace(/\{honorific\}/, client.honorific);
        body = body.replace(/\{firstname\}/, client.firstName);
        body = body.replace(/\{lastname\}/, client.lastName);
        body = body.replace(/\{phone\}/, client.phone);
        body = body.replace(/\{address\}/, client.address);
        body = body.replace(/\{city\}/, client.city);
        body = body.replace(/\{state\}/, client.state);
        body = body.replace(/\{zip\}/, client.zip);
        body = body.replace(/\{language\}/, client.language);
        body = body.replace(/\{birthday\}/, client.birthday);
        body = body.replace(/\{status\}/, client.status);

        logger.debug(`Formatted body of email for client email: ${client.email}`);

        return body;
    };

    return Object.freeze({
        formatBody
    })
}

export default FormatterUtilities;
