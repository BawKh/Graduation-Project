let CurrentArticle;
if (sessionStorage.Article) {
  CurrentArticle = sessionStorage.Article;
} else {
  CurrentArticle =
    "10 marketing trends that you should be prepared for in 2022";
}

function CreateArticle(CurrentArticle) {
  fetch(`js/blogs.json`)
    .then((response) => response.json())
    .then((articles) => {
      articles.forEach((element, index) => {
        if (element.title == CurrentArticle) {
          // But The Root of the Article
          let CurrentArt = document.querySelector(".rootHead section");
          CurrentArt.innerHTML = element.name;
          // Start in the Blog Area
          let ArtAuth = document.querySelector(".articles .head .name");
          ArtAuth.innerHTML = element.name;
          let MainHeader = document.querySelector(".articles .head h1");
          MainHeader.innerHTML = element.title;
          let MainDate = document.querySelector(".articles .head span.date");
          MainDate.innerHTML = element.date;
          let MainImg = document.querySelector(".articles .head .image img");
          MainImg.setAttribute("src", element.mainImg);
          let BookSayQ = document.querySelector(".articles .blg-body h2");
          BookSayQ.innerHTML = element.startQ;
          let P1 = document.querySelector(".articles .blg-body .p1");
          P1.innerHTML = element.paragraph1;
          let Li1 = document.querySelector(
            ".articles .blg-body ul li:first-of-type"
          );
          Li1.innerHTML = element.Points.point1;
          let Li2 = document.querySelector(
            ".articles .blg-body ul li:nth-of-type(2)"
          );
          Li2.innerHTML = element.Points.point2;
          let Li3 = document.querySelector(
            ".articles .blg-body ul li:nth-of-type(3)"
          );
          Li3.innerHTML = element.Points.point3;
          let Li4 = document.querySelector(
            ".articles .blg-body ul li:nth-of-type(4)"
          );
          Li4.innerHTML = element.Points.point4;
          let ExternalMsg = document.querySelector(
            ".articles .blg-body .block-msg p"
          );
          ExternalMsg.innerHTML = element.externalArticle;
          Li4.innerHTML = element.Points.point4;
          let P2 = document.querySelector(".articles .blg-body  .p2");
          P2.innerHTML = element.paragraph2;
          let P3 = document.querySelector(".articles .blg-body  .p3");
          P3.innerHTML = element.paragraph3;
          let P4 = document.querySelector(".articles .blg-body  .p4");
          P4.innerHTML = element.paragraph4;
          let P5 = document.querySelector(".articles .blg-body  .p5");
          P5.innerHTML = element.paragraph5;
          let subImg1 = document.querySelector(
            ".articles .blg-body  .img-cont .one img"
          );
          subImg1.setAttribute("src", element.image1Content.src);
          let subP1 = document.querySelector(
            ".articles .blg-body  .img-cont .one p"
          );
          subP1.innerHTML = element.image1Content.paragraph;
          let subImg2 = document.querySelector(
            ".articles .blg-body  .img-cont .two img"
          );
          subImg2.setAttribute("src", element.image2Content.src);
          let subP2 = document.querySelector(
            ".articles .blg-body  .img-cont .two p"
          );
          subP2.innerHTML = element.image2Content.paragraph;
          let AuthorSecImg = document.querySelector(
            ".articles .contact-blog .image img"
          );
          AuthorSecImg.setAttribute("src", element.Author.img);
          let AuthorSecName = document.querySelector(
            ".articles .contact-blog .info h3"
          );
          AuthorSecName.innerHTML = element.name;
          let AuthorSecInfo = document.querySelector(
            ".articles .contact-blog .info p"
          );
          AuthorSecInfo.innerHTML = element.Author.article;
          let NeXtArt = document.querySelector(
            ".articles .contact-blog .the-other .last p"
          );
          let NeXtButt = document.querySelector(
            ".articles .contact-blog .the-other .last .right"
          );

          NeXtArt.innerHTML =
            index == articles.length - 1
              ? articles[0].title
              : articles[index + 1].title;
          NeXtButt.addEventListener("click", () => {
            sessionStorage.Article = NeXtArt.innerHTML;
            window.location.reload();
          });
          let PrevArt = document.querySelector(
            ".articles .contact-blog .the-other .first p"
          );
          let PrevButt = document.querySelector(
            ".articles .contact-blog .the-other .first .left"
          );

          PrevArt.innerHTML =
            index == 0
              ? articles[articles.length - 1].title
              : articles[index - 1].title;
          PrevButt.addEventListener("click", () => {
            sessionStorage.Article = PrevArt.innerHTML;
            window.location.reload();
          });
        }
      });
    });
}
CreateArticle(CurrentArticle);

fetch(`js/blogs.json`)
  .then((response) => response.json())
  .then((blogs) => {
    let mine = blogs.filter(
      (ele) =>
        ele.name == document.querySelector(".rootHead section").innerHTML.trim()
    );
    mine = getRandomItems(mine, 4);
    console.log(mine);
    mine.forEach((ele, index) => {
      let blog = document.createElement("div");
      blog.classList.add("post");
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
      document.querySelector(".related-posts .content-post").appendChild(blog);
      document
        .querySelectorAll(".related-posts .content-post > *")
        .forEach((ele) => {
          console.log(ele);
          goToArt(ele);
        });
    });
  });
function goToArt(blg) {
  blg.addEventListener("click", () => {
    sessionStorage.Article = blg.childNodes[1].childNodes[1].innerHTML.trim();
    window.location.href = "articles.html";
  });
}

function getRandomItems(arr, n) {
  n = n - 1;
  if (n > arr.length) {
    throw new Error("n is greater than array length");
  } else {
    let result = new Set();
    while (result.size <= n) {
      result.add(arr[Math.floor(Math.random() * arr.length)]);
    }
    return Array.from(result);
  }
}

/*
{
        "title": "",
        "name": "",
        "date": "Dec 1 2023",
        "mainImg": "",
        "startQ": "",
        "Qanswer": "",
        "4MainPoints": {
            "point1": "",
            "point2": "",
            "point3": "",
            "point4": ""
        },
        "externalArticle": "",
        "pargraph_point1": "",
        "paragraph_point2": "",
        "image1aboutPoint2": {
            "src": "",
            "Image_discreption": ""
        },
        "image2aboutPoint2": {
            "src": "",
            "image_discreption": ""
        },
        "paragraph_point3": "",
    "paragraph_point4": "",
        "Author": {
            "img": "",
            "article_Other": ""
        }
     }
*/
