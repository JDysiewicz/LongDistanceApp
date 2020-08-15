# LongDistanceApp
A webapp for those in long distance relationships. Currently functinos as a chat app similar to whatsapp/messanger where accounts can be linked. In the future this will also support more features useful to a long distance relationship, such as a sync-ed calendar etc...

## Usage
Backend server: run "npm start" in the root of the project.
Client CRA server: run "npm start" in the client directory of the project.
Opens on localhost5000, or alternatively access via heroku : https://limitless-sands-03990.herokuapp.com/
Must add an account via partner code system to beign chatting, the other must accept this request.
To change nicknames, type the commands "!myNick=\<nickname\>" or "!partnerNick=\<nickanme\>" without the "<>" characters, and send the message.

## Known bugs
- Must refresh the page to see the request from another account
- After accepting a request will be automatically sent to "/home", however will display an error. Refreshing the page fixes this, and this only occurs on the inital acceting of the request.
- Nicknames do not update until relogging.
