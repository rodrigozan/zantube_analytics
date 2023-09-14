import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../assets/css/layout.module.css';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Ztube Analytics' }: Props) => (
  <div className={style.container}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/assets/img/youtube_icon.png" type="image/x-icon" />
    </Head>
    <div className='d-flex justify-content-center bg-primary mb-5'>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand active" href="/">Home</Link>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" href="/about">About</Link>
                </li>
              </ul>
            </div> */}
          </div>
        </nav>
      </header>
    </div>
    <div className='container'>
      <main>{children}</main>
      <footer className={`${style.footer} container-fluid text-center py-5`}>
        <span>Developed by <Link href="https://github.com/rodrigozan" target="_blank">Rodrigo Zan</Link></span>
      </footer>
    </div>
  </div>
)

export default Layout
