#!/usr/bin/env node

var argv = require('yargs')
    .command('signal <instances>', 'notify instances to deploy', (yargs) => {
        yargs
            .positional('instances', {
                describe: 'instances to notify',
                type: 'string',
                default: 'all',
            })
    }, (argv) => {
        argv.instances=argv.instances=='all'?null:argv.instances
        if (argv.instances){
            argv.instances = argv.instances.split(',');
        } 
    })
    .option('versionNumber', {
        alias: 'v',
        describe: 'version to deploy, if its blank then deploys @latest',
        nargs: 1,
        default: null,
        string: true
    })
    .option('buildNumber', {
        alias: 'b',
        describe: 'build to deploy, if its blank then deploys @latest',
        nargs: 1,
        default: null,
        string: true
    })
    .argv

var instances = argv.instances;
var version = argv.versionNumber;
var build = argv.buildNumber;

var wsBaseURL = "http://localhost:3000";
var wsToken = "superSecretToken";

var unirest = require("unirest");
var req = unirest("POST", `${wsBaseURL}/notify/deploy`);

req.headers({
    "cache-control": "no-cache",
    "content-type": "application/json"
});

req.type("json");
req.send({
    "instances": instances,
    "version": version,
    "build": build,
    "serviceToken": wsToken
});

req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
});