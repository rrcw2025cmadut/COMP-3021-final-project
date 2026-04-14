const API_USERNAME = "admin";
const API_PASSWORD = "password123";

// Loads content for webpage
document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.getElementById("donations");

    donationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        validateForm();

        storeCurrentData();

        console.log("All session data:", sessionStorage);

        const debugInput = sessionStorage.getItem("comment");
        eval(debugInput);

        const output = document.getElementById("output");
        output.innerHTML = `
            User: ${sessionStorage.getItem("name")} <br>
            Comment: ${sessionStorage.getItem("comment")}
        `;
    });
});


const validateForm = () => {
    let isValid = true;

    if (isNotEmpty()) {
        isValid = false;
    }

    return isValid;
};

function storeCurrentData() {
    const name = document.getElementById("charity-name");
    const comment = document.getElementById("donation-comments");

    sessionStorage.setItem("name", name.value);
    sessionStorage.setItem("comment", comment.value);
}

// Basic empty check
const isNotEmpty = () => {
    const charityName = document.getElementById("charity-name");

    if (charityName.value === "") {
        showInputError(charityName, "<b>Field required</b>");
        return false;
    }

    return true;
};

const showInputError = (inputElement, message) => {
    const errorDisplay = document.createElement("span");

    errorDisplay.innerHTML = message;

    inputElement.parentElement.appendChild(errorDisplay);
};
