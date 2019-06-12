var unirest = require("unirest");

var req = unirest("POST", "http://localhost:3000/notify/deploy");

req.headers({
    "cache-control": "no-cache",
    "content-type": "application/json"
});

req.type("json");
req.send({
    "data": "lalala"
});

req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
});