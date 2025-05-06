const cartBtn = document.getElementById('cart-btn');
const cardSection = document.getElementById('card-section');
const cartSection = document.getElementById('cart-section');
const productsContainer = document.getElementById('products-container');

const totalNumberOfItems = document.getElementById('total-number-of-items');

const itemStock = [
    {
      id: 10001,
      name: "Eraser Box",
      price: 4.99,
      imageLink: "https://media.istockphoto.com/id/1389911660/photo/used-pink-eraser.jpg?s=170667a&w=is&k=20&c=mMWcPiWry0uyQFTHuqKoKStHfA3J_6G2oaeaKpDiRKQ=",
      supply: 10,
      category: "School/Office"
    },
    {
      id: 10002,
      name: "Colored Pens",
      price: 5.99,
      imageLink: "https://media.gettyimages.com/id/1095000846/photo/colorful-pens-on-white-background.jpg?s=612x612&w=gi&k=20&c=LZaGnos7p49WFpvyR08eBT3K81hEZm1mXg-lfSoKw1A=",
      supply: 12,
      category: "School/Office"
    },
    {
        id: 10003,
        name: "Stapler",
        price: 7.99,
        imageLink: "https://media.accobrands.com/media/560-560/15779.jpg",
        supply: 8,
      category: "School/Office"
    },
    {
        id: 10004,
        name: "Staples",
        price: 2.99,
        imageLink: "https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/432255/432255_o01_060321/432255",
        supply: 20,
      category: "School/Office"
    },
    {
        id: 10005,
        name: "2ft Ruler",
        price: 3.49,
        imageLink: "https://m.media-amazon.com/images/I/61gODyXvu-L._AC_UF894,1000_QL80_.jpg",
        supply: 15,
      category: "School/Office"
    },
    {
      id: 10006,
      name: "Black-ink Pens",
      price: 4.49,
      imageLink: "https://images.unsplash.com/photo-1517664121940-f819957bb072?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBpbmt8ZW58MHx8MHx8fDA%3D",
      supply: 20,
      category: "School/Office"
    },
  {
    id: 10007,
    name: "No. 2 Pencils (15 each)",
    price: 3.29,
    imageLink: "https://media.istockphoto.com/id/186851733/photo/pencil.jpg?s=612x612&w=0&k=20&c=58hdaVuswG7PVq8IuEjigZeZvG80qeeF2NF7o6YzqFY=",
    supply: 25,
    category: "School/Office"
  }
];

renderItems = () => {
  cardSection.innerHTML = itemStock.map(el => {
    return `
            <div class="item-card">
                <div class="image-section">
                    ${el.supply === 0 ? `<img class="sold-out" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzdf3DvJkEPf2M35MjOyVyv1qoX2BMCzWkKA&s"/>` : ""}
                    <img class="item-image" src=${el.imageLink} alt=${el.name}/>
                </div>
                <div class="text-section">
                    <h1 class="title">${el.name}</h1>
                    <p class="price">$${el.price}</p>
                    <p class="supply">Supply: ${el.supply}</p>
                </div>
                <button id="buy-${el.id}" onclick=buyItem(${el.id}); ${el.supply === 0 ? "disabled" : ""}>BUY ITEM</button>
            </div>
        `;
  }).join("");
  document.querySelector(".item-card button").addEventListener("pressed", () => {

  });
}
renderItems();
const buy = document.getElementById('buy');
const numberOfItems = document.getElementById('number-of-items');
const numberToBuy = document.getElementById('number-to-buy');
const cancelPurchase = document.getElementById('cancel-purchase');

cartBtn.addEventListener("click", () => {
  cartSection.classList.toggle("hide");
})

const buyItem = (id) => {
    console.log("HIYA");
    numberToBuy.showModal();
    
    numberOfItems.setAttribute("max", itemStock[itemStock.findIndex(el => el.id === id)].supply);
    cancelPurchase.onclick = () => {
        numberToBuy.close();
    }
    console.log("Initial Value before buying:", itemStock[itemStock.findIndex(el => el.id === id)].supply);
    buy.onclick = () => {
        if (Number(numberOfItems.value) > itemStock[itemStock.findIndex(el => el.id === id)].supply){
            alert("Insufficient supply.");
        } else {
        numberToBuy.close();
        purchase(id);
        }
    }
}

const purchase = id => {
    console.log(id);
    console.log("Number to buy:", Number(numberOfItems.value));
    console.log("Initial Value:", itemStock[itemStock.findIndex(el => el.id === id)].supply);
    itemStock[itemStock.findIndex(el => el.id === id)].supply -= Number(numberOfItems.value);
    
    console.log(itemStock[itemStock.findIndex(el => el.id === id)].supply);
    console.log("CLOSE!");
    if (itemStock[itemStock.findIndex(el => el.id === id)].supply === 0){
        document.getElementById(`buy-${id}`).style.cursor = "not-allowed";
        document.getElementById(`buy-${id}`).style.opacity = 0.5;
    }
    renderItems();
}

class Cart{
  constructor(){
    this.productCount = 0;
    this.subtotal = 0;
    this.products = [];
  }
  getProductCount(){
    return this.productCount;
  }
  renderTotal(){
    totalNumberOfItems.textContent = shopCart.getProductCount();
  }
  renderCart(){
    
  }
}

const shopCart = new Cart();

if (shopCart.getProductCount() === 0){
  productsContainer.innerHTML = `
    <p id="empty-notification" class="text-center">You currently have no items.</p>
  `;
}
const renderTotals = () => {
  totalNumberOfItems.textContent = shopCart.getProductCount();
}
renderTotals();


