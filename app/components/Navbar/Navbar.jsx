'use client';

import { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import styles from './Navbar.module.css'
import { BsSliders2 } from "react-icons/bs";

const Navbar = ({products, prices, brands}) => {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }

    return(
        <nav className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.title}>
                    Products
                </div>
                <div className={styles.filter}>
                    <button className={styles.filter_btn} onClick={handleClick}>
                        Filter
                        <BsSliders2 />
                    </button>
                </div>
            </div>
            <div className={isActive ? styles['filterbar open']:styles.filterbar}>
                <Sidebar 
                    products={products} 
                    prices={prices} 
                    brands={brands}
                />
            </div>
        </nav>
    )
}
export default Navbar;