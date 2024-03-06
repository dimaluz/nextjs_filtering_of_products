
import styles from "./page.module.css";
import { FilterItems, GetItemById, GetItemIds, getProductFields } from "./lib/utils";
import Pagination from "./components/Pagination/Pagination";
import Navbar from "./components/Navbar/Navbar";

let unique_ids;

export default async function Home({ searchParams }) {

  const page = searchParams?.page || 1;
  const product_name = searchParams?.product || '';
  const product_price = searchParams?.price || '';
  const product_brand = searchParams?.brand || '';

  console.log("PR_BRAND: ", product_brand);

  const ITEM_PER_PAGE = 50;

  if ((!product_name || product_name==="None") && (!product_price || product_price==="None") && (!product_brand || product_brand==="None")){
    const data = await GetItemIds();
    unique_ids = Array.from(new Set(data.result));
  }
  else{
    let product_names = {};
    let product_prices = {};
    let product_brands = {};

    if(product_name && product_name!=="None"){
      product_names = await FilterItems({'product': product_name});
      console.log("Product_names: ", product_names.result);
    }
    if(product_price && product_price!=="None"){
      product_prices = await FilterItems({'price': parseFloat(product_price)});
      console.log("Product_prices: ", product_prices.result);
    }
    if(product_brand && product_brand!=="None"){
      if (product_brand === "NotSpecified"){
        product_brands = await FilterItems({'brand': null});
      }else{
        product_brands = await FilterItems({'brand': product_brand});
      }
      console.log("Product_brands: ", product_brands.result);
    }

    if(product_names.result && product_prices.result && product_brands.result){
      const names = new Set(product_names.result);
      const prices = new Set(product_prices.result);
      const brands = new Set(product_brands.result);
      const names_prices = new Set([...names].filter(item => prices.has(item)));
      const names_prices_brands = new Set([...names_prices].filter(item => brands.has(item)));
      unique_ids = Array.from(names_prices_brands);
      // console.log("PRODUCT_NAMES && PRODUCT_PRICES && PRODUCT_BRANDS");
    }
    else if(product_names.result && product_prices.result){
      const names = new Set(product_names.result);
      const prices = new Set(product_prices.result);
      const names_prices = new Set([...names].filter(item => prices.has(item)));
      unique_ids = Array.from(names_prices);
      // console.log("PRODUCT_NAMES && PRODUCT_PRICES");
    }
    else if(product_names.result && product_brands.result){
      const names = new Set(product_names.result);
      const brands = new Set(product_brands.result);
      const names_brands = new Set([...names].filter(item => brands.has(item)));
      unique_ids = Array.from(names_brands);
      // console.log("PRODUCT_NAMES && PRODUCT_BRANDS");
    }
    else if(product_prices.result && product_brands.result){
      const prices = new Set(product_prices.result);
      const brands = new Set(product_brands.result);
      const prices_brands = new Set([...prices].filter(item => brands.has(item)));
      unique_ids = Array.from(prices_brands);
      // console.log("PRODUCT_PRICES && PRODUCT_BRANDS");
    }
    else if(product_names.result){
      unique_ids = Array.from(new Set(product_names.result));
      // console.log("PRODUCT_NAMES");
    }
    else if(product_brands.result){
      const brands = new Set(product_brands.result);
      unique_ids = Array.from(brands);
      // console.log("PRODUCT_BRANDS");
    }
    else if(product_prices.result){
      unique_ids = Array.from(new Set(product_prices.result));
      // console.log("PRODUCT_PRICES");
    }
    else{
      unique_ids = Array();
    }
  }

  // Get all product names from db for filter component
  const products = await getProductFields("product");
  const unique_products = Array.from(new Set(products.result));
  
  // Get all product prices from db for filter component
  const prices = await getProductFields('price');
  const unique_prices = Array.from(new Set(prices.result));

  // Get all product brands from db for filter component
  const brands = await getProductFields('brand');
  const unique_brands = Array.from(new Set(brands.result));

  
  // Get product for one page
  const start = ITEM_PER_PAGE * (parseInt(page)-1);
  const end = ITEM_PER_PAGE + start;
  // console.log("UIDS: ", unique_ids);

  const items_id = unique_ids.slice(start, end);
  
  const items = await GetItemById(items_id);

  const uniqueItems = items.result.reduce((accumulator, current) => {
    if (accumulator.findIndex(object => object.id === current.id) === -1) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const total_items = unique_ids.length;
  

  return (
    <main className={styles.container}>
      <div className={styles.navbar}>
        <Navbar 
          products={unique_products} 
          prices={unique_prices} 
          brands={unique_brands}
        />
      </div>
      <div className={styles.maincontent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Produc ID</td>
              <td>Product Name</td>
              <td>Price</td>
              <td>Brand</td>
            </tr>
          </thead>
          <tbody>
            {uniqueItems && uniqueItems.map(item => (
              <tr key={item.id}>
                <td><span className={styles.productId}>{item.id}</span></td>
                <td><span className={styles.productName}>{item.product}</span></td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total_items={total_items}/>
      </div>
    </main>
  );
}
