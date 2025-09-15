const container = document.querySelector('.container');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateCounter() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat =>
    [...document.querySelectorAll('.row .seat:not(.occupied)')].indexOf(seat)
  );

  const selectedCount = selectedSeats.length;
  count.textContent = selectedCount;
  total.textContent = selectedCount * ticketPrice;

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
  const allSeats = document.querySelectorAll('.row .seat:not(.occupied)');
  allSeats.forEach((seat, i) => {
    if (selectedSeats.includes(i)) seat.classList.add('selected');
  });

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = +movieSelect.value;
  }
}

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateCounter();
  }
});

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCounter();
});

populateUI();
updateCounter();
