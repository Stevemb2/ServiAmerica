const AttachmentService = (fs, logger) => {
  const getAttachmentArray = attachmentDirectoryPath => {
    return (callback, value) => {
      const attachmentArray = [];

      fs.readdir(attachmentDirectoryPath, (err, attachments) => {
        if (err) {
          return callback(undefined, err);
        } else {
          if (value === undefined) {
            value = {};
          }

          attachments
            .filter(attachment => {
              return attachment.startsWith(".") ? false : true;
            })
            .forEach(attachment => {
              attachmentArray.push(attachment);
            });

          value.attachmentArray = attachmentArray;

          return callback(value);
        }
      });
    };
  };

  const removeAttachment = attachmentPath => {
    return (callback, value) => {
      fs.unlink(attachmentPath, err => {
        if (err) {
          const message = `Failed to delete attachment: ${attachmentPath} from filesystem, error: ${err}`;
          logger.warn(message);
          return callback(undefined, message);
        } else {
          if (value === undefined) {
            value = {};
          }

          const message = `Successfully deleted attachment: ${attachmentPath} from filesystem`;
          logger.debug(message);

          return callback(value, undefined);
        }
      });
    };
  };

  return Object.freeze({
    getAttachmentArray,
    removeAttachment
  });
};

export default AttachmentService;
