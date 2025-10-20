const paymentTypes = document.querySelector('.payment-method-selectors');
const cardPaymentSelector = paymentTypes.querySelector('#card-payment-selector');
const paypalPaymentSelector = paymentTypes.querySelector('#paypal-payment-selector');
const cardPaymentCard = document.querySelector('.card-payment-card');
const paypalPaymentCard = document.querySelector('.paypal-payment-card');

cardPaymentSelector.addEventListener ('click', () => highlight(cardPaymentCard));
paypalPaymentSelector.addEventListener ('click', () => highlight(paypalPaymentCard));

function highlight(target) {
    console.log('click')
    paypalPaymentCard.classList.remove('selected')
    cardPaymentCard.classList.remove('selected')
    target.classList.add('selected')
}