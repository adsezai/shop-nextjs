import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'

export default function Sell({}) {
  const { t } = useTranslation('sell')
  return (
    <>
      <Layout title='Shop | Sell'>
        <div>{t('title')}</div>
      </Layout>
    </>
  )
}
