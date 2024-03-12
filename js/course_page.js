fetch("js/course-page.json")
    .then((response) => response.json())
    .then((data) => {
        // categories
        data.forEach((course) => {
            if (course.title === localStorage.courseTitle) {
                let tags = document.querySelector(
                    ".cour-head-section .cour-tags"
                );
                course.categories.forEach((el) => {
                    let tag = document.createElement("a");
                    tag.classList.add("cour-tag");
                    tag.innerHTML = el;
                    tags.appendChild(tag);
                });
                // Headings
                let head = document.querySelector(
                    ".cour-head-section .cour-heading"
                );
                head.innerHTML = course.title;
                // Details
                let rate = document.querySelector(
                    ".cour-details .cour-details-rate span"
                );
                rate.innerHTML = course.rating;
                let rate_star = document.querySelector(
                    ".cour-details .cour-details-rate"
                );
                if (+course.rating == Math.floor(+course.rating)) {
                    for (let i = 0; i < Math.floor(+course.rating); i++) {
                        let star = document.createElement("ion-icon");
                        star.setAttribute("name", "star");
                        rate_star.appendChild(star);
                    }
                } else {
                    for (let i = 0; i < Math.floor(+course.rating); i++) {
                        let star = document.createElement("ion-icon");
                        star.setAttribute("name", "star");
                        rate_star.appendChild(star);
                    }
                    let star = document.createElement("ion-icon");
                    star.setAttribute("name", "star-half-outline");
                    rate_star.appendChild(star);
                }
                // Enrolled
                let enrol = document.querySelector(
                    ".cour-details > div:nth-child(2)"
                );
                let txt = document.createTextNode(course.enrolled);
                enrol.appendChild(txt);
                // duration
                let duration = document.querySelector(
                    ".cour-details > div:nth-child(3)"
                );
                txt = document.createTextNode(course.duration);
                duration.appendChild(txt);
                // Instructor Head
                let inst = document.querySelector(
                    ".cour-head-section .cour-instaructor p"
                );
                inst.innerHTML = course.instructor;
                let instImg = document.querySelector(
                    ".cour-head-section .cour-instaructor img"
                );
                instImg.setAttribute("src", course.instructorImg);
                // cour overview details
                let details = document.querySelector(
                    ".cour-overview .cour-overview-detials"
                );
                details.innerHTML = course.overview
                    .split("\n\n")
                    .join("</br></br>");
                // what you will learn
                let learnCon = document.querySelectorAll(".what-learn div ul");
                course.learn.forEach((ele, i, arr) => {
                    let li = document.createElement("li");
                    li.classList.add("overview-list-element");
                    let icon = document.createElement("ion-icon");
                    icon.setAttribute("name", "checkmark-circle-outline");
                    let paragraph = document.createElement("p");
                    paragraph.innerHTML = ele;
                    li.appendChild(icon);
                    li.appendChild(paragraph);
                    if (Math.floor(arr.length / 2) > i) {
                        learnCon[0].appendChild(li);
                    } else {
                        learnCon[1].appendChild(li);
                    }
                });
                // Requirements
                let ulOver = document.querySelector(".cour-overview > ul");
                course.requirements.forEach((ele) => {
                    let li = document.createElement("li");
                    li.classList.add("overview-list-element");
                    let icon = document.createElement("ion-icon");
                    icon.setAttribute("name", "checkmark-circle-outline");
                    let paragraph = document.createElement("p");
                    paragraph.innerHTML = ele;
                    li.appendChild(icon);
                    li.appendChild(paragraph);
                    ulOver.appendChild(li);
                });
                // ASide
                let asideImg = document.querySelector(".cour-aside > a img");
                asideImg.setAttribute("src", course.image);
                let asideH = document.querySelector(
                    ".cour-aside > .cour-aside-heading"
                );
                asideH.innerHTML = `&#163;${course.cost}`;
                // elements
                let ListItems = document.querySelectorAll(
                    ".cour-aside-list-element"
                );
                ListItems.forEach((el, index) => {
                    switch (index) {
                        case 0:
                            el.childNodes[3].innerHTML = course.duration;
                            break;
                        case 1:
                            el.childNodes[3].innerHTML = course.lessons;
                            break;
                        case 3:
                            el.childNodes[3].innerHTML = course.quizzes;
                            break;
                        case 6:
                            el.childNodes[3].innerHTML = course.level;
                            break;
                    }
                });
                // instructor
                let secInstructorImg = document.querySelector(
                    ".cour-instructor-details img"
                );
                secInstructorImg.setAttribute("src", course.instructorImg);
                let secInstructor = document.querySelector(
                    ".cour-instructor-detail-name"
                );
                secInstructor.innerHTML = course.instructor;
                //Curriculum
                let accord = document.querySelectorAll(".accordion-wrapper");
                accord.forEach((el, index) => {
                    let div1 = document.createElement("div");
                    div1.classList.add("accordion");
                    let div2 = document.createElement("div");
                    div2.classList.add("accordion-heading");
                    let h3 = document.createElement("h3");
                    if (index == 0) {
                        h3.innerHTML = "First Step";
                    } else {
                        h3.innerHTML = "Second Step";
                    }
                    let icon = document.createElement("i");
                    icon.classList.add("fas", "fa-angle-down");
                    div2.appendChild(h3);
                    div2.appendChild(icon);
                    div1.appendChild(div2);
                    let div3 = document.createElement("div");
                    div3.classList.add("accordion-content");
                    let ul = document.createElement("ul");
                    ul.classList.add("accordion-list");
                    // course[`step${index + 1}`].name.forEach((el) => console.log(el));
                    course[`step${index + 1}`].name.forEach((el, index) => {
                        let li = document.createElement("li");
                        li.classList.add("accordion-list-elements");
                        let spans = document.createElement("span");
                        let i = document.createElement("i");
                        i.classList.add("fa-regular", "fa-file");
                        let text = document.createTextNode(el);
                        spans.appendChild(i);
                        spans.appendChild(text);
                        li.appendChild(spans);
                        let i2 = document.createElement("i");
                        i2.classList.add("fa-solid", "fa-check");
                        li.appendChild(i2);
                        li.onclick = () => {
                            location.href =
                                course[`step${index + 1}`].link[index];
                        };
                        ul.appendChild(li);
                    });
                    let li = document.createElement("li");
                    li.classList.add("accordion-list-elements", "quiz-element");
                    li.setAttribute(
                        "data-link",
                        course[`step${index + 1}`].quiz
                    );
                    let spans = document.createElement("span");
                    let i = document.createElement("i");
                    i.classList.add("fa-solid", "fa-question");
                    let text = document.createTextNode("Quiz First");
                    spans.appendChild(i);
                    spans.appendChild(text);
                    li.appendChild(spans);
                    let par = document.createElement("p");
                    let butt = document.createElement("span");
                    butt.innerHTML = "4 Questions";
                    par.appendChild(butt);
                    li.appendChild(par);
                    // MyTests.forEach((el) => {
                    // el.removeEventListener("click", (event) => {
                    //   handleButtonClick(event);
                    // }); // Remove any existing listeners to prevent duplicates
                    li.addEventListener("click", (event) => {
                        document.location.href = "quiz.html";
                        handleButtonClick(event);
                    });
                    // });
                    ul.appendChild(li);
                    div3.appendChild(ul);
                    div1.appendChild(div3);
                    el.appendChild(div1);
                    div2.onclick = () => {
                        if (div1.classList.contains("active")) {
                            div1.classList.remove("active");
                        } else {
                            div1.classList.add("active");
                        }
                    };
                });
            }
        });
    });
