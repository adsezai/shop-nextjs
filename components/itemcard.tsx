import Link from 'next/link'
import styles from './itemcard.module.css'
import { Item } from '../lib/common/item.interface'

export default function Itemcard({ item }: { item: Item }) {
  return (
    <div className={styles.container}>
      <Link href={`/i/${1}`}>
        <a className={styles.itemcard}>
          <div className={styles.content}>
            <div className={styles.imagecontent}>
              <img src='https://picsum.photos/237/237' alt='img'></img>
            </div>
            <div className={styles.itemcontent}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.price}>{item.price} €</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}
