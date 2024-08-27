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
        document.querySelector(".book-section").appendChild(categorySection);

        let bookArrange = element.books;
        // console.log(bookArrange);

        // Select the .book-wrap specific to this category section
        const bookWrap = categorySection.querySelector(".book-wrap");

        // Add books to the specific .book-wrap
        bookArrange.forEach(ele => {
            let args=ele;
            console.log(args);
            
            
            bookWrap.innerHTML += `
                <div class="book-arrange">
            
                    <img src="${ele.book_image}" onclick="showDetails('${ele.title}', '${ele.author}', '${ele.book_image}')">
                    <h6>${ele.title}</h6>
                    <h6>${ele.author}</h6>
                </div>
            `;
        });
    });
}
updateMainSec();

 function showDetails(title,author,image){
    document.querySelector(".showDetails").style.display="flex";
    document.querySelector("body").style.overflow = "hidden";
    
document.querySelector(".showDetails").innerHTML=`<div class="details-sec">
            <button class="cancel" onclick="cancel()">X</button>
            <div><img src="${image}" alt=""><div><h2>${title}</h2><h6>${author}</h6><p>there is no description of this book</p><div class="booklinks"></div></div></div>
            <button>Add to shopping list</button>
        </div>`;

}

document.getElementById("signUpBtn").addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector(".login").style.display="flex";
})
let defaultSignUp = true;

document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (defaultSignUp) {
        signUp();
    } else {
        signIn();
    }
});

function signUp() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!username || !email || !password) {
        document.getElementById('message').innerText = "All fields are required!";
        return;
    }

    let storedData = localStorage.getItem("UserInfo");
    let storedUsers = [];

    if (storedData) {
        try {
            storedUsers = JSON.parse(storedData);
            if (!Array.isArray(storedUsers)) {
                storedUsers = [storedUsers];
            }
        } catch (e) {
            console.error("Error parsing JSON from localStorage:", e);
            storedUsers = [];
        }
    }

    let userExists = storedUsers.some(user => user.email === email);

    if (userExists) {
        document.getElementById('message').innerText = "User already exists!";
        return;
    }

    let userInfo = {
        username: username,
        email: email,
        password: password
    };

    storedUsers.push(userInfo);
    localStorage.setItem("UserInfo", JSON.stringify(storedUsers));
    document.getElementById('message').innerText = "User registered successfully!";
    document.getElementById('signupForm').reset();
}

document.getElementById("sign-in").addEventListener("click", () => {
    defaultSignUp = false;
    document.getElementById("username").style.display = "none";
    document.getElementById("signUp/signIn").innerText = "Sign In";
    document.getElementById('message').innerText = "";
});

document.getElementById("sign-up").addEventListener("click", () => {
    defaultSignUp = true;
    document.getElementById("username").style.display = "flex";
    document.getElementById("signUp/signIn").innerText = "Sign Up";
    document.getElementById('message').innerText = "";
});

function signIn() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let storedUsers = JSON.parse(localStorage.getItem("UserInfo")) || [];

    let user = storedUsers.find(user => user.email === email);

    if (user) {
        if (user.password === password) {
            document.getElementById('message').textContent = "Login successful! Welcome " + user.username + "!";
        } else {
            document.getElementById('message').textContent = "Incorrect password!";
        }
    } else {
        document.getElementById('message').textContent = "User does not exist!";
    }

    document.getElementById('signupForm').reset();
}

document.querySelector(".cross").addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector(".login").style.display="none";
})
function cancel(){
    // e.preventDefault();
    console.log("cancel");
    
    document.querySelector(".showDetails").style.display="none";
    document.querySelector("body").style.overflow = "visible";
}

