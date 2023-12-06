export function renderOrderHistory(orders){
    const historyEl = document.getElementById('order-history')
    let historyHtml = `
    <div class="close-modal-btn-container">
		<button class="modal-close-btn" id="modal-close-btn" data-close="true">X</button>
	</div>
    <h1>Order History</h1>`
    orders.forEach(orderObj => {
        let itemId = orderObj[0]
        let order = orderObj[1]
        historyHtml += `
            <div class="order-row">
                <button class="delete-btn" id="delete-btn" data-remove="${itemId}">X</button>
                <h2>${order.name}'s orders:</h2>
                ${order.items.map(item => `<h2>${item.emoji}</h2>`).join('')}
            </div>
        `
    })

    historyEl.innerHTML = historyHtml
}