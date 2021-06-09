import useTranslation from 'next-translate/useTranslation'
import { Box, Space, SpaceSize } from '../styles/utils'
import Layout from '../components/Layout'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'

import { Text } from '../styles/utils'
import { useState } from 'react'
import Button from '../components/Button'

export default function Sell({}) {
  const { t } = useTranslation('sell')

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  return (
    <>
      <Layout title='Shop | Sell'>
        <Box maxWidth='750px' flexDirection='column' m='0 auto' p='16px'>
          <Text fontSize='l' fontWeight='semibold' mt='0'>
            {t('title')}
          </Text>
          <ImageUpload />
          <Box marginY='20px' flexDirection='column'>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
              placeholder={t('titleInput')}
              value={title}
            />
            <Space y={SpaceSize.large}></Space>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescription(e.target.value)}
              placeholder={t('descriptionInput')}
              value={description}
            />
            <Space y={SpaceSize.large}></Space>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPrice(e.target.value)}
              type='number'
              placeholder={t('priceInput')}
              value={price}
            />
          </Box>
          <Box justifyContent='flex-end' mt='10px'>
            <Button size='medium'>{t('publish')}</Button>
          </Box>
        </Box>
      </Layout>
    </>
  )
}
