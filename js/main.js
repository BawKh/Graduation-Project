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
/* top catagories */

// let leftButt = document.querySelector(".catagories-sec .left");
// let rightButt = document.querySelector(".catagories-sec .right");
// let CatBullets = document.querySelectorAll(
//   ".catagories-sec .span-pullets span"
// );
// let CatContainer = document.querySelector(".catagories-sec .cat-body ");
// CatBullets.forEach((el, index) => {
//   el.style.order = [3, 2, 1, 0][index];
// });
// let catCount = 1;
// function Slider_Cat() {
//   leftCount = 1;
//   rightCount = 1;
//   leftButt.addEventListener("click", () => {
//     rightButt.classList.remove("stope");
//     let catagoriesCon = document.querySelectorAll(
//       ".catagories-sec .cat-body .box"
//     );
//     CatArr = Array.from(catagoriesCon);
//     if (catagoriesCon.length - catCount > 6) {
//       CatContainer.style.left = `-${
//         (CatArr[0].offsetWidth + 20) * leftCount
//       }px`;
//       leftCount++;
//       catCount++;
//       spanSlide(catCount);
//     }
//     if (catagoriesCon.length - catCount == 6) {
//       leftButt.classList.add("stope");
//       leftCount = 1;
//     }
//   });
//   rightButt.addEventListener("click", () => {
//     leftButt.classList.remove("stope");
//     let catagoriesCon = document.querySelectorAll(
//       ".catagories-sec .cat-body .box"
//     );
//     if (
//       catagoriesCon.length - catCount >= 6 &&
//       catagoriesCon.length - catCount < catagoriesCon.length
//     ) {
//       CatArr = Array.from(catagoriesCon);
//       CatContainer.style.left = `${
//         (CatArr[0].offsetWidth + 20) * rightCount
//       }px`;
//       catCount--;
//       spanSlide(catCount);
//     }
//     if (catagoriesCon.length - catCount == catagoriesCon.length) {
//       rightButt.classList.add("stope");
//       rightCount = 1;
//     }
//   });
// }
// Slider_Cat();
// function spanSlide(catCount) {
//   CatBullets.forEach((el, index) => {
//     if (index == catCount) {
//       CatBullets.forEach((el) => el.classList.remove("active"));
//       el.classList.add("active");
//     }
//   });
// }
// let elements = document.querySelectorAll(".our-instructors .instructor");
// elements = Array.from(elements);
// elements.forEach((el, index) => (el.style.order = index + 1));

// let my = setInterval(function () {
//   let elements = document.querySelectorAll(".our-instructors .instructor");
//   elements = Array.from(elements);
//   let orders = [1, 2, 3, 4, 5];
//   elements.forEach((ele,index) => {
//     if (ele.style.order <= elements.length) {
//       ele.style.order = orders[index];
//     } else {
//         orders[]
//       clearInterval(my);
//     }
//     console.log(ele.style.order);
//   });
// }, 1000);
