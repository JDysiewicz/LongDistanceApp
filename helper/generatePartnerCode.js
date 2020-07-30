// Helper function to generate the partner codes as 9 number strings
function generatePartnerCode(){
    let codeArr = [];

    while(codeArr.length <= 8){
        let randomNo = Math.floor(Math.random() * 10);
        codeArr.push(randomNo);
    };

    const code = codeArr.join("-");
    return code;

};


module.exports = generatePartnerCode;