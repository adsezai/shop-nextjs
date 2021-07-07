import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { addItemData, addItemImages } from '../lib/api/client/clientRequests'
import { Text, Box, Space, SpaceSize } from '../styles/utils'
import Layout from '../components/Layout'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'
import Button from '../components/Button'
import Select from '../components/Select'
import { omit } from 'lodash'

type Inputs = {
  image: FileList
  title: string
  description: string
  price: string
  currency: string
  category: string
  location: string
}

type ItemData = Omit<Inputs, 'price' | 'image'> & { price?: number }

export default function Sell({}) {
  const { t } = useTranslation('sell')

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const imageForm = new FormData()

    Array.from(data.image).forEach(image => imageForm.append('image', image))

    const itemData: ItemData = omit(data, ['price', 'image'])
    itemData.price = parseFloat(data.price)

    const item = await addItemData(itemData)
    const images = await addItemImages(item._id, imageForm)
  }

  return (
    <>
      <Layout title='Shop | Sell'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box maxWidth='750px' flexDirection='column' m='0 auto' pt='0'>
            <Text fontSize='l' fontWeight='semibold' mt='0'>
              {t('title')}
            </Text>
            <Card flexDirection='column' mt='15px'>
              <ImageUpload
                register={register}
                error={errors.image && t('errorImage')}
                name='image'
                clearErrors={clearErrors}
                setError={setError}
                title={t('imageUpload')}
              />
            </Card>
            <Card mt='20px' flexDirection='column'>
              <Controller
                name='title'
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors.title && t('errorEmpty')}
                    label={t('titleInput')}
                    placeholder={t('titleInput')}
                  />
                )}
              />
              <Space y={SpaceSize.medium}></Space>
              <Controller
                name='description'
                control={control}
                defaultValue=''
                rules={{}}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors.description && t('errorEmpty')}
                    label={t('descriptionInput')}
                    placeholder={t('descriptionInput')}
                  />
                )}
              />
              <Space y={SpaceSize.medium}></Space>
              <Box alignItems='flex-start'>
                <Controller
                  name='price'
                  control={control}
                  rules={{ required: true, pattern: /^(\d+(?:[\.\,]\d{1,2})?)$/ }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      error={errors.price && t('errorEmpty')}
                      width='auto'
                      step='0.01'
                      label={t('priceInput')}
                      type='number'
                      placeholder={t('priceInput')}
                    />
                  )}
                />
                {errors.price && console.log(errors.price)}
                <Space x={SpaceSize.medium} />
                <Controller
                  name='currency'
                  control={control}
                  defaultValue='eur'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} label=' ' error={errors.currency && t('errorEmpty')}>
                      <option value='eur'>EUR</option>
                      <option value='usd'>USD</option>
                    </Select>
                  )}
                />
              </Box>
            </Card>
            <Card mt='20px' flexDirection='column'>
              <Controller
                name='category'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} label={t('categoryInput')} error={errors.category && t('errorEmpty')}>
                    {(t('common:categories', null, { returnObjects: true }) as Array<any>).map(obj => {
                      const key = Object.keys(obj)[0]
                      return (
                        <option key={key} value={key}>
                          {obj[key]}
                        </option>
                      )
                    })}
                  </Select>
                )}
              />
              <Space y={SpaceSize.medium}></Space>
              <Controller
                name='location'
                control={control}
                defaultValue=''
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t('locationInput')}
                    placeholder={t('locationInput')}
                    error={errors.location && t('errorEmpty')}
                  />
                )}
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
