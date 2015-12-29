#!/usr/bin/env node
var config = require('./config')
var luosimao = require('node-sms-luosimao')
var request = require('request')
var nocb = function(){}

if (!config.luosimao.key) {
  return console.error("invalid luosimao key")
}

if (!config.applications || !config.applications.length) {
  return console.error("please add applications")
}

if (!config.phones || !config.phones.length) {
  return console.error("invalid phone")
}

luosimao.key = config.luosimao.key

function send_all(application){
  var message = `${application.name} 未能成功获取 status，请及时检查!`
  console.error(`[${new Date()}] ${message}`)
  config.phones.forEach( (phone)=>{
    //暂时不捕捉发送短信失败的错误
    luosimao.send(phone, message, nocb)
  })
}

function get_status(application){
  request(application.statusUrl, (error, response, body)=>{
    try {
      var res = JSON.parse(body)
      if (res.ok !== 1) {
        send_all(application)
      }
    } catch (e) {
      send_all(application)
    }
  })
}

config.applications.forEach((application)=>{
  get_status(application)
})
