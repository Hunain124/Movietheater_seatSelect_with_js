const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
let count = document.querySelector('#count');
let total = document.querySelector('#total');
let movieSelect = document.querySelector('#movie');

let ticketPrice = +movieSelect.value;

// My Functions

// update counter
function updateCounter() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    let selectSeatsCount = selectedSeats.length;
    count.textContent = selectSeatsCount;
    total.textContent = selectSeatsCount * ticketPrice;
}

// Event listener for seats
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateCounter();
    }
})

// Events listener for movies dropdown
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateCounter();
})