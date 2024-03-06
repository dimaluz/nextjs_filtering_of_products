import md5 from "md5";


export const GetItemIds = async() => {

    const stamp = new Date().toISOString().slice(0, 10).replace('-',"");
    const s = stamp.replace('-', '');
    const auth = md5(`Valantis_${s}`);

    try{
        const res = await fetch('https://api.valantis.store:41000/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': auth,
            },
            body: JSON.stringify({
                "action": "get_ids",
                // "params": {'limit': 3},
            }),
        });

        return res.json();
    }catch(error){
        throw new Error(error);
    }
}

export const GetItemById = async (props) => {

    const stamp = new Date().toISOString().slice(0, 10).replace('-',"");
    const s = stamp.replace('-', '');
    const auth = md5(`Valantis_${s}`);

    const ITEM_PER_PAGE = 50;

    try{
        const res = await fetch('https://api.valantis.store:41000/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': auth,
            },
            body: JSON.stringify({
                "action": "get_items",
                "params":{
                    "ids": props,
                },
            }),
        });
        return res.json();
    }catch(error){
        throw new Error(error);
    }
    
}

export const FilterItems = async (params) => {
    
    const stamp = new Date().toISOString().slice(0, 10).replace('-',"");
    const s = stamp.replace('-', '');
    const auth = md5(`Valantis_${s}`);

    try{
        const res = await fetch('https://api.valantis.store:41000/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': auth,
            },
            body: JSON.stringify({
                "action": "filter",
                "params": params,
            }),
        });
        return res.json();
    }catch(error){
        throw new Error(error);
    }
}

export const getProductFields = async (field) => {
    const stamp = new Date().toISOString().slice(0, 10).replace('-',"");
    const s = stamp.replace('-', '');
    const auth = md5(`Valantis_${s}`);

    try{
        const res = await fetch('https://api.valantis.store:41000/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': auth,
            },
            body: JSON.stringify({
                "action": "get_fields",
                "params": {"field": field},
            }),
        });
        return res.json();
    }catch(error){
        throw new Error(error);
    }
}

