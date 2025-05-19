'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>

        <div className={styles.title_container}>
          <Link href="/" className={styles.link}><h3>Tech Blog by T.S.</h3></Link>
        </div>

        <nav className={styles.nav_container}>
          <Link
            href="/"
            className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={`${styles.link} ${pathname === '/search' ? styles.active : ''}`}
          >
            Search
          </Link>
          <Link
            href="https://takumasasugiyama.com/"
            className={styles.link}
            target="_blank"
          >
            About Me
          </Link>
        </nav>

      </div>
    </header>
  )
}