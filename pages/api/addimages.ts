import { NextApiRequest, NextApiResponse } from 'next'
import { addItemImage } from '../../lib/api/server/items'
import { tokenNames as n } from '../../lib/global/const'
import * as cookie from 'cookie'
import { pipeline as pLine } from 'stream'
import { promisify } from 'util'
import FormData from 'form-data'

const pipeline = promisify(pLine)

const Busboy = require('busboy')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { itemid } = req.query

    const cookies = cookie.parse(req.headers.cookie)
    const accessToken = cookies[n.ACCESS_TOKEN]

    const busboy = new Busboy({ headers: req.headers })
    const promiseArray = []

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      console.log('Start processing file ', fieldname, filename)

      const fileUpload = new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('itemid', itemid)
        formData.append(fieldname, file, { contentType: mimetype, filename: filename })

        addItemImage(formData, accessToken)
          .then(() => {
            console.log('Sucessfully added file ', filename)
            resolve(true)
          })
          .catch(error => {
            console.log('Error uploading file ', filename, ' Error: ', error.message)
            reject(error)
          })
      })

      promiseArray.push(fileUpload)
    })

    //busboy.on('field', (fieldname, value, fieldnameTruncated, valTruncated, encoding, mimetype) => {})

    busboy.on('finish', () => {
      console.log('Done parsing form!')
    })

    await pipeline(req, busboy)

    await Promise.all(promiseArray)
      .then(() => {
        console.log('Sucessfully added all images.')
        res.status(200).send('Successfully added Images')
        res.end()
      })
      .catch(error => {
        console.log('Error adding images.', error)
        res.status(error.code).send(error.message)
      })
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}
