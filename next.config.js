const nextTranslate = require('next-translate')

const config = {
  images: {
    domains: ['picsum.photos', 'adsezaistorage.blob.core.windows.net', 'shop-adsezai.azureedge.net']
  }
}

module.exports = nextTranslate(config)
