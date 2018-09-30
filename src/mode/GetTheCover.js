
// 获取封面
const Env  = require('../util/Env')
const Chrome = require('../util/Chrome')
const balancedMatch = require("balanced-match")
const path = require("path")

class GetTheCover {
  
  constructor (args, dirname, cwd) {
  
    this.args = args
    this.Env = new Env()
    this.dirname = dirname
    this.cwd = cwd
    
    this.url = ''
    
    if(this.args.length >= 4) {
      this.url = this.Env.parseEnterUrl( this.args[3] )
    }
  
  }

  async parseCover(){
    let videoInfo = null
    let playInfo = null
    
    let html = await Chrome.getPlayHtml(this.url)
  
    if(html.code == 200){
      videoInfo = balancedMatch('<script>window.__INITIAL_STATE__=', ';(function(){var s;(s=document', html.data)
      playInfo = balancedMatch('<script>window.__playinfo__=', '</script>', html.data);
    }
    
    return {
      videoInfo: JSON.parse(videoInfo.body),
      playInfo: JSON.parse(playInfo.body)
    }
  }
  
  async downloadCover(){
    // 首先获取图片信息
    this.Env.log('解析封面图...')
    
    if(this.url === '') {
      console.log('格式错误~')
      return
    }
    
    try {
      let imgInfo = await this.parseCover()
      console.log(imgInfo.videoInfo.videoData.pic)
      this.Env.log('解析成功，开始下载...')
      
      let picFileName = await this.Env.parseFileURl(imgInfo.videoInfo.videoData.pic)
      // 执行下载
      await this.Env.annieDownload(imgInfo.videoInfo.videoData.pic)
      
      // 下载完成，移动文件
      // await this.Env.moveFile(path.join(this.dirname, picFileName), path.join(this.cwd, picFileName))
      console.log('done.')
    }catch (e) {
      this.Env.log('解析失败：')
      this.Env.log(e)
    }
    
  }
  
}


module.exports = GetTheCover
