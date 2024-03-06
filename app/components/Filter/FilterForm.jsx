'use client';

import * as Form from '@radix-ui/react-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './FiletrForm.module.css';

const FilterForm = ({products, prices, brands}) => {

    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    const handleFilter = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', 1);
        if(searchParams.product == "None" && searchParams.price == "None" && searchParams.brand == "None"){
            params.delete('product');
            params.delete('price');
            params.delete('brand');
        }
        replace(`${pathname}?${params}`);
    }


    return (
        <Form.Root className={styles.container}>
            <div className={styles.fields}>
            <Form.Field className={styles.field} name="product">
            <Form.Label>Product Name</Form.Label>
            <Form.Control asChild>
                <select key='product'>
                    <option key="noproduct" value="None">None</option>
                    {
                        products.map((product, index) => (
                            <option key={index} value={product}>{product}</option>
                        ))
                    }
                </select>
            </Form.Control>
            </Form.Field>

            <Form.Field className={styles.field} name="price">
            <Form.Label>Price</Form.Label>
            <Form.Control asChild>
                <select key='price'>
                    <option key="noprice" value="None">None</option>
                    {
                        prices.map(price => (
                            <option key={price} value={price}>{price}</option>
                        ))
                    }
                </select>
            </Form.Control>
            </Form.Field>

            <Form.Field className={styles.field} name="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control asChild>
                <select key='brand'>
                    <option key="nobrand" value="None">None</option>
                    {
                        brands.map((brand, index) => (
                            <option 
                                key={[brand, '_', toString(index)].join()} 
                                value={brand ? brand : 'NotSpecified'}
                            >
                                {brand ? brand : 'NotSpecified'}
                            </option>
                        ))
                    }
                </select>
            </Form.Control>
            </Form.Field>
            </div>
            <div className={styles.btn}>
                <Form.Submit 
                    className={styles.submit} 
                    onClick={() => handleFilter()}
                >
                    Apply
                </Form.Submit>
            </div>
        </Form.Root>
    )
}

export default FilterForm;