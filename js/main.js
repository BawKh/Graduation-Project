/* ///////////////////// Map ///////////////////// */
// let map;
// // get the coordinates
// navigator.geolocation.getCurrentPosition(function (position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     const coords = [latitude, longitude];
//     map = L.map("map").setView(coords, 13);
//     // the marker
//     let marker = L.marker(coords).addTo(map);
//     // the popup on the marker
//     marker
//         .bindPopup(
//             L.popup({
//                 maxWidth: 250,
//                 minWidth: 100,
//                 autoClose: false,
//                 closeOnClick: false,
//                 className: "popup",
//             })
//         )
//         .setPopupContent("We're From Here 🏠")
//         .openPopup();
//     // a style from leaflet for the map
//     L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//         attribution:
//             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);
// });
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
if (slider) {
  slider.addEventListener("click", function (e) {
    const clicks = e.target.classList.contains("slider__btn");

    if (!clicks) return;
    if (clicks) {
    }
  });
}
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
  // activeDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  // activeDot(curSlide);
};
if (btnRight || btnLeft) {
  btnRight.addEventListener("click", nextSlide);

  btnLeft.addEventListener("click", prevSlide);
}

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
function Slider_Cat(eleNum) {
  let step = 0;
  leftButt.addEventListener("click", () => {
    let me = Math.ceil(CatContainer.offsetWidth / 9);
    rightButt.classList.remove("stope");
    let catagoriesCon = document.querySelectorAll(
      ".catagories-sec .cat-body .box"
    );

    if (
      catagoriesCon.length - catCount >= eleNum &&
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
    console.log(step);
  });
  rightButt.addEventListener("click", () => {
    let me = Math.ceil(CatContainer.offsetWidth / 9);
    leftButt.classList.remove("stope");
    let catagoriesCon = document.querySelectorAll(
      ".catagories-sec .cat-body .box"
    );
    if (catagoriesCon.length - catCount > eleNum) {
      step -= me;
      CatContainer.style.transform = `translateX(${step}px)`;
      catCount++;
      spanSlide(catCount);
    }
    // console.log(catCount);
    if (catagoriesCon.length - catCount == eleNum) {
      rightButt.classList.add("stope");
    }
    console.log(step);
  });
}
if (leftButt || rightButt) {
  Slider_Cat(6);
}

function spanSlide(catCount) {
  CatBullets.forEach((el, index) => {
    if (index == catCount) {
      CatBullets.forEach((el) => el.classList.remove("active"));
      el.classList.add("active");
    }
  });
}
// document.body.onresize = function () {
//   CatContainer.style.width = `calc((((${CatContainer.offsetWidth}px + 20px) / 5) * 3) + ${CatContainer.offsetWidth}px)`;
//   let catagoriesCon = document.querySelectorAll(
//     ".catagories-sec .cat-body .box"
//   );
//   catagoriesCon.style.width =
//     "calc(( ${CatContainer.offsetWidth}px - 85px) / 9)";
// };

let MYBlogChange_R = document.querySelector(".blogsHead .bullets .right");
let MYBlogChange_L = document.querySelector(".blogsHead .bullets .left");
let MyBlog_Bullets = document.querySelectorAll(".blogsHead .bullets > *");

function chooseItem(element) {
  element.addEventListener("click", () => {
    if (element.innerHTML == "1" || element == MYBlogChange_L) {
      window.location.href = "blog.html";
    } else if (element.innerHTML == "2" || element == MYBlogChange_R) {
      window.location.href = "blog2.html";
    }
  });
}
MyBlog_Bullets = Array.from(MyBlog_Bullets);
console.log(MyBlog_Bullets);
MyBlog_Bullets.forEach((ele) => {
  console.log(ele.innerHTML);
  chooseItem(ele);
});
let BlogsDiv = [];
fetch("js/blogs.json")
  .then((response) => response.json())
  .then((blogs) => {
    blogs.forEach((ele, index) => {
      let blog = document.createElement("div");
      blog.classList.add("blog");
      let Image = document.createElement("div");
      Image.classList.add("image");
      let img = document.createElement("img");
      img.setAttribute("src", ele.mainImg);
      Image.appendChild(img);
      blog.appendChild(Image);
      let info = document.createElement("div");
      info.classList.add("info");
      let Head = document.createElement("h5");
      Head.innerHTML = ele.name;
      info.appendChild(Head);
      let Paragraph = document.createElement("p");
      Paragraph.innerHTML = ele.title;
      info.appendChild(Paragraph);
      let Date = document.createElement("section");
      Date.innerHTML = ele.date;
      info.appendChild(Date);
      blog.appendChild(info);
      if (document.URL.includes("blog.html") && index < 9) {
        document.querySelector(".blogsHead .blogs").appendChild(blog);
      } else if (document.URL.includes("blog2.html") && index >= 9) {
        document.querySelector(".blogsHead .blogs").appendChild(blog);
      }
    });
    document.querySelectorAll(".blogsHead .blogs > *").forEach((ele) => {
      console.log(ele);
      // console.log(ele.childNodes[1].childNodes[1].innerHTML.trim());
      goToArt(ele);
    });
  });
// console.log(document.querySelectorAll(".blogsHead .blogs > *"));
function goToArt(blg) {
  blg.addEventListener("click", () => {
    sessionStorage.Article = blg.childNodes[1].childNodes[1].innerHTML.trim();
    window.location.href = "articles.html";
  });
}
// curriculum
// let accordions = document.querySelectorAll(".accordion-wrapper .accordion");
// accordions.forEach((acco) => {
//     acco.onclick = () => {
//         accordions.forEach((subcontent) => {
//             subcontent.classList.remove("active");
//         });
//         acco.classList.add("active");
//     };
// });
