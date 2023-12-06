import { menuArray } from './data.js'
import { renderModal } from './modal.js'

let orderedItems = []

// Create main menu
renderMenu()
renderModal()
addEventListeners()

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
            <button type="button" class="add-button" data-addname="${menuItem.name}"> + </button>
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
                    <button type="button" class="remove-button" data-removename="${item.name}">remove</button>
                </div>
                <h3>$${item.price}</h3>
            </div>`
        })

        checkoutHtml += `
        <div class="row-item" id="total-row">
            <h2>Total price:</h2>\
            <h3>$${orderedItems.reduce((total, currentItem) => total + currentItem.price, 0)}</h3>
        </div>
        <button id="complete-button" data-complete="true">Complete order</button>
        `
    }

    checkoutEl.innerHTML = checkoutHtml
}

function renderConfirmation(name){
    document.getElementById('checkout').innerHTML = `
        <h1 class="confirmation">Thanks, ${name}! Your order is on its way!</h1>
    `;
}

function addEventListeners(){
    const menuEl = document.getElementById('menu')
    const checkoutEl = document.getElementById('checkout')
    const modalForm = document.getElementById('modal-form')

    menuEl.addEventListener('click', function(e){
        if (e.target.dataset.addname){
            let item = menuArray.find(x => x.name === e.target.dataset.addname)
            if (!orderedItems.includes(item)){
                orderedItems.push(item)
                renderCheckout()
            }
        }
    })

    checkoutEl.addEventListener('click', function(e){
        if (e.target.dataset.removename){
            let idx = orderedItems.findIndex(x => x.name === e.target.dataset.name)
            orderedItems.splice(idx, 1)
            renderCheckout()
        }

        if (e.target.dataset.complete){
            const modalEl = document.getElementById('modal')
            modalEl.style.display = "flex";
        }
    })

    modalForm.addEventListener('submit', function(e){
        e.preventDefault()

        const modalEl = document.getElementById('modal')
        modalEl.style.display = "none";
        const modalFormData = new FormData(modalForm)
        renderConfirmation(modalFormData.get('name'))
        orderedItems = []
    })
}


