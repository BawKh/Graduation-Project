let postsData = "";
let currentFilters = {
  categories: [],
  level: [],
  rating: [],
  instructor: [],
};
const searchDisplay = document.querySelector(".search-display");
const postsContainer = document.querySelector("#posts-container");
const categoriesContainer = document.querySelector("#post-categories");
const levelsContainer = document.querySelector("#post-levels");
const postCount = document.querySelector("#post-count");
const noResults = document.querySelector("#no-results");
const ratingsContainer = document.querySelector("#post-ratings");
const instructorsContainer = document.querySelector("#post-instructors");
fetch(`js/courses.json`).then(async (response) => {
  postsData = await response.json();
  postsData.map((post) => createPost(post));
  postCount.innerText = postsData.length;

  categoriesData = [
    ...new Set(
      postsData
        .map((post) => post.categories)
        .reduce((acc, curVal) => acc.concat(curVal), [])
    ),
  ];
  categoriesData.map((category) =>
    createFilter("categories", category, categoriesContainer)
  );

  levelData = [...new Set(postsData.map((post) => post.level))];
  levelData.map((level) => createFilter("level", level, levelsContainer));
  //
  instructorData = [...new Set(postsData.map((post) => post.instructor))];
  instructorData.map((instructor) =>
    createFilter("instructor", instructor, instructorsContainer)
  );
  ratingData = [...new Set(postsData.map((post) => post.rating))];
  ratingData.map((rating) => createFilter("rating", rating, ratingsContainer));
});

const createPost = (postData) => {
  const {
    title,
    link,
    image,
    categories,
    level,
    rating,
    instructor,
    instructorImg,
    lessons,
    duration,
  } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
      <a class="post-preview" href="${link}" target="_blank">
        <img class="post-image" src="${image}">
      </a>
      <div class="post-content">
      <p class="post-rate">${rating}</p>
        <p class="post-title">${title}</p>

        <div class="post-footer">
          <span class="post-level"><ion-icon name="document-text-outline"></ion-icon>  ${lessons}</span>
          <span class="post-level"><i class="fa-regular fa-clock"></i>  ${duration}</span>
          <span class="post-level"><i class="fa-solid fa-chart-simple"></i>  ${level}</span>
        </div>
        <div class="post-insimg">
        <img src="${instructorImg}">
        <p>${instructor}</p></div>
      </div>
  `;
  post.onclick = () => {
    localStorage.setItem("courseTitle", title);
  };
  postsContainer.append(post);
};
const createFilter = (key, param, container) => {
  const filterButton = document.createElement("button");
  filterButton.className = "filter-button";
  filterButton.innerText = param;
  filterButton.setAttribute("data-state", "inactive");
  filterButton.addEventListener("click", (e) =>
    handleButtonClick(e, key, param, container)
  );

  container.append(filterButton);
};

const handleButtonClick = (e, key, param, container) => {
  const button = e.target;
  const buttonState = button.getAttribute("data-state");
  if (buttonState == "inactive") {
    button.classList.add("is-active");
    button.setAttribute("data-state", "active");
    currentFilters[key].push(param);
    handleFilterPosts(currentFilters);
  } else {
    button.classList.remove("is-active");
    button.setAttribute("data-state", "inactive");
    currentFilters[key] = currentFilters[key].filter((item) => item !== param);
    handleFilterPosts(currentFilters);
  }
};

const handleFilterPosts = (filters) => {
  let filteredPosts = [...postsData];
  let filterKeys = Object.keys(filters);

  filterKeys.forEach((key) => {
    let currentKey = filters[key];
    if (currentKey.length <= 0) {
      return;
    }

    filteredPosts = filteredPosts.filter((post) => {
      let currentValue = post[key];
      return Array.isArray(currentValue)
        ? currentValue.some((val) => currentKey.includes(val))
        : currentKey.includes(currentValue);
    });
  });

  //   if (filters.categories.length > 0) {
  //     filteredPosts = filteredPosts.filter((post) =>
  //       post.categories.some((category) => {
  //         return filters.categories.includes(category);
  //       })
  //     );

  //     // filteredPosts = filteredPosts.filter((post) =>
  //     //   filters.categories.every((filter) => {
  //     //     return post.categories.includes(filter);
  //     //   })
  //     // );
  //   }

  //   if (filters.level.length > 0) {
  //     filteredPosts = filteredPosts.filter((post) =>
  //       filters.level.includes(post.level)
  //     );
  //   }

  postCount.innerText = filteredPosts.length;

  if (filteredPosts.length == 0) {
    noResults.innerText = "Sorry, we couldn't find any results.";
  } else {
    noResults.innerText = "";
  }

  postsContainer.innerHTML = "";
  filteredPosts.map((post) => createPost(post));
};
const handleSearchPosts = (query) => {
  const searchQuery = query.trim().toLowerCase();

  if (searchQuery.length <= 1) {
    resetPosts();
    return;
  }

  let searchResults = [...postsData].filter(
    (post) =>
      post.categories.some((category) =>
        category.toLowerCase().includes(searchQuery)
      ) || post.title.toLowerCase().includes(searchQuery)
  );

  if (searchResults.length == 0) {
    searchDisplay.innerHTML = "No results found";
  } else if (searchResults.length == 1) {
    searchDisplay.innerHTML = `1 result found for your query: ${query}`;
  } else {
    searchDisplay.innerHTML = `${searchResults.length} results found for your query: ${query}`;
  }

  postsContainer.innerHTML = "";
  searchResults.map((post) => createPost(post));
};

const resetPosts = () => {
  searchDisplay.innerHTML = "";
  postsContainer.innerHTML = "";
  postsData.map((post) => createPost(post));
};

const search = document.getElementById("search");

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500);
  },
  false
);
