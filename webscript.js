document.addEventListener('DOMContentLoaded', function () {
    const firstNameInput = document.getElementById("firstn");
    const lastNameInput = document.getElementById("lastn");
    const emailInput = document.getElementById("email");
    const phoneNumberInput = document.getElementById("num");

    // Function to check if the user is logged in (has saved data in localStorage)
    function isLoggedIn() {
        return localStorage.getItem("name") && localStorage.getItem("email") && localStorage.getItem("number");
    }

    // Check if user is logged in and redirect if necessary
    if (window.location.pathname.includes("account.html") && isLoggedIn()) {
        // Redirect to profile page if data is already saved in localStorage
        window.location.href = "profile.html";
    }

    // Populate the form if data exists in localStorage (for account.html)
    if (window.location.pathname.includes("account.html")) {
        if (localStorage.getItem("name")) {
            const fullName = localStorage.getItem("name").split(" ");
            firstNameInput.value = fullName[0]; // Set first name
            lastNameInput.value = fullName[1]; // Set last name
        }
        if (localStorage.getItem("email")) {
            emailInput.value = localStorage.getItem("email"); // Set email
        }
        if (localStorage.getItem("number")) {
            phoneNumberInput.value = localStorage.getItem("number"); // Set phone number
        }

        // Handle form submission (Log in button click)
        document.getElementById("Create").addEventListener("click", function validate() {
            const number = phoneNumberInput.value;
            const email = emailInput.value;
            const fn = firstNameInput.value;
            const ln = lastNameInput.value;

            // Ensure all fields are filled
            if (!number || !email || !fn || !ln) {
                alert("Please fill in all fields.");
                return;
            }

            // Validate each input
            if (!isNameValid(fn) || !isNameValid(ln) || !isEmailValid(email) || !isPhoneValid(number)) {
                return;
            }

            // Save the user's data to localStorage
            const name = fn + " " + ln;
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("number", number);

            // Redirect to profile page
            window.location.href = "profile.html";
        });
    }

    // Handle Profile page (profile.html)
    if (window.location.pathname.includes("profile.html")) {
        if (!isLoggedIn()) {
            // If no user data exists, redirect to the account page to fill out the form
            window.location.href = "account.html";
        }

        const uname = localStorage.getItem("name");
        const uemail = localStorage.getItem("email");
        const pnumber = localStorage.getItem("number");

        // Display the user's profile info on profile page
        document.getElementById("name").textContent = `Name : ${uname}`;
        document.getElementById("pn").textContent = `Phone Number : ${pnumber}`;
        document.getElementById("em").textContent = `E-mail : ${uemail}`;
    }
});

// Validation Functions
function isNameValid(name) {
    if (!/^[a-zA-Z]+$/.test(name)) {
        alert("Invalid Name. The Name must only contain alphabetic characters (no numbers or symbols).");
        return false;
    }
    return true; // Name is valid
}

function isPhoneValid(number) {
    if (!/^[0-9+]+$/.test(number)) {
        alert("Invalid Phone Number. The Phone Number must not contain alphabetic characters or symbols");
        return false;
    }
    if (number.length < 11 || number.length > 15) {
        alert("Invalid Phone Number length. The Phone Number must be between 11 and 15 digits long.");
        return false;
    }
    return true; // Phone is valid
}

function isEmailValid(email) {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return true;
    } else {
        alert("Invalid Email.");
        return false;
    }
}
