import Link from 'next/link'
import s from './anchorbutton.module.css'

interface Props {
  link: string
  children: string
  only?: string | Array<string>
}

export default function Anchorbutton({ link, children, only }: Props) {
  const showOn = only && Array.isArray(only) ? only.join(' ') : [only].join(' ')
  return (
    <div className={showOn}>
      <Link href={link}>
        <a className={[s.anchorbutton].join(' ')}>{children}</a>
      </Link>
    </div>
  )
}
