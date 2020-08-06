- Implement dummy entry for writeText where text gets sent no where but is logged

## Features to Implement - Post Board
- Nickname feature - people able to change it; add nickname to user in postgres?

- Profile Picture from `this.state.partner` - add profile pic to postgres and then API
    - OR Make a seperate table?

- Online status - NO CLUE WHERE TO START WITH THIS

- Pull messages from postgres
    - Need a new postgres database which stores the messages from each user
    - `SELECT * FROM posts WHERE user=user.id AND partner=partner.id` to get the posts, then order via time sent `ORDER BY time`.
    - Then extract the info from each and put into a Message component
    - Must also be able to work out the time since thing - `new Date().toLocaleString()` perhaps
    - New API route for messages

- Write messages and store them in the postgres database AND update the state of the application to include this

- Go to scrollbar when too many messages

## Features to Implement - Calendar
- TODO