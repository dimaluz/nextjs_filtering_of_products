'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

import { GoArrowLeft, GoArrowRight } from "react-icons/go";


export default function Pagination({data, total_items}){

    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    console.log(total_items)

    const page = searchParams.get('page') || 1;

    const params = new URLSearchParams(searchParams);
    const ITEM_PER_PAGE = 50;
    

    const total_pages = Math.ceil(total_items / ITEM_PER_PAGE);

    const hasPrev = ITEM_PER_PAGE * (parseInt(page)-1) > 0;
    const hasNext = ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE < total_items;

    const handleChangePage = (type) => {
        type === 'prev' ? params.set('page', parseInt(page)-1) : params.set('page', parseInt(page)+1);
        replace(`${pathname}?${params}`);
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button 
                    className={styles.button} 
                    disabled={!hasPrev}
                    onClick={() => handleChangePage("prev")}
                >
                    <GoArrowLeft size={20}/>
                </button>
                <button 
                    className={styles.button} 
                    disabled={!hasNext}
                    onClick={() => handleChangePage("next")}
                >
                    <GoArrowRight size={20}/>
                </button>
            </div>
            <div className={styles.pages}>
                Page: {page} of {total_pages}
            </div> 
        </div>
    )
}