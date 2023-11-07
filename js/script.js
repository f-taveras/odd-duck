const productsContainer = document.getElementById("productsContainer");
const statsContainer = document.getElementById("statsContainer")


const img1 = document.querySelector('#productsContainer img:first-child');
const img2 = document.querySelector('#productsContainer img:nth-child(2)');
const img3 = document.querySelector('#productsContainer img:nth-child(3)');

const button = document.getElementById('showStats');

let state = {
    currentClicks: 0,
    maxClicks: 25,
    allProducts: [],
};

function Products(name, image){
    this.name = name,
    this.imageSrc = image,
    this.votes = 0,
    this.views = 0,
    state.allProducts.push(this);
    Products.currentlyConsidered = [];
}

Products.currentlyConsidered = [];





console.log(this.votes)
function renderProducts(){

    function productRandomizer(){
        return Math.floor(Math.random() * state.allProducts.length)
    }

    let product1 = productRandomizer();
    let product2 = productRandomizer();
    let product3 = productRandomizer();
    
    
    while (product1 === product2){
        product2 = productRandomizer();
        
    }
    while (product1 === product3 || product2 === product3){
        product3 = productRandomizer();
    }

    img1.src = state.allProducts[product1].imageSrc;
    img1.alt = state.allProducts[product1].name

    img2.src = state.allProducts[product2].imageSrc;
    img2.alt = state.allProducts[product2].name

    img3.src = state.allProducts[product3].imageSrc;
    img3.alt = state.allProducts[product3].name
    
}

function renderStatsButton(){

    button.style.display = 'block';
}

function renderStats() {
   
    statsContainer.innerHTML = '';
  
    state.allProducts.forEach(product => {
      const productStats = document.createElement('p');
      productStats.textContent = `${product.name} - Votes: ${product.votes}, Views: ${product.views}`;
      statsContainer.appendChild(productStats);
    });
  }

function clickEvent(event){
    let productName = event.target.alt;

    for (let i = 0; i< state.allProducts.length; i++){
        if( productName === state.allProducts[i].name){
            state.allProducts[i].votes++;
            state.allProducts[i].views++;
            break;
        }

    }

    state.currentClicks++;
    
    

    if(state.currentClicks >= state.maxClicks){
        removeListener();
        renderStatsButton();

    }else{
        renderProducts();
    }
}

function allListener(){


    productsContainer.addEventListener("click", clickEvent);
    button.addEventListener("click",renderStats)
    


}

function removeListener(){
    productsContainer.removeEventListener('click', clickEvent)
}


new Products("bag", "img/bag.jpg");
new Products("banana", "img/banana.jpg");
new Products("bathroom", "img/bathroom.jpg");
new Products("boots", "img/boots.jpg");
new Products("breakfast", "img/breakfast.jpg");
new Products("bubblegum", "img/bubblegum.jpg");
new Products("chair", "img/chair.jpg");
new Products("cthulhu", "img/cthulhu.jpg");
new Products("dog-duck", "img/dog-duck.jpg");
new Products("dragon", "img/dragon.jpg");
new Products("pen", "img/pen.jpg");
new Products("pet-sweep", "img/pet-sweep.jpg");
new Products("scissors", "img/scissors.jpg");
new Products("shark", "img/shark.jpg");
new Products("sweep", "img/sweep.png");
new Products("tauntaun", "img/tauntaun.jpg");
new Products("unicorn", "img/unicorn.jpg");
new Products("water-can", "img/water-can.jpg");
new Products("wine-glass","img/wine-glass.jpg");


renderProducts();
allListener();

