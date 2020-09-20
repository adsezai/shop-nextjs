import styles from './cardgrid.module.css'

export default function Cardgrid({ children }: { children: Array<JSX.Element> }) {
  return <div className={styles.container}>{children}</div>
}
