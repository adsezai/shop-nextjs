import s from './navbar.module.css'
import Link from 'next/link'
import Anchorbutton from './anchorbutton'
import { User } from '../lib/common/user.interface'

export default function Navbar({ user }: { user: User }) {
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
          {!user && (
            <Anchorbutton only={['lg']} link='/login'>
              Login
            </Anchorbutton>
          )}
          {user && <Anchorbutton link='/'>{user.firstname}</Anchorbutton>}
        </div>
      </div>
    </div>
  )
}
