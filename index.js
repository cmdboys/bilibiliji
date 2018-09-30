#!/usr/bin/env node
const argv = process.argv;
const dirname = __dirname;
const getCover = require('./src/mode/GetTheCover');
const getVideo = require('./src/mode/GetTheVideo');
const cwd = process.cwd();

(async function() {
  
  if(argv.length > 2) {
    
    let dev = argv[2]
    
    switch (dev) {
      case 'cover':
        let getcc = new getCover(argv, dirname, cwd)
        await getcc.downloadCover()
      case 'video':
        let getvc = new getVideo(argv, dirname, cwd)
        await getvc.downloadVideo()
    }
    
  } else {
    console.log('help');
  }
  
  
})();
