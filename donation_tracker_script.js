document.addEventListener("DOMContentLoaded", () => {
    // Donation Tracker
    const donationForm = document.getElementById("donations");

    // Submits the donation tracker form
    donationForm.addEventListener("submit", (event) => {
        // Prevents automatic submission
        event.preventDefault();

        // Removes existing error messages
        const errorMessages = document.querySelectorAll(".error-message");
        for(const el of errorMessages){
            el.remove();
        }

        // Stores and submits data if form data is valid
        if (validateForm()) {
            storeCurrentData();
            // Shows data saved in session storage
            console.log(sessionStorage.getItem("name"));
        } else {
            console.log("Validation failed");
        }
    });
})
    
// Validates form inputs
const validateForm = () => {
    let isValid = true;

    if (isNotEmpty()) {
        isValid = false;
    }

    if (isValidDate()) {
        isValid = false;
    }

    if (isValidNumber()) {
        isValid = false;
    }

    return isValid;
};

// Stores data into a temporary object
function storeCurrentData() {
    const name = document.getElementById("charity-name");
    const amount = document.getElementById("donation-amount");
    const date = document.getElementById("donation-date");
    const comment = document.getElementById("donation-comments");

    sessionStorage.setItem("name", name.value);
    sessionStorage.setItem("amount", amount.value);
    sessionStorage.setItem("date", date.value);
    sessionStorage.setItem("comment", comment.value);
};

// Validates if text fields are not empty
const isNotEmpty = () => {
    let isValid = true;
    const charityName = document.getElementById("charity-name");

    if (charityName.value === "") {
        isValid = false;
        showInputError(charityName, "Charity name cannot be blank");
    }

    return isValid;
};

// Validates if amount is a valid number and greater than 0
const isValidNumber = () => {
    let isValid = true;
    const donationAmount = document.getElementById("donation-amount");
    const amountPattern = /^-?\d*\.?\d+$/;

    if (!amountPattern.test(donationAmount.value)) {
        isValid = false;
        showInputError(donationAmount, "Please enter a valid amount")
    }
    else if (donationAmount.value <= 0) {
        isValid = false;
        showInputError(donationAmount, "Please enter a positive amount")
    }

    return isValid;
};

// Validates that the date provided is a valid date
const isValidDate = () => {
    let isValid = true;
    const dateInput = document.getElementById("donation-date");
    const donationDate = new Date(dateInput.value);

    if (isNaN(donationDate)) {
        isValid = false;
        showInputError(dateInput, "Please enter a valid date");
    }

    return isValid;
};

// Creates and appends error messages to input fields
const showInputError = (inputElement, message) => {
    // Create a span element for our error message
    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role", "alert");

    inputElement.parentElement.appendChild(errorDisplay);
    console.log("Error found on event form");
};
