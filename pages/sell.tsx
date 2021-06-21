import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'

import { addItemData, addItemImages } from '../lib/api/client/clientRequests'
import { Text, Box, Space, SpaceSize } from '../styles/utils'
import Layout from '../components/Layout'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'
import Button from '../components/Button'
import Select from '../components/Select'

export default function Sell({}) {
  const { t } = useTranslation('sell')

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('') // ^(\d+(?:[\.\,]\d{0,2})?)$
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [currency, setCurrency] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const itemData = {
      title,
      price: parseFloat(price),
      description,
      category,
      location,
      currency
    }

    const formData = new FormData(e.currentTarget)
    const submitForm = new FormData()
    const formImages = formData.getAll('image')
    formImages.forEach(image => submitForm.append('image', image))
    const item = await addItemData(itemData)
    const images = await addItemImages(item._id, submitForm)
  }

  return (
    <>
      <Layout title='Shop | Sell'>
        <form noValidate onSubmit={handleSubmit}>
          <Box maxWidth='750px' flexDirection='column' m='0 auto' p='16px' pt='0'>
            <Text fontSize='l' fontWeight='semibold' mt='0'>
              {t('title')}
            </Text>
            <Card flexDirection='column' mt='15px'>
              <ImageUpload title={t('imageUpload')} />
            </Card>
            <Card mt='20px' flexDirection='column'>
              <Input
                name='title'
                required
                label={t('titleInput')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
                placeholder={t('titleInput')}
                value={title}
              />
              <Space y={SpaceSize.medium}></Space>
              <Input
                name='description'
                required
                label={t('descriptionInput')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescription(e.target.value)}
                placeholder={t('descriptionInput')}
                value={description}
              />
              <Space y={SpaceSize.medium}></Space>
              <Box alignItems='flex-end'>
                <Input
                  name='price'
                  required
                  width='auto'
                  label={t('priceInput')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPrice(e.target.value)}
                  type='number'
                  placeholder={t('priceInput')}
                  value={price}
                />
                <Space x={SpaceSize.medium} />
                <Select
                  name='currency'
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setCurrency(e.target.value)}
                  label=' '
                  value={currency}
                >
                  <option value='eur'>EUR</option>
                  <option value='usd'>USD</option>
                </Select>
              </Box>
            </Card>
            <Card mt='20px' flexDirection='column'>
              <Select
                name='category'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setCategory(e.target.value)}
                label={t('categoryInput')}
                value={category}
              >
                {(t('common:categories', null, { returnObjects: true }) as Array<any>).map(obj => {
                  const key = Object.keys(obj)[0]
                  return (
                    <option key={key} value={key}>
                      {obj[key]}
                    </option>
                  )
                })}
              </Select>
              <Space y={SpaceSize.medium}></Space>
              <Input
                name='location'
                required
                label={t('locationInput')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLocation(e.target.value)}
                placeholder={t('locationInput')}
                value={location}
              />
            </Card>
            <Box justifyContent='flex-end' mt='20px'>
              <Button type='submit' size='medium'>
                {t('publish')}
              </Button>
            </Box>
          </Box>
        </form>
      </Layout>
    </>
  )
}

const Card = styled(Box)`
  padding: 30px;
  border-width: 1px;
  border-style: solid;
  border-radius: ${props => props.theme.borderRadiuses.default};
  border-color: ${props => props.theme.colors.borders.lightgray};
`
