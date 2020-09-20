import s from './navbar.module.css'
import Link from 'next/link'
import Anchorbutton from './anchorbutton'

export default function Navbar() {
  return (
    <div className={s.navbar}>
      <div className={s.container}>
        <div className={s.navbarPrimary}>
          <Link href={'/'}>
            <a className={s.title}>SHOP</a>
          </Link>
          {/* <div>
            <input placeholder='search...'></input>
          </div> */}
        </div>
        <div className={s.navbarSecondary}>
          {/*  <Anchorbutton only='sm' link='/'>
            Search
          </Anchorbutton> */}
          <Anchorbutton link='/sell'>Sell</Anchorbutton>
          <Anchorbutton only={['lg']} link='/login'>
            Login
          </Anchorbutton>
          <Anchorbutton link='/'>User</Anchorbutton>
        </div>
      </div>
    </div>
  )
}
