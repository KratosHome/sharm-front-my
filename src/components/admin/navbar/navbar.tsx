"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LocalSwitch from "@/components/admin/LocalSwitch/LocalSwitch";
import ThemeSwitcher from "@/components/general/ThemeSwitcher/ThemeSwitcher";

import styles from './navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const goBack = () => {
    if (pathname.includes('new-product')) {
      sessionStorage.setItem('isBackButton', 'true');
    }

    router.back();
  }

  const showBackButton = pathname !== '/en/admin';

  return (
    <div className={ styles.container }>
      <div className={ styles.title }>
        { showBackButton && (
          <button onClick={ goBack } className={ styles.backButton }>←</button>
        ) }
        <span>{ pathname.split('/').pop()?.replace('-', ' ') }</span>
      </div>
      <div className={ styles.switchers }>
        <LocalSwitch/>
        <ThemeSwitcher/>
      </div>
    </div>
  )
}


export default Navbar;
