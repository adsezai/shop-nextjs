import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'
import { Box, Space, SpaceSize } from '../styles/utils'

import Layout from '../components/Layout'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'

import { Text } from '../styles/utils'
import { useState } from 'react'
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

  return (
    <>
      <Layout title='Shop | Sell'>
        <Box maxWidth='750px' flexDirection='column' m='0 auto' p='16px' pt='0'>
          <Text fontSize='l' fontWeight='semibold' mt='0'>
            {t('title')}
          </Text>
          <Card flexDirection='column' mt='15px'>
            <ImageUpload title={t('imageUpload')} />
          </Card>
          <Card mt='20px' flexDirection='column'>
            <Input
              label={t('titleInput')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
              placeholder={t('titleInput')}
              value={title}
            />
            <Space y={SpaceSize.medium}></Space>
            <Input
              label={t('descriptionInput')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescription(e.target.value)}
              placeholder={t('descriptionInput')}
              value={description}
            />
            <Space y={SpaceSize.medium}></Space>
            <Box alignItems='flex-end'>
              <Input
                width='auto'
                label={t('priceInput')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPrice(e.target.value)}
                type='number'
                placeholder={t('priceInput')}
                value={price}
              />
              <Space x={SpaceSize.medium} />
              <Select
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
              label={t('locationInput')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLocation(e.target.value)}
              placeholder={t('locationInput')}
              value={location}
            />
          </Card>
          <Box justifyContent='flex-end' mt='20px'>
            <Button size='medium'>{t('publish')}</Button>
          </Box>
        </Box>
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
