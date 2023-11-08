const showChartButton = document.getElementById('showChartButton');
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

function renderProducts() {
    function productRandomizer(exclude) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * state.allProducts.length);
        } while (exclude.includes(randomIndex));
        return randomIndex;
    }

    let productIndices = [];
    let product1, product2, product3;

    product1 = productRandomizer(productIndices);
    productIndices.push(product1);

    product2 = productRandomizer(productIndices);
    productIndices.push(product2);

    product3 = productRandomizer(productIndices);
    productIndices.push(product3);

    img1.src = state.allProducts[product1].imageSrc;
    img1.alt = state.allProducts[product1].name;
    state.allProducts[product1].views++;

    img2.src = state.allProducts[product2].imageSrc;
    img2.alt = state.allProducts[product2].name;
    state.allProducts[product2].views++;

    img3.src = state.allProducts[product3].imageSrc;
    img3.alt = state.allProducts[product3].name;
    state.allProducts[product3].views++;
}

function renderStatsButton(){

    button.style.display = 'flex';
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
        // renderStatsButton();
        renderChartButton();

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

// ---------------------------- Chart -----------------------------------------



function renderChart() {
    const productNames = state.allProducts.map(product => product.name);
    const voteTotals = state.allProducts.map(product => product.votes);
    const viewCounts = state.allProducts.map(product => product.views);
    const ctx = document.getElementById('myChart'); //.getContext('2d');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Votes',
            data: voteTotals,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Views',
            data: viewCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
 
 
 function renderChartButton(){
     showChartButton.classList.remove('hidden')
}

showChartButton.addEventListener('click', showChart);


function showChart() {
    const chartCanvas = document.getElementById('myChart');
    chartCanvas.classList.remove('hidden');
    

    renderChart();
}


