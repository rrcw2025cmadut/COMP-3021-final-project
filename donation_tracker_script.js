// Loads content for webpage
document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.getElementById("donations");

    donationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        validateForm();

        storeCurrentData();

        console.log("User donation:", sessionStorage);


        const output = document.getElementById("output");
        output.innerHTML = "Thank you " + sessionStorage.getItem("name") +
            " for donating $" + sessionStorage.getItem("amount") +
            "<br>Comment: " + sessionStorage.getItem("comment");
    });
});

const validateForm = () => {
    let isValid = true;

    if (isNotEmpty()) {
        isValid = false;
    }

    return isValid;
};

// Stores data into sessionStorage
function storeCurrentData() {
    const name = document.getElementById("charity-name");
    const amount = document.getElementById("donation-amount");
    const comment = document.getElementById("donation-comments");

    sessionStorage.setItem("name", name.value);
    sessionStorage.setItem("amount", amount.value);
    sessionStorage.setItem("comment", comment.value);
}

// Basic empty check
const isNotEmpty = () => {
    const charityName = document.getElementById("charity-name");

    if (charityName.value === "") {
        showInputError(charityName, "Charity name cannot be blank");
        return false;
    }

    return true;
};

const showInputError = (inputElement, message) => {
    const errorDisplay = document.createElement("span");

    // Using innerHTML instead of innerText → XSS vulnerability
    errorDisplay.innerHTML = message;

    errorDisplay.className = "error-message";
    inputElement.parentElement.appendChild(errorDisplay);
};
