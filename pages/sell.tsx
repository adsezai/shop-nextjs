import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import { Text } from '../styles/utils'

export default function Sell({}) {
  const { t } = useTranslation('sell')
  return (
    <>
      <Layout title='Shop | Sell'>
        <Text>{t('title')}</Text>
      </Layout>
    </>
  )
}
