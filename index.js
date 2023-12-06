import { menuArray } from './data.js'
import { renderModal } from './modal.js'
import { renderOrderHistory } from './order-history.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

let orderedItems = []

// set up database
const appSettings = {
    databaseURL: "https://playground-17d54-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ordersInDB = ref(database, "orders")

onValue(ordersInDB, function(snapshot) {
    if (snapshot.exists()) {
        let ordersArray = Object.entries(snapshot.val()).map(entry => entry[1])
        console.log(ordersArray)
        renderOrderHistory(ordersArray)
    } else {
        document.getElementById('order-history').innerHTML = "No orders... yet"
    }
})

// Create main menu
renderMenu()
renderCheckout()
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
    } else {
        checkoutHtml = `<button type="button" class="history-button" data-history="true">Order History</button>`
    }

    checkoutEl.innerHTML = checkoutHtml
}

function renderConfirmation(name){
    document.getElementById('checkout').innerHTML = `
        <h1 class="confirmation">Thanks, ${name}! Your order is on its way!</h1>
    `;

    setTimeout(() => renderCheckout(), 5000)
}

function addEventListeners(){
    const menuEl = document.getElementById('menu')
    const checkoutEl = document.getElementById('checkout')
    const historyEl = document.getElementById('order-history')
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
            document.getElementById('modal').style.display = "flex";
        }

        if (e.target.dataset.history){
            historyEl.style.display = "flex";
        }
    })

    historyEl.addEventListener('click', function(e){
        if (e.target.dataset.close){
            historyEl.style.display = "none";
        }
    })

    modalForm.addEventListener('submit', function(e){
        e.preventDefault()
        document.getElementById('modal').style.display = "none";
        const modalFormData = new FormData(modalForm)

        const order = {
            items: orderedItems,
            name: modalFormData.get('name'),
        }
        push(ordersInDB, order)
        renderConfirmation(modalFormData.get('name'))
        orderedItems = []
        modalForm.reset()
    })
}


