let countries = []
let AllCountries = [];


// получние продукта 
const getProduct = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        countries = data
        getAllCounries(countries)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}


const getAllCounries = (data) => {
    AllCountries = data.slice(0,data.length - 230);
    countries = AllCountries.slice(0, AllCountries.length - 14);
    console.log(countries)
    viewAll(AllCountries)
    searchItems(countries)
    createProduct(countries)
    categoryProduct(AllCountries)
}

// create product

const createProduct = (countries) => {
    console.log(countries)
    const wrapperItems = document.querySelector('.content__items')
    countries.forEach(product => {
        wrapperItems.innerHTML += `
            <div class="content__items-item" data-category="${product.category}">
                <img src=${product.flags?.svg} alt="">
                <h2>${product.name?.common}</h2>
                <h5>${product?.capital[0]}</h5>
                ${console.log(product)}
            </div>
        `
    })
}

// view all
const viewAll = (AllCountries) => {
    console.log(AllCountries)
    const btnViewAll = document.querySelector('.content__viewAll')
    btnViewAll.addEventListener('click',() => {
        const wrapperItems = document.querySelector('.content__items')
        btnViewAll.classList.toggle('viewActive')
        wrapperItems.innerHTML = ``
        createProduct(AllCountries)
        if(btnViewAll.className === 'content__viewAll viewActive'){
            btnViewAll.innerHTML = 'Показать все'
            createProduct(AllCountries)
        }
})
}

const searchItems = (countries) => {
    const input = document.querySelector('#input')
        input.oninput = (e) => {
        const wrapperItems = document.querySelector('.content__items')
        wrapperItems.innerHTML = ``
        const value = e.target.value
        countries.filter(item => item.name.common.includes(value)).forEach(product => {
            wrapperItems.innerHTML += `
            <div class="content__items-item" data-category="${product.category}">
                <img src=${product.flags?.svg} alt="">
                <h2>${product.name?.common}</h2>
                <h5>${product?.capital[0]}</h5>
            </div>
                `
        })
    }
}

getProduct("https://restcountries.com/v3.1/all")
searchItems()
viewAll()
