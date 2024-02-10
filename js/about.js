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
let Test_Body = document.querySelector(".testimonials-about .members .body");
let Test_Body_m = document.querySelectorAll(
  ".testimonials-about .members .body .member"
);
let Test_Member = document.querySelectorAll(
  ".testimonials-about .members .persones .person"
);

Test_Member = Array.from(Test_Member);
Test_Body_m = Array.from(Test_Body_m);
// let chosen = Test_Body_m.filter((ele) => {
//   return ele.classList.contains("move-l" || "move-r") == false;
// });
// console.log(chosen);
Test_Member.forEach((el) => {
  el.addEventListener("click", () => {
    // let chosen = Test_Member.filter((ele) => {
    //   return ele.classList.contains("active");
    // });
    // let MyMember = Test_Body_m.filter((ele) => {
    //   return ele.dataset.count == chosen[0].dataset.count;
    // });
    // console.log(chosen);
    Test_Member.forEach((el) => el.classList.remove("active"));
    el.classList.add("active");
    Test_Body.style.transform = `translateX(-${(el.dataset.count - 1) * 33}%)`;
  });
});
