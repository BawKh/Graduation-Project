const main_video = document.querySelector(".main-video video");
const main_video_title = document.querySelector(".main-video .title");
const video_playlist = document.querySelector(".video-playlist .videos");

let data = [
    {
        id: "a1",
        title: "Course Introduction: Getting Started",
        name: "video-1.mp4",
        duration: "2:47",
    },
    {
        id: "a2",
        title: "Working with Modules and npm in Node.js",
        name: "video-2.mp4",
        duration: "2:45",
    },
    {
        id: "a3",
        title: "Asynchronous JavaScript and Callbacks in Node.js",
        name: "video-3.mp4",
        duration: "24:49",
    },

    {
        id: "a4",
        title: "Event-Driven Programming with EventEmitter in Node.js",
        name: "video-4.mp4",
        duration: "3:59",
    },
    {
        id: "a5",
        title: "Building a RESTful API with Express.js in Node.js",
        name: "video-5.mp4",
        duration: "4:25",
    },
    {
        id: "a6",
        title: "Using MongoDB with Node.js: Database Integration",
        name: "video-6.mp4",
        duration: "5:33",
    },
    {
        id: "a7",
        title: "Authentication and Authorization in Node.js Applications",
        name: "video-7.mp4",
        duration: "0:29",
    },

    {
        id: "a8",
        title: "Deploying Node.js Applications to Production Servers",
        name: "video-8.mp4",
        duration: "1:12",
    },
    {
        id: "a9",
        title: "Testing and Debugging Node.js Applications: Best Practices",
        name: "video-9.mp4",
        duration: "3:38",
    },
];

data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="./images/vid-images/play.svg" alt="">
                    <p>${i + 1 > 9 ? i + 1 : "0" + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
});

let videos = document.querySelectorAll(".video");
videos[0].classList.add("active");
videos[0].querySelector("img").src = "./images/vid-images/pause.svg";

videos.forEach((selected_video) => {
    selected_video.onclick = () => {
        for (all_videos of videos) {
            all_videos.classList.remove("active");
            all_videos.querySelector("img").src =
                "./images/vid-images/play.svg";
        }

        selected_video.classList.add("active");
        selected_video.querySelector("img").src =
            "./images/vid-images/pause.svg";

        let match_video = data.find(
            (video) => video.id == selected_video.dataset.id
        );
        main_video.src = "videos/" + match_video.name;
        main_video_title.innerHTML = match_video.title;
    };
});
