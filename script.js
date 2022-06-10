const search = document.querySelector(".search-box");
const bookList = [];

const searchBook = async (searchInput) => {
  const clearList = () => {
    bookList.length = 0;
  };

  const displaybook = (booklist) => {
    for (let book of booklist) {
      bookList.push(book.volumeInfo);
    }
    console.log(bookList);
  };
  // gets the javascript object of first 5 books
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=5&orderBy=relevance&printType=books`
  );
  const searchResults = await res.json();

  await clearList();
  await displaybook(searchResults.items);
};

search.addEventListener("input", () => searchBook(search.value));
