export function renderModal(){
    const modalEl = document.getElementById('modal')
    const modalHtml = `
        <h1>Enter card details</h1>
        <form id="modal-form">
            <input type="text" name="name" placeholder="Enter your name" required/>
            <input type="text" name="cardNumber" placeholder="Enter card number" required/>
            <input type="text" name="cvv" placeholder="Enter CVV" required/>
            <button type="submit" class="pay-button" id="pay-button" data-pay="true"> Pay </button>
        </form>
        `

    modalEl.innerHTML = modalHtml;
}