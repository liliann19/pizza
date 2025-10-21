// When the form is submitted, validate
document.getElementById('pizza-form').onsubmit = () => {

    clearErrors();

    // Flag variable to determine if form data is valid 
    let isValid = true;

    // Validate first name
    let fname = document.getElementById('fname').value.trim();
    //alert(fname);
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate last name
    let lname = document.getElementById('lname').value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // Validate email 
    let email = document.getElementById('email').value.trim();
    if (!email || email.indexOf("@") === -1){
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // Validate method (pickup or delivery)
    let methodButtons = document.getElementsByName("method");
    let count = 0;
    for (let i = 0; i < methodButtons.length; i++){
        if (methodButtons[i].checked) {
            count++;
        }
    }
    if (count === 0) {
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    // Validate size 
    let size = document.getElementById('size').value;
    if (size === "none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    // Return isValid flag
    return isValid;

}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}


