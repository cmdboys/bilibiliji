const exec = require('child_process').exec;
const config = require('../config/bilibili.base')
const path = require('path')
const URL = require("url");
const fs = require("fs");

class Env {
  
  constructor () {
  
  }
  
  async runDev(cmdStr){
    
    return new Promise(resolve => {
      exec(cmdStr, function(err, stdout, stderr){
        resolve({
          err,
          data: stdout
        })
      });
    })
    
  }
  
  trim(str){
    return str.replace(/[\n\t\b\s\r]/g, '')
  }
  
  parseFileURl(url){
    var parsed = URL.parse(url);
    return path.basename(parsed.pathname)
  }
  
  async annieGetInfo(url) {
    let str = await this.runDev(`annie -j ${url}`)
    !str.err && (str.data = JSON.parse(str.data))
    return str
  }
  
  annieDownload(url) {
    return this.runDev(`annie ${url}`)
  }
  
  log ( msg ) {
    console.log( msg )
  }
  
  parseEnterUrl(str) {
    if(str.indexOf('http') !== -1) {
      return str
    } else if (str.indexOf('av') !== -1) {
      return config.baseUrl + '/' + config.play + '/' + str
    } else {
      return ''
    }
  }
  
  
  moveFile(from, to) {
    return new Promise(resolve => {
  
      console.log(from)
      console.log(to)
      var readStream = fs.createReadStream(from);
      var writeStream = fs.createWriteStream(to);
  
      readStream.on('error', ()=>{
      
      });
      writeStream.on('error', ()=>{
      
      });
  
      readStream.on('close', function () {
        // fs.unlink(from, ()=>{
          resolve()
        // });
      });
  
      readStream.pipe(writeStream);
      
    })
  }
  
}


module.exports = Env
