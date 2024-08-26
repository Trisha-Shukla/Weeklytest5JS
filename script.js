async function updateSidebar() {
    let categoryArray = await bookCategories(); // Wait for the promise to resolve
    console.log(typeof categoryArray); // Should be an object (array in JavaScript)

    categoryArray.forEach(element => {
        document.querySelector(".sidebar-1").innerHTML += `<li>${element.list_name}</li>`;
    });
}

updateSidebar(); // Call the async function to update the sidebar

async function bookCategories(){
    let response= await fetch("https://books-backend.p.goit.global/books/category-list");
    let data=await response.json();
    // console.log(data);
    
    return data;
    
}

async function bookDetails(){
    let response= await fetch("https://books-backend.p.goit.global/books/top-books");
    let data=await response.json();
    console.log(data);
    
    return data;
    
    
}
bookDetails();

async function updateMainSec() {
    let booksArray = await bookDetails(); // Wait for the promise to resolve

    booksArray.forEach(element => {
        // Create a container for each category
        const categorySection = document.createElement("div");
        categorySection.classList.add("category-section");

        // Add the category name as a heading
        categorySection.innerHTML = `
            <h5>${element.list_name}</h5>
            <div class="book-wrap"></div>
            <button>See More</button>
        `;

        // Append the category section to the main container
        document.querySelector(".book-sec-1").appendChild(categorySection);

        let bookArrange = element.books;
        console.log(bookArrange);

        // Select the .book-wrap specific to this category section
        const bookWrap = categorySection.querySelector(".book-wrap");

        // Add books to the specific .book-wrap
        bookArrange.forEach(ele => {
            bookWrap.innerHTML += `
                <div class="book-arrange">
                    <img src="${ele.book_image}" alt="">
                    <h4>${ele.title}</h4>
                    <h6>${ele.author}</h6>
                </div>
            `;
        });
    });
}
updateMainSec();

