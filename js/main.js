/* ///////////////////// Map ///////////////////// */
let map;
// get the coordinates
navigator.geolocation.getCurrentPosition(function (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coords = [latitude, longitude];
  map = L.map("map").setView(coords, 13);
  // the marker
  let marker = L.marker(coords).addTo(map);
  // the popup on the marker
  marker
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "popup",
      })
    )
    .setPopupContent("We're From Here 🏠")
    .openPopup();
  // a style from leaflet for the map
  L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
});
/* ///////////////////// Map END///////////////////// */

/* ///////////////////// search box///////////////////// */
let openSearchBox = document.querySelector(".open-search-box");
let closeSearchBox = document.querySelector(".close-search-box");
let searchBox = document.querySelector(".search-box");
openSearchBox.addEventListener("click", function () {
  searchBox.classList.add("active");
});
closeSearchBox.addEventListener("click", function () {
  searchBox.classList.remove("active");
});
/* ///////////////////// search box END///////////////////// */
// Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
// slider buttons
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
let maxSlide = slides.length;
slider.addEventListener("click", function (e) {
  const clicks = e.target.classList.contains("slider__btn");

  if (!clicks) return;
  if (clicks) {
  }
});
slides.forEach((el, i) => {
  el.style.transform = `translateX(${100 * i}%)`;
});
const goToSlide = function (slide) {
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") prevSlide();
  if (e.key == "ArrowRight") nextSlide();
});
/* top catagories */

let leftButt = document.querySelector(".catagories-sec .left");
let rightButt = document.querySelector(".catagories-sec .right");
let CatBullets = document.querySelectorAll(
  ".catagories-sec .span-pullets span"
);
let CatContainer = document.querySelector(".catagories-sec .cat-body ");
let catCount = 0;
function Slider_Cat() {
  let step = 0;
  leftButt.addEventListener("click", () => {
    let me = Math.ceil(CatContainer.offsetWidth / 9);
    rightButt.classList.remove("stope");
    let catagoriesCon = document.querySelectorAll(
      ".catagories-sec .cat-body .box"
    );

    if (
      catagoriesCon.length - catCount >= 6 &&
      catagoriesCon.length - catCount < catagoriesCon.length
    ) {
      step += me;
      CatContainer.style.transform = `translateX(${step}px)`;
      catCount--;
      spanSlide(catCount);
    }
    console.log(catCount);
    if (catagoriesCon.length - catCount == catagoriesCon.length) {
      leftButt.classList.add("stope");
    }
  });
  rightButt.addEventListener("click", () => {
    let me = Math.ceil(CatContainer.offsetWidth / 9);
    leftButt.classList.remove("stope");
    let catagoriesCon = document.querySelectorAll(
      ".catagories-sec .cat-body .box"
    );
    if (catagoriesCon.length - catCount > 6) {
      step -= me;
      CatContainer.style.transform = `translateX(${step}px)`;
      catCount++;
      spanSlide(catCount);
    }
    console.log(catCount);
    if (catagoriesCon.length - catCount == 6) {
      rightButt.classList.add("stope");
    }
  });
}
Slider_Cat();
function spanSlide(catCount) {
  CatBullets.forEach((el, index) => {
    if (index == catCount) {
      CatBullets.forEach((el) => el.classList.remove("active"));
      el.classList.add("active");
    }
  });
}

let elements = document.querySelectorAll(".our-instructors .instructor");
elements = Array.from(elements);
// // elements.forEach((el, index) => ();
// let instructorsIndex = 0;
// // let instructorSign = "+" ;
// let my = setInterval(function () {
//   let elements = document.querySelectorAll(".our-instructors .instructor");
//   elements = Array.from(elements);
//   let orders = [1, 2, 3, 4];
//   if (instructorsIndex == 0 && instructorsIndex < orders.length) {
//     instructorsIndex++;
//   } else if (instructorsIndex == 3) {
//     instructorsIndex = 0;
//   }
// }, 1000);

// function Slider_inst(instructorSign) {
//     if (instructorSign == "+" ) {
//         orders[instructorsIndex];
//         instructorsIndex++;
//     }
// }

/* How To Set The Width By Js */
// let inst_body = document.querySelector(".our-instructors .inst-body");
// console.log(inst_body);
// inst_body.style.width = `${
//   elements[0].offsetWidth * elements.length + 20 * (elements.length - 1)
// }px`;
