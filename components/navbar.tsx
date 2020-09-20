import s from './navbar.module.css'
import Link from 'next/link'
import Anchorbutton from './anchorbutton'

export default function Navbar() {
  return (
    <div className={s.navbar}>
      <div className={s.container}>
        <div className={s.navbarPrimary}>
          <Link href={'/'}>SHOP</Link>
          <div>
            <input></input>
          </div>
        </div>
        <div className={s.navbarSecondary}>
          <Anchorbutton only='lg' link='/'>
            Sell
          </Anchorbutton>
          <Anchorbutton only={['lg']} link='/'>
            Login
          </Anchorbutton>
          <Anchorbutton link='/'>User</Anchorbutton>
        </div>
      </div>
    </div>
  )
}
