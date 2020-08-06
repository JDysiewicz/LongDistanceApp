const { Router } = require("express");
const router = Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false})


// A lot of this is temporary to test out the account linking feature
// router.get("/", (req,res) => {
//     if(!req.isAuthenticated()){
//         res.send(
//             `<span>Please Login:</span>
//             <form method="GET" action="/auth/google">
//                 <input type="submit" value="Login with Google" />
//             </form>`
//         );
//     } else if (req.user.has_partner === null && req.user.sent_request === null && req.user.has_request === null) {
//         const user = req.user;
//         res.send(
//             `<span>Welcome ${user.given_name}, your Partner Code is ${user.partner_code}!</span>
//             <form method="POST" action="/api/logout">
//                 <input type="submit" value="Logout" />
//             </form>

//             <br>

//             <span>To partner up, please send a request to your partner's Partner Code:</span>
//             <form method="POST" action="/api/send-request">
//                 <label for="partnerscode">Partner's Code (Do not include dashes):</label><br>
//                 <input type"number" id="partnerscode" name="partnerscode">
//                 <input type="submit" value="Send Request">
//             </form>
//             `
//         )
//         } else if (req.user.has_partner === null && req.user.sent_request !== null && req.user.has_request === null) {
//                 const user = req.user;
//                 res.send(
//                     `<span>Welcome ${user.given_name}, your Partner Code is ${user.partner_code}!</span>
//                     <form method="POST" action="/api/logout">
//                         <input type="submit" value="Logout">
//                     </form>
        
//                     <br>
        
//                     <span>Pending Response from ${req.user.sent_request}...</span>
//                     <form method="POST" action="/api/remove-request">
//                         <input type="submit" value="Remove Request">
//                     </form>
//                     `
//                 )
//         } else if (req.user.has_partner === null && req.user.sent_request === null && req.user.has_request !== null) {
//             const user = req.user;
//             res.send(
//                 `<span>Welcome ${user.given_name}, your Partner Code is ${user.partner_code}!</span>
//                 <form method="POST" action="/api/logout">
//                     <input type="submit" value="Logout">
//                 </form>
    
//                 <br>
    
//                 <span>Request From: ${req.user.has_request}</span>
//                 <form method="POST" action="/api/partner-up">
//                     <input type="submit" value="Accept">
//                 </form>
                
//                 <form method="POST" action="/api/decline-request">
//                     <input type="submit" value="Decline">
//                 </form>`
//             )
//         } else if(req.user.has_partner !== null){
//             res.redirect("/home");
//         }
// });


module.exports = router;