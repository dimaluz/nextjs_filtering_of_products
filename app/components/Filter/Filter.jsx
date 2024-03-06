'use client';
import styles from './Filter.module.css';
import { BsSliders2 } from "react-icons/bs";

export default function Filter(){
    return(
        <div className={styles.container}>
            <button className={styles.filter_btn}>
                Filter
                <BsSliders2 />
            </button>
        </div>
    )
}