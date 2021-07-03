const nextTranslate = require('next-translate')

const config = {
  images: {
    domains: ['picsum.photos', 'adsezaistorage.blob.core.windows.net']
  }
}

module.exports = nextTranslate(config)
