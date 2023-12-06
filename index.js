import { menuArray } from './data.js'

// Create main menu
renderMenu()
addEventListeners()

let orderedItems = []


// render main menu
function renderMenu(){
    const menuEl = document.getElementById('menu')
    const menuHtml = menuArray.map(menuItem => {
        return `
        <div class="menu-item">
            <div class="menu-text">
                <div class="emoji">
                    ${menuItem.emoji}
                </div>
                <div class="description">
                    <h2>${menuItem.name}</h2>
                    <p>${menuItem.ingredients.join(',')}</p>
                    <h3>$${menuItem.price}</h3>
                </div>
            </div>
            <button type="button" class="add-button" data-name="${menuItem.name}"> + </button>
        </div>`
    }).join('')
    menuEl.innerHTML = menuHtml
}

function renderCheckout(){
    const checkoutEl = document.getElementById('checkout')
    let checkoutHtml = '';

    if (orderedItems.length > 0)
    {
        checkoutHtml = `<h1>Your order</h1>`
        orderedItems.forEach(item => {
            checkoutHtml += `
            <div class="row-item">
                <div class="left">
                    <h2>${item.name}</h2>
                    <button type="button" class="remove-button" data-name="${item.name}">remove</button>
                </div>
                <h3>$${item.price}</h3>
            </div>`
        })

        checkoutHtml += `
        <div class="row-item" id="total-row">
            <h2>Total price:</h2>\
            <h3>$${orderedItems.reduce((total, currentItem) => total + currentItem.price, 0)}</h3>
        </div>
        <button id="complete-button">Complete order</button>
        `
    }

    checkoutEl.innerHTML = checkoutHtml
    addEventListeners()
}

function addEventListeners(){
    const addButtons = document.getElementsByClassName('add-button')
    const removeButtons = document.getElementsByClassName('remove-button')
    const completeButton = document.getElementById('complete-button')

    Array.from(addButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            let item = menuArray.find(x => x.name === e.target.dataset.name)
            if (!orderedItems.includes(item)){
                orderedItems.push(item)
                renderCheckout()
            }
        })
    })

    Array.from(removeButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            let idx = orderedItems.findIndex(x => x.name === e.target.dataset.name)
            orderedItems.splice(idx, 1)
            renderCheckout()
        })
    })

    if (completeButton){
        completeButton.addEventListener('click', () => {
            console.log('complete!')
        })
    }
}


