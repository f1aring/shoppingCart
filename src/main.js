let shop = document.getElementById("shop"); // This gets the id of shop. Differntianted by <div>



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
        let {id,name,price,desc,img} = x
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
        <img width="229px" src="${img}" alt="">
        <div class="details">
            <h3${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="button">
                    <i onclick="dicrement(${id})" class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${search.item === undefined? 0: search.item }</div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                    
                </div>
            </div>
        </div>
    </div>
        `
    }).join("") );
}
generateShop()


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find ((x) => x.id === selectedItem.id);
    if (search  === undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        }); 
    }
    else{
        search.item += 1;
    }
    
    //console.log(basket)
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));

}
let dicrement = (id) => {
    let selectedItem = id;
    let search = basket.find ((x) => x.id === selectedItem.id);
    if(search === undefined) return;
    else if (search.item  === 0){
        //basket.pop(search.id) //could change
       return; 
    }
    else{
        search.item -= 1;
    }
   
    //console.log(basket)
    
    update(selectedItem.id);

    basket = basket.filter((x) => x.item !== 0);
    
    localStorage.setItem("data",JSON.stringify(basket));
} 
let update = (id) => {
     let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    cartSum();
    
}
let cartSum = () =>{
    let cartValue = document.getElementById("cartAmount");
    let sum =basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    cartValue.innerHTML = sum;
}

cartSum();