const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");

const span = document.getElementById("addProductSpan");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// FAVORITES PART
const favoritesModal = document.getElementById("favoritesModel");

const favoritesBtn = document.getElementById("favoritesBtn");

const favoritesSpan = document.getElementById("favoritesSpan");

favoritesBtn.onclick = function () {
  favoritesModal.style.display = "block";
};

favoritesSpan.onclick = function () {
  favoritesModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    favoritesModal.style.display = "none";
  }
};
