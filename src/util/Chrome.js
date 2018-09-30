let baseConfig = require('../config/bilibili.base')
let axios = require('axios')
let qs = require('qs')

class Chrome {
  
  constructor(){

  }
  
  get(url, data){
    
    return new Promise(resolve => {
      axios.get(url + '?' + ( data ? decodeURIComponent(qs.stringify(data)) : ''),
        {
          headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36' },
        }
        )
        .then(function (response) {
          // handle success
          resolve({
            code: 200,
            data: response.data,
            response
          })
        })
        .catch(function (error) {
          // handle error
          resolve({
            code: 500,
            data: null,
            error
          })
        })
      
    })
  }

  async getPlayHtml(url){
    return this.get( url )
  }

}



module.exports = new Chrome()
