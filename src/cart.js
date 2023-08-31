let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");




let basket = JSON.parse(localStorage.getItem("data")) || [];

let cartSum = () =>{
    let cartValue = document.getElementById("cartAmount");
    let sum =basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    cartValue.innerHTML = sum;
}

cartSum();


let generateCartItems = () => {
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return `
            <div class="cart-item">
                <img width= "100" src= ${search.img} alt="">
                <div class="details">

                    <div class="title-price-x">
                            <h4>
                            <p>
                            ${search.name}
                        </p>
                        <p>
                        $ ${search.price}
                        </p>
                        <h3> $${item*search.price}</h3>
                            </h4>
                            <i class="bi bi-bag-x"></i>
                    </div>
                    
                    <div class="button">
                        <i onclick="dicrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    
                    </div>

                    </div>
                       
                    </div>
                </div>
            
            `
        }).join("");
    }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Go Back to Home</button>
        </a>
        `
    }
};







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
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(basket));
} 

let update = (id) => {
    let search = basket.find((x) => x.id === id);
   document.getElementById(id).innerHTML = search.item;
   cartSum();
   
}
generateCartItems()