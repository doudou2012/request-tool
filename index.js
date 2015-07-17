#!/usr/bin/env node

process.stdin.setEncoding('utf8');

var fs = require('fs'),
    program = require('commander'),
    request = require('request'),
    crypto = require('crypto');

var loops = 1,
    url = "http://localhost:5000/log",
    events = ['click','view','tap','double-click','scroll'],
    catids = [1000,1001,1002,1003,1004,1005],
    artids = [2001,20003,30001,23451,35662,45672],
    uids = [20001,34320,87897,08989,098523],
    deviceModels = ['iphone5','iphone4s','iphone5s','xiaomi4','iphone6 plus'],
    appids =[1,2,3,4,5,6,7,8],
    oss = ['ios7','ios8','ios9','android 4.1','android 4.4','android 5.0'];

var devicetoken =  function(){
    return crypto.randomBytes(20).toString('hex');
};
var randomNum = function(len){
    return Math.floor(Math.random() * len);
};
var forgedData = function(){
    var event = events[randomNum(events.length)],
        catid = catids[randomNum(catids.length)],
        artid = artids[randomNum(artids.length)],
        uid = uids[randomNum(uids.length)],
        deviceid = devicetoken(),
        deviceModel = deviceModels[randomNum(deviceModels.length)],
        appid = appids[randomNum(appids.length)],
        os = oss[randomNum(oss.length)];
    var data = {
        event:{
            name:event,
            param:{
                cat_id:catid,
                art_id:artid
            }
        },
        uid:uid,
        deviceid:deviceid,
        deviceModel:deviceModel,
        appid:appid,
        os:os,
        timestamp:Math.floor(Date.now() / 1000)
    };
    return JSON.stringify(data);
};
var setLoops = function(){

};

program
    .version('0.0.1')
    .usage('[options] <arguments ...>')
    .option('-n, --requests <requests>','请求数量')
    .option('-u, --url <url>', 'url')
    .option('-d, --data <data>', '要传输的字符串','')
    .parse(process.argv);


var doRequest = function(){
    request({
        method:'POST',
        url:url,
        body:"data="+forgedData()
    },function(error, response, body){

    });
};
for (var i=0;i<program.requests;i++){
    doRequest();
}




