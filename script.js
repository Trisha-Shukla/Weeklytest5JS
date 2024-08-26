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
    console.log(data);
    
    return data;
    
}
// bookCategories();