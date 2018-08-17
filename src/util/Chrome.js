let baseConfig = require('../config/bilibili.base')
let axios = require('axios')
let qs = require('qs')

class Chrome {
  
  constructor(){

  }
  
  get(url, data){
    
    return new Promise(resolve => {
      axios.get(url + '?' + ( data ? decodeURIComponent(qs.stringify(data)) : '')
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
    return this.get( baseConfig.baseUrl + '/' + baseConfig.play + '/' + url )
  }

}



module.exports = new Chrome()