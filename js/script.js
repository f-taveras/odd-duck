
const statsContainer = document.getElementById("statsContainer")
const img1 = document.querySelector('#productsContainer img:first-child');
const img2 = document.querySelector('#productsContainer img:nth-child(2)');
const img3 = document.querySelector('#productsContainer img:nth-child(3)');
const button = document.getElementById('showStats');



function Appstate(){
  this.allProducts = [];
}

Appstate.prototype.createProduct = function (){
  const productNames =  ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
  
  for (let i = 0; i < productNames.length; i++)
  this.allProducts.push(new Product(productNames[i]));

}


Appstate.prototype.saveToLocalStorage = function () {
  localStorage.setItem('productsData', JSON.stringify(this.allProducts));
}

Appstate.prototype.loadItems = function (){
  const productInfoString = localStorage.getItem('productsData');

  if (productInfoString) {
    this.allProducts = JSON.parse(productInfoString);
      } else {
        this.createProduct();
      }
}

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.source = `../img/${name}.${fileExtension}`;
  this.timesClicked = 0;
  this.views = 0;
}




let MaxVotes = 25;
let allProductArray = [];

let imgElements = document.querySelectorAll('img')
let imgContainer = document.querySelector('section')


let state = new Appstate()
state.loadItems();


function generateRandomProduct(){
  return Math.floor(Math.random() * state.allProducts.length);
}

function renderProductImages(){
while (allProductArray.length < 6){
  let randomProductIndex = generateRandomProduct();
  if (!allProductArray.includes(randomProductIndex)){
    allProductArray.push(randomProductIndex);
  }
}

for (let i = 0; i < imgElements.length; i++){
  let randomIndex = allProductArray.shift()


  imgElements[i].src = state.allProducts[randomIndex].source
  imgElements[i].title = state.allProducts[randomIndex].name
  imgElements[i].alt = state.allProducts[randomIndex].name
  state.allProducts[randomIndex].views++;

}
}

renderProductImages();
imgContainer.addEventListener('click', clickEvent);





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
  if (MaxVotes > 0) {
    let imageClicked = event.target.alt;

    for (let i = 0; i < state.allProducts.length; i++) {
      if (imageClicked === state.allProducts[i].name) {
        state.allProducts[i].timesClicked++;
        MaxVotes--;

        if (MaxVotes === 0) {
          imgContainer.removeEventListener('click', clickEvent);
          state.saveToLocalStorage();
          renderChartButton();
        }

        renderProductImages();
        break;
      }

    }
  }
}

function allListener(){


    productsContainer.addEventListener("click", clickEvent);
    button.addEventListener("click",renderStats)
    


}

function removeListener(){
    productsContainer.removeEventListener('click', clickEvent)
}

function initialize() {
  
  loadProductsFromLocalStorage();

  if (state.allProducts.length === 0) {
      instantiateProducts();
      
      saveProductsToLocalStorage();
  }

  

  
  renderProducts();
}


allListener();

// ---------------------------- Chart -----------------------------------------



function renderChart() {
  const productNames = state.allProducts.map(product => product.name);
  const voteTotals = state.allProducts.map(product => product.timesClicked);
  const viewCounts = state.allProducts.map(product => product.views);
  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: 'Votes',
          data: voteTotals,
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 1,
        },
        {
          label: 'Views',
          data: viewCounts,
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          ticks: {
            color: 'black',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            fontColor: 'black',
          },
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
    const chartCanvas = document.getElementById('statsContainer');
    chartCanvas.classList.remove('hidden');
    

    renderChart();
  }

function saveProductsToLocalStorage() {
  const productsJSON = JSON.stringify(state.allProducts);
  localStorage.setItem('productsData', productsJSON);
}

function loadProductsFromLocalStorage() {
  const storedProductsJSON = localStorage.getItem('productsData');
  if (storedProductsJSON) {
      state.allProducts = JSON.parse(storedProductsJSON);
  }
}