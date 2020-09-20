import Link from 'next/link'
import s from './anchorbutton.module.css'

interface Props {
  link: string
  children: string
}

export default function Anchorbutton({ link, children }: Props) {
  return (
    <Link href={link}>
      <a className={s.anchorbutton}>{children}</a>
    </Link>
  )
}
