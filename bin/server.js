const app = require("../index.js");
const PORT = process.env.PORT || 5000;

// Starts the server
app.listen(PORT, () => {
    console.log("Now listening on port ", PORT)
});
