// получние продукта 
const getProduct = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        createProduct(data)
        searchItems(data)
    } catch (error) {
        console.log(error)
    }
}

// create product
const createProduct = (data) => {
    const wrapperItems = document.querySelector('.content__items')
    data.map(user => {
        return wrapperItems.innerHTML += `
            <div style="padding:20px;" class="content__items-item" data-category="${user.category}">
                <h2>${user.name.firstname} ${user.name.lastname}</h2>
                <h5>${user.phone}$</h5>
                <h5>${user.email}$</h5>
            </div>
        `
    })
}

// view all
const viewAll = () => {
    const btnViewAll = document.querySelector('.content__viewAll')
    btnViewAll.addEventListener('click',() => {
        console.log(1)
        const wrapperItems = document.querySelector('.content__items')
        btnViewAll.classList.toggle('viewActive')
        wrapperItems.innerHTML = ``
        if(btnViewAll.className === 'content__viewAll viewActive'){
            getProduct('https://fakestoreapi.com/users?limit=12')
        }else {
            getProduct('https://fakestoreapi.com/users?limit=6')
            btnViewAll.innerHTML = 'Закрыть'
            btnViewAll.classList.remove('viewActive')
        }
})
}

const searchItems = (data) => {
    const input = document.querySelector('#input')
        input.oninput = (e) => {
        const wrapperItems = document.querySelector('.content__items')
        wrapperItems.innerHTML = ``
        const value = e.target.value;
        data.filter(user => user.name.firstname.includes(value)).forEach(user => {
            return wrapperItems.innerHTML += `
                 <div style="padding:20px;" class="content__items-item" data-category="${user.category}">
                 <h2>${user.name.firstname} ${user.name.lastname}</h2>
                 <h5>${user.phone}$</h5>
                 <h5>${user.email}$</h5>
             </div>
                 `
        });
    }
}

getProduct('https://fakestoreapi.com/users?limit=3')
searchItems()
viewAll()
