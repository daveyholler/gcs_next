import Head from 'next/head'
import Link from 'next/link'
import '../styles/styles.scss'

export default ({ children }) => {
  /*
   * Added this to toggle the is-active class. See:
   *
   * https://bulma.io/documentation/components/navbar/#navbar-menu
   * https://github.com/jgthms/bulma/issues/856
   */
  const toggleStyles = (event) => {
    document.querySelector('#burger').classList.toggle('is-active')
    document.querySelector('#navbarmenu').classList.toggle('is-active')
  }

  return (
    <div>
      <Head>
        <title>Game Central Station</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src="/static/pic.png" />
            </a>
            <a id="burger" onClick={toggleStyles}
                role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarmenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarmenu" className="navbar-menu">
            <div className="navbar-start">
              <Link prefetch href="/">
                <a className="navbar-item">Home</a>
              </Link>
              <Link prefetch href="/elsewhere">
                <a className="navbar-item">Elsewhere</a>
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <input className="input is-rounded" type="text" placeholder="Search the things..." />
              </div>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </div>
  )
}
