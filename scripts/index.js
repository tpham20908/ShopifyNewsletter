/* Filename: index.js for Shopify's Newsletter webpage */
"use strict";

/* global variable */
var formValidity = true;

/* validate email address field */
function validateEmail() {
  var inputEmail = document.getElementById('email');
  var errorDiv = document.getElementById('errorText');
  var requiredValidity = true;
  try {
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(inputEmail.value)) {
      // inputEmail.style.color = "#c23628";
      requiredValidity = false;
    }
    if (requiredValidity === false) {
      throw "Please enter a valid email address";
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

/* create event listenvers */
function createEventListeners() {
  var form = document.getElementsByTagName("form")[0];
  if (form.addEventListener) {
    form.addEventListener("submit", validateForm, false);
  }
  else if (form.attachEvent) {
    form.attachEvent("onsubmit", validateForm);
  }
}

/* run setup function when page finishing loading */
if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}