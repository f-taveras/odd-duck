const productsContainer = document.getElementById("productsContainer");
const statsContainer = document.getElementById("statsContainer")


const img1 = document.querySelector('#products img:first-child');
const img2 = document.querySelector('#products img:nth-child(2)');
const img3 = document.querySelector('#products img:nth-child(3)');

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
}

function renderProducts(){

    function productRandomizer(){
        return Math.floor(Math.random() * state.allProducts.length)
    }

    let product1 = productRandomizer();
    let product2 = productRandomizer();
    let product3 = productRandomizer();
    
    // this only randomizes 2 of them, have to come back to it
    while (product1 === product2){
        product2 = productRandomizer();
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

function rederStats(){
    console.log("stats");
}

function clickEvent(event){
    let productName = event.target.alt;

    for (let i = 0; i< state.allProducts.length; i++){
        if( productName === state.allProducts[i].name){
            state.allProducts[i].votes++;
            break;
        }
    }

    state.currentClicks++;

    if(state.currentClicks >= state.maxClicks){
        removeEventListener();
        renderStatsButton();

    }else{
        renderProducts();
    }
}

function allListener(){
    
}