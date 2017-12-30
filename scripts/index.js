/* Filename: index.js for Shopify's Newsletter webpage */

"use strict";

/* global variable */
var formValidity = true;
var newAccount = {};
var newAccountStr;

/* validate email address field */
function validateEmail() {
  var email = document.getElementById("email");
  var errorDiv = document.getElementById('errorText');
  var requiredValidity = true;
  try {
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email.value)) {
      // email.style.color = "#c23628";
      requiredValidity = false;
    }
    if (requiredValidity === false) {
      errorDiv.style.color = "#c23628";
      throw "Please enter a valid email address";
    }
    else {
      console.log("New Account Created:" +
                  "\nEmail: " + newAccount.email +
                  "\nInterested in: " + newAccount.interest);
      errorDiv.style.color = "#7ab55c";
      throw "Signed up successfully";
    }
  }
  catch(msg) {
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}

/* validate form */
function validateForm(event) {
  if (event.preventDefault) {
    event.preventDefault();     // prevent form from submitting
  }
  else {
    event.returnValue = false;  // prevent form from submitting in IE8
  }
  formValidity = true;         // reset value for revalidation
  validateEmail();
  if (formValidity === true) {
    document.getElementsByTagName("form")[0].submit();
  }
}

/* create new account */
function createAccount() {
  var email = document.getElementById("email");
  var interest = document.getElementById("interest");
  newAccount["email"] = email.value;
  newAccount["interest"] = interest.value;
  newAccountStr = JSON.stringify(newAccount);
}

/* create event listenvers */
function createEventListeners() {
  var email = document.getElementById("email");
  var interest = document.getElementById("interest");
  if (email.addEventListener) {
    email.addEventListener("change", createAccount, false);
    interest.addEventListener("change", createAccount, false);
  }
  else if (email.attachEvent) {
    email.attachEvent("onchange", createAccount);
    interest.attachEvent("onchange", createAccount);
  }

  var button = document.getElementById('submitBtn');
  if (button.addEventListener) {
    button.addEventListener("click", validateForm, false);
  }
  else if (button.attachEvent) {
    button.attachEvent("onclick", validateForm);
  }
}

/* run setup function when page finishing loading */
if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}