function AppState() {
    this.allProducts = [];
  }
  
  AppState.prototype.instantiateProducts = function () {
    const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
  
    for (let i = 0; i < productNames.length; i++) {
      if (productNames[i] === 'sweep') {
        this.allProducts.push(new Product(productNames[i], 'png'))
      } else {
        this.allProducts.push(new Product(productNames[i]))
      }
    }
  }
  
  AppState.prototype.saveToLocalStorage = function () {
  
    localStorage.setItem('productsData', JSON.stringify(this.allProducts));
  }
  
  AppState.prototype.loadItems = function () {
  
    const productsDataString = localStorage.getItem('productsData');
  
    if (productsDataString) {
      this.allProducts = JSON.parse(productsDataString);
    } else {
  
      this.instantiateProducts();
    }
  }
  
  function Product(name, fileExtension = 'jpg') {
    this.name = name;
    this.source = `../img/${name}.${fileExtension}`;
    this.timesClicked = 0;
    this.timesShown = 0;
  }
  



let votingRounds = 25;
let productIndexArray = [];

let imgElements = document.querySelectorAll('img');
let imgContainer = document.querySelector('section');


let state = new AppState();
state.loadItems();

function generateRandomProduct() {
  return Math.floor(Math.random() * state.allProducts.length);
}

function renderProductImages() {

  while (productIndexArray.length < 6) {
    let randomProductIndex = generateRandomProduct();
    if (!productIndexArray.includes(randomProductIndex)) {
      productIndexArray.push(randomProductIndex);
    }
  }

  for (let i = 0; i < imgElements.length; i++) {
    let randomIndex = productIndexArray.shift()

    imgElements[i].src = state.allProducts[randomIndex].source
    imgElements[i].title = state.allProducts[randomIndex].name
    imgElements[i].alt = state.allProducts[randomIndex].name
    state.allProducts[randomIndex].timesShown++;
  }
}

function handleImageClick(event) {
  let imageClicked = event.target.title;

  for (let i = 0; i < state.allProducts.length; i++) {
    if (imageClicked === state.allProducts[i].name) {
      state.allProducts[i].timesClicked++;
      votingRounds--;
      renderProductImages();
    }

    if (votingRounds === 0) {
      imgContainer.removeEventListener('click', handleImageClick);
      state.saveToLocalStorage();
    }
  }
}

renderProductImages();
imgContainer.addEventListener('click', handleImageClick);


let canvasElem = document.getElementById('chart');

function renderChart() {
 
  const appState = new AppState();

  
  appState.loadItems();

 
  const productNames = appState.allProducts.map(product => product.name);
  const voteTotals = appState.allProducts.map(product => product.timesClicked);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Votes',
        data: voteTotals,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

 
  new Chart(canvasElem, config);
}

renderChart();


  