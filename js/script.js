// const URL = 'https://fakestoreapi.com/products?limit=3'
let f = ['electronics','jewelery',"men's clothing","women's clothing"];

let categoryItem = '';

// получние продукта 
const getProduct = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        createProduct(data)
        console.log(data)
        searchItems(data)
    } catch (error) {
        console.log(error)
    }
}

// create product
const createProduct = (data) => {
    const wrapperItems = document.querySelector('.content__items')
    data.map(product => {
        return wrapperItems.innerHTML += `
            <div class="content__items-item" data-category="${product.category}">
                <img src="${product.image}" alt="">
                <h2>${product.title}</h2>
                <h5>${product.price}$</h5>
            </div>
        `
    })
}

// view all
const viewAll = () => {
    const btnViewAll = document.querySelector('.content__viewAll')
    btnViewAll.addEventListener('click',() => {
        const wrapperItems = document.querySelector('.content__items')
        btnViewAll.classList.toggle('viewActive')
        wrapperItems.innerHTML = ``
        if(btnViewAll.className === 'content__viewAll viewActive'){
            getProduct('https://fakestoreapi.com/products?limit=10')
        }else {
            getProduct('https://fakestoreapi.com/products?limit=6')
            btnViewAll.innerHTML = 'Закрыть'
            btnViewAll.classList.remove('viewActive')
        }
})
}

// category 

const categoryProduct = (data) => {
    const wrapperItems = document.querySelector('.content__items');
    const categoriesAll = document.querySelectorAll('.navigation__categoryBtn')
    categoriesAll.forEach(category => {
        category.addEventListener('click',(e)=> {
            wrapperItems.innerHTML='';
            category.classList.add('activeBtn')
            if(e.target.dataset.category === 'all'){
                getProduct('https://fakestoreapi.com/products?limit=6')
            }else{
                getProduct(`https://fakestoreapi.com/products/category/${e.target.dataset.category}`)
            }
        })
    })
}

const searchItems = (data) => {
    const input = document.querySelector('#input')
        input.oninput = (e) => {
        const wrapperItems = document.querySelector('.content__items')
        wrapperItems.innerHTML = ``
        const value = e.target.value;
        let f = ['electronics','jewelery',"men's clothing","women's clothing"];
        data.filter(item => item.category === f[0] || item.category === f[1] || item.category === f[2] || item.category === f[3]).filter(item => item.title.toLowerCase().includes(value.toLowerCase())).forEach(item => {
            wrapperItems.innerHTML += `
                    <div class="content__items-item" data-category="${item.category}">
                        <img src="${item.image}" alt="">
                        <h2>${item.title}</h2>
                        <h5>${item.price}</h5>
                    </div>
                `
        })
    }
}

getProduct('https://fakestoreapi.com/products?limit=6')
searchItems()
categoryProduct()
viewAll()
