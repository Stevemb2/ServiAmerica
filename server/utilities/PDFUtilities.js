const PDFUtilities = (pdfkit, fs, path, logger) => {
    const getPDFArray = pdfDirectoryPath => {
        return (callback, value) => {
            if (value === undefined) {
                value = {};
            }

            const pdfArray = [];

            fs.readdir(pdfDirectoryPath, (err, pdfs) => {
                if (err) {
                    return callback(undefined, err);
                } else {
                    pdfs
                        .filter(pdf => {
                            return pdf.startsWith("mailing-labels-Times-Roman-12-2.pdf") ? false : true;
                        })
                        .filter(pdf => {
                            return pdf.startsWith("blank.pdf") ? false : true;
                        })
                        .filter(pdf => {
                            return pdf.startsWith(".") ? false : true;
                        })
                        .forEach(pdf => {
                            pdfArray.push(pdf);
                        });

                    value.pdfArray = pdfArray;

                    return callback(value, undefined);
                }
            });
        };
    };

    const findPDF = (pdfParams) => {
        const {
            pdfDirectoryPath,
            font,
            size,
            spacing
        } = pdfParams;

        return (callback, value) => {
            if (value === undefined) {
                value = {};
            }

            const fileName = `mailinglabels-${font}-${size}-${spacing}.pdf`;
            const filePath = `${pdfDirectoryPath}/${fileName}`;

            if (fs.existsSync(filePath)) {
                return callback(value, undefined);
            } else {
                const message = `PDF file does not exist for font: ${font}, size: ${size}, and spacing: ${spacing}`;
                return callback(undefined, message);
            }
        };
    };

    const createPDF = (pdfParams) => {
        const {
            pdfDirectoryPath,
            font,
            size,
            spacing
        } = pdfParams;

        return (callback, value) => {
            if (value === undefined) {
                value = {};
            }

            try {
                const clientArray = value.clientArray;

                logger.debug(`Client array length: ${clientArray.length}`);

                const PDFDocument = pdfkit;

                // Create a document
                const doc = new PDFDocument;

                const filePath = `${pdfDirectoryPath}/mailinglabels-${font}-${size}-${spacing}.pdf`

                // Pipe its output  to a file
                doc.pipe(fs.createWriteStream(filePath));

                doc.font(font).fontSize(size);

                clientArray.map(client => {
                    if (client.status.trim() !== "inactive" && client.status.trim() !== "suspended") {
                        doc.text(`${client.honorific} ${client.firstname} ${client.lastname} `, { align: "left" }).moveDown(0.5);
                        doc.text(`${client.address} `, { align: "left" }).moveDown(0.5);
                        doc.text(`${client.city}, ${client.state} ${client.zip}`, { align: "left" }).moveDown(spacing);
                    }
                });

                // Finalize PDF file
                doc.end();

                const message = `Successfully created pdf file with font: ${font}, size: ${size}, and spacing: ${spacing}`;

                value.message = message;

                return callback(value, undefined);
            } catch (error) {
                const message = `Failed to create pdf file with font: ${font}, size: ${size}, and spacing: ${spacing}: ${error}`;

                return callback(undefined, message);
            }
        };
    };

    const removePDF = (pdfDirectoryPath, pdf) => {
        return (callback, value) => {
            if (value === undefined) {
                value = {};
            }

            const pdfPath = `${pdfDirectoryPath}/${pdf}`;

            fs.unlink(pdfPath, err => {
                if (err) {
                    const message = `Failed to delete pdf file: ${pdf}, error: ${err}`;
                    logger.warn(message);

                    return callback(undefined, message);
                } else {
                    return callback(value, undefined);
                }
            });
        };
    };

    return Object.freeze({
        getPDFArray,
        findPDF,
        createPDF,
        removePDF
    });
};

module.exports = PDFUtilities;


