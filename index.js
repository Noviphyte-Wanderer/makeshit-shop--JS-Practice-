// DOM Initializations.
const cartBtn = document.getElementById('cart-btn');
const cartSection = document.getElementById('cart-section');
const productsContainer = document.getElementById('products-container');

const cardSection = document.getElementById('card-section');
const itemCard = document.querySelector(".itm-card");

const totalNumberOfItems = document.getElementById('total-number-of-items');
const subtotalPrice = document.getElementById('subtotal');
const taxPrice = document.getElementById('tax');
const totalPrice = document.getElementById('total');

// Current Item Catalogue Array
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
    name: "No. 2 Pencils",
    price: 3.29,
    imageLink: "https://media.istockphoto.com/id/186851733/photo/pencil.jpg?s=612x612&w=0&k=20&c=58hdaVuswG7PVq8IuEjigZeZvG80qeeF2NF7o6YzqFY=",
    supply: 25,
    category: "School/Office"
  }
];
// Helper Functions
const floatPrecision = (number) => {
  return parseFloat(number.toFixed(2));
}
const moneyFormat = (number) => {
  return number.toFixed(2);
}

/* Main Part of the Script */
// Renders the Shop's Item Catalogue to the DOM.
renderItems = () => {
  cardSection.innerHTML = "";
  itemStock.forEach(({id, name, imageLink, price, supply}) => {
    cardSection.innerHTML += `
      <div class="item-card">
        <div class="image-section">
          ${supply === 0 ? `<img class="sold-out" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzdf3DvJkEPf2M35MjOyVyv1qoX2BMCzWkKA&s"/>` : ""}
          <img class="item-image" src=${imageLink} alt=${name}/>
        </div>
        <div class="text-section">
          <h1 class="title">${name}</h1>
          <p class="price">$${moneyFormat(price)}</p>
          <p class="supply">Supply: ${supply}</p>
        </div>
        <button id="buy-${id}" onclick=buyItem(${id}); ${supply === 0 ? "disabled" : ""}>BUY ITEM</button>
      </div>
       `;
  });
}
renderItems();

// The shop's DOM references. (Item cards and purchase modal.)
const buyBtn = document.getElementById('buy');
const numberOfItems = document.getElementById('number-of-items');

// Purchase Modal DOM references.
const numberToBuy = document.getElementById('number-to-buy');
const cancelPurchase = document.getElementById('cancel-purchase');

// Cart Button's Interactivity.
cartBtn.addEventListener("click", () => {
  cartSection.classList.toggle("hide");
})

// Buy Item Functionality of Item Card's Buy Button.
const buyItem = (id) => {
    numberToBuy.showModal(); // Shows Purchase Prompt Modal.
    
    numberOfItems.setAttribute("max", itemStock.find(el => el.id === id).supply); // Ensures number input does not exceed current item's current supply.
  
    cancelPurchase.onclick = () => {
      numberToBuy.close();
    }

    // Modal's Buy button interactivity.
    buyBtn.onclick = () => {
      switch (true){
        case (Number(numberOfItems.value) > itemStock.find(el => el.id === id).supply):
          alert("Insufficient supply.");
          break;
        case (Number(numberOfItems.value) === 0):
          numberToBuy.close();
          break;
        case (Number(numberOfItems.value) > 0):
          numberToBuy.close();
          purchase(id);
          break;
        default:
          // Nothing happens. It catches the case where the number is negative.
      }
    }
}

// The actual purchase functionality.
const purchase = id => {
  itemStock.find(el => el.id === id).supply -= Number(numberOfItems.value);
  
  
  // Re-render items with updated values.
  renderItems();
  
  // Renders additional styling to selected item if item is out of supply.
  itemStock.forEach(el => additionalStyling(el.id));
  
  // Adds product to shopping cart.
  shopCart.addProduct(id, Number(numberOfItems.value), itemStock);
}

const additionalStyling = (id) => {
  if (itemStock.find(el => el.id === id).supply === 0){
    
    const buyItemBtnSelected = document.getElementById(`buy-${id}`);
    buyItemBtnSelected.style.cursor = "not-allowed";
    buyItemBtnSelected.style.opacity = 0.2;
  }
}

const clearCartBtn = document.getElementById('clear-cart-btn');
const clearCart = document.getElementById('clear-cart');
const clearBtn = document.getElementById('clear-btn');
const cancelBtn = document.getElementById('cancel-btn');

clearCartBtn.onclick = () => {
  if (shopCart.products.length >= 1){
    clearCart.showModal();
    
    clearBtn.addEventListener("click", () => {
      clearCart.close();
      shopCart.clearCart();
    })
    cancelBtn.addEventListener("click", () => {
      clearCart.close();
    })
  }
};

// Cart Object Blueprint.
class Cart{
  constructor(){
    this.totalItems = 0;
    this.subtotal = 0;
    this.taxRate = 8.50;
    this.total = 0;
    this.products = [];
  }
  
  addProduct(id, numberOfSpecifiedItem, products){
    
    const product = products.find(item => item.id === id);
    const {name, price, imageLink} = product;
    product.itemCount = (product.itemCount || 0) + numberOfSpecifiedItem;
    if (!this.products.find(item => item.id === id)) { 
      this.products.push(product); //Only add product to products array if it is not found in the array at all.
    }
    console.log("Current Selected Item Name: " + name);
    
    const totalCountPerItem = {};
    this.products.forEach(item => {
      totalCountPerItem[item.id] = (totalCountPerItem[item.id] || 0) + numberOfSpecifiedItem;
  });
    
    const currentItemCount = totalCountPerItem[product.id];
    const currentItemCountSpan = document.getElementById(`item-count-span-id${product.id}`);
    
    this.renderCart();

    /* Calculating Totals*/
    this.renderTotal();
  } 

  getTaxPrice(){
    return floatPrecision(this.subtotal * (this.taxRate * 0.01));
  }
  
  renderTotal(){
    this.totalItems = this.products.reduce((acc, el) => acc + el.itemCount, 0);
    this.subtotal = this.products.reduce((acc, el) => floatPrecision(acc + (el.price * el.itemCount)), 0);
    this.total = floatPrecision(this.subtotal + this.getTaxPrice());
    
    totalNumberOfItems.textContent = `${this.totalItems}`;
    subtotalPrice.textContent = `$${moneyFormat(this.subtotal)}`;
    taxPrice.textContent = `$${moneyFormat(this.getTaxPrice())}`;
    totalPrice.textContent = `$${moneyFormat(this.total)}`;
  }
  //Renders products in Cart.
  renderCart(){
    if (shopCart.products.length === 0){
  productsContainer.innerHTML = `
    <p id="empty-notification" class="text-center">You currently have no items.</p>
  `;
    } else {
      productsContainer.innerHTML = "";
    }
    
    this.products.forEach(({name, id, price, imageLink, itemCount}) => {
      productsContainer.innerHTML += `
        <div class="item" id="item-id-${id}">
          <img src="${imageLink}" alt="${name}"/>
          <div class="flex-row item-info-holder">
            <div class="item-info">
              <p class="item-name">${name}</p>
              <p class="flex-row item-quantity">Quantity: 
                
                <button class="increment-number" id="increment-quantity-item-${id}">+</button>
                <span id="item-count-span-id${id}" style="font-size: 2.5rem; vertical-align: center;"><strong>${itemCount}</strong></span><span></span>
                <button class="decrement-number" id="decrement-quantity-item-${id}">-</button>
                
              </p>
              <p>$${moneyFormat(price)} each</p>
            </div>
            <p class="item-purchase-total-price" id="total-item#${id}-price">$${moneyFormat(floatPrecision(itemCount * price))}</p>
          </div>
        </div>
      `;
    });
    this.products.forEach(({id}) => {
      document.querySelector(`#increment-quantity-item-${id}`).onclick = () => this.incrementQuantity(id);
      document.querySelector(`#decrement-quantity-item-${id}`).onclick = () => this.decrementQuantity(id);
    })
  }
  
  /* Clear the Cart of all products.*/
  clearCart(){
    itemStock.forEach(el => {
      if (this.products.find(element => element.id === el.id)){
        el.supply += this.products.find(element => element.id === el.id).itemCount; 
      }
    });
    
    this.products.forEach(el => {
      el.itemCount = 0;  
    });
    renderItems();
    
    this.products = [];
    this.totalItems = 0;
    this.subtotal = 0;
    this.total = 0;
    
    this.renderCart();
    this.renderTotal();
    
  }
  
  incrementQuantity(id){
    console.log("Increment.");
    const product = this.products.find(el => el.id === id);
    if (itemStock.find(el => el.id === id).supply > 0){
      product.itemCount += 1;
      itemStock.find(el => el.id === id).supply -= 1;
      this.renderCart();
      this.renderTotal();
      renderItems();
    }
  }
  decrementQuantity(id){
    console.log("Decrement.");
    const product = this.products.find(el => el.id === id);
    if (product.itemCount > 1){
      product.itemCount -= 1;
      itemStock.find(el => el.id === id).supply += 1;
      this.renderCart();
      this.renderTotal();
      renderItems();
    } else if (product.itemCount === 1){
      alert("Are you sure you want to clear this item from the cart?");
    }
  }
}

const shopCart = new Cart();

shopCart.renderTotal();
shopCart.renderCart();


