import styles from './navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <Link href={'/'}>Logo</Link>
      </div>
    </div>
  )
}
