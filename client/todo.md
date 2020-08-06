## Features to Implement - Post Board
- Nickname feature - people able to change it; add nickname to user in postgres?
    - Add it to the users nickname table i guess? Clear it after they departner and make it default to their given name

- Profile Picture from `this.state.partner` - add profile pic to postgres and then API
    - OR Make a seperate table?
    - Add the profile picture to the users as a new column; the value will be the link to it in an image hosting site database probably

- Online status - NO CLUE WHERE TO START WITH THIS; This might be a lost cause - WebSockets.IO would be the best bet but dont know how it'd work with express/react app

- Pull messages from postgres
    - Need a new postgres database which stores the messages from each user
    - `SELECT * FROM posts WHERE user=user.id AND partner=partner.id` to get the posts, then order via time sent `ORDER BY time`.
    - Then extract the info from each and put into a Message component
    - Must also be able to work out the time since thing - `new Date().toLocaleString()` perhaps
    - New API route for messages
    - [x]

- Write messages and store them in the postgres database AND update the state of the application to include this
    - [x]

- Go to scrollbar when too many messages
    - [x]

## Features to Implement - Calendar
- TODO