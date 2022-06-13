const search = document.querySelector(".search-box");
const displayArea = document.querySelector(".book-holder");
const readMore = document.querySelector(".popup");
const modalContainer = document.querySelector(".modal-container");

const bookList = [];

const OutputHTML = (bookResults) => {
  const html = bookResults
    .map(
      (bookResults) => `
    <div class="book-item">
      <img src="${bookResults.imageLinks.smallThumbnail}" alt="book image">
      <div class="info">
        <p>Title: ${bookResults.title}</p>
        <p>Author: ${bookResults.authors}</p>
        <p>Description: ${bookResults.description.slice(0, 300)}</p>
      </div>
      <div class="links">
        <a href="#">BookMark</a>
        <a href="#" class="popup">Read More</a>
      </div>
    </div>
  `
    )
    .join("");
  displayArea.innerHTML = html;
};

const searchBook = async (searchInput) => {
  const clearList = () => {
    bookList.length = 0;
  };

  const displaybook = (booklist) => {
    for (let book of booklist) {
      bookList.push(book.volumeInfo);
    }
    console.log(bookList);
    OutputHTML(bookList);
  };
  // gets the javascript object of first 5 books
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=5&orderBy=relevance&printType=books`
  );
  const searchResults = await res.json();

  await clearList();
  await displaybook(searchResults.items);
};

const displayModal = () => {
  if (modalContainer.style.display === "none" || modalContainer.style.display === "") {
    modalContainer.style.display = "block";
  } else {
    modalContainer.style.display = "none";
  }
  
};
const closeModal = () =>{
  
  if (modalContainer.style.display === "block") {
    modalContainer.style.display = "none";
  } else {
    modalContainer.style.display = "block";
  }
}

search.addEventListener("input", () => searchBook(search.value));
displayArea.addEventListener("click", function(e) {
  console.log(e);
  if(e.target.matches("a.popup")){
    displayModal();
  }
})
modalContainer.addEventListener('click', function(e){
  console.log(e);
  if(e.target.matches('a.go-back')){
    closeModal();
  }
})