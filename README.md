This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## ServiAmerica Email Application

This application allows a user to send out bulk emails to a number of clients.

### Running Application

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

After logging in the application takes you to the Email tab.

On the 'Email' tab select a template from the 'Template' drop down menu and any attachment
from the 'Attachment Files' drop down menu.
Then click the 'Send Emails' button to send emails to all the emails listed for that template.

Use the 'Add', 'Update', 'Delete' buttons to attach clients,
selected from the 'Client' dropdown meny, to the email template.

The 'Templates' tab allows for adding, updating, and deleting email templates.

The 'Users' tab allows for adding, updating, and deleting login users.

The 'Attachments' tab allows for uploading attachment files to the server
which can later be attached to emails sent.

### Configuration

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

This program requires the following MySQL database tables: user, clients, templates, client_template

The following environment variables must be set:

export MYSQL_HOST="host name"

export MYSQL_USERNAME="mysql user name"

export MYSQL_PASSWORD="mysql password"

export MYSQL_DATABASE="mysql database"

export EMAIL_USER="email program user"

export EMAIL_PASSWORD="email program password"

export EMAIL_SOURCE="use email for sending emails"

Must configure the email service provider permissions to use email.

Email attachments are kept in and 'attachments' directory under the main application directory.

Log files are kept in a 'logs' directory under the main application directory.

# Starting MongoDB

brew services start mongodb-community
