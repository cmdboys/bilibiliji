const Base = require('./base.js');
const Chrome = require('../util/Chrome')
const balancedMatch = require("balanced-match")


module.exports = class extends Base {
  async indexAction() {
    let getValues = this.ctx.param();
    let videoInfo = null
    let playInfo = null
    
    if(!getValues.video){
      // 没传视频参数 跳转到首页
      this.ctx.redirect('/');
      return
    }
    
    try {
  
      let html = await Chrome.getPlayHtml(getValues.video)
      
      if(html.code == 200){
        videoInfo = balancedMatch('<script>window.__INITIAL_STATE__=', ';(function(){var s;(s=document', html.data)
        playInfo = balancedMatch('<script>window.__playinfo__=', '</script>', html.data);
      }
  
      this.assign({
        artData: {
          videoInfo: videoInfo.body,
          playInfo: playInfo.body
        },
        objData: {
          video: getValues.video
        }
      })
      
      
      return this.display();
    }catch (e) {
      this.ctx.fail(500)
    }
    
  }
};
