'use client';

import styles from './Sidebar.module.css';
import FilterForm from '../Filter/FilterForm';


const Sidebar = ({products, prices, brands}) => {
    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <FilterForm 
                    products={products} 
                    prices={prices} 
                    brands={brands}
                />
            </div>
        </div>
    )
}

export default Sidebar;