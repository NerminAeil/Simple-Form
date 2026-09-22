const signupSection = document.getElementById("createAccount");
const loginSection = document.getElementById("LoginPage");
const resetSection = document.getElementById("getPasswordPage");
const signupForm = document.querySelector(".signup-container");
const loginForm = document.querySelector(".login-container");
const resetForm = document.querySelector(".reset-container");
const checkbox = document.getElementById("terms");
const result1 = document.getElementById("signup");
const result2 = document.getElementById("login");
const result3 = document.getElementById("reset");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const passLogin = document.getElementById("passwordLogin");
const loginButton = document.querySelector(".Login");
const resetSignupButton = document.querySelector(".resetSignin");
const resetLoginButton = document.querySelector(".resetLogin");
const resetPasswordButton = document.getElementById("reset-password-submit");
const resetPasswordClearButton = document.querySelector(".resetPasswordClear");
let failedAttempts = 0;

function triggerShake(element) {
  if (!element) return;

  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 450);
}

function showSection(targetSection) {
  const sections = [signupSection, loginSection, resetSection];
  sections.forEach((section) => {
    if (section) {
      section.style.display = section === targetSection ? "block" : "none";
    }
  });
  const forms = [signupForm, loginForm, resetForm];
  forms.forEach((form) => {
    if (form) {
      const formSection = form.closest("section");
      form.style.display = formSection === targetSection ? "flex" : "none";
    }
  });
  if (result1) {
    result1.innerHTML = "";
  }
}
const loginBtn = document.querySelector(".loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(loginSection);
  });
}
const forgotBtn = document.querySelector(".getBtn");
if (forgotBtn) {
  forgotBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(resetSection);
    if (resetForm) {
      resetForm.style.display = "flex";
    }
    if (resetPasswordButton) {
      resetPasswordButton.style.display = "block";
    }
    if (resetPasswordClearButton) {
      resetPasswordClearButton.style.display = "block";
    }
    if (result3) {
      result3.innerHTML = "";
    }
  });
}
showSection(signupSection);
if (passwordInput) {
  passwordInput.addEventListener("input", function () {
    const pass = this.value;
    const passwordRequirements = document.querySelector(".Password-requirement");
    const passwordStrength = document.getElementById("passwordstrength");
    if (!passwordStrength) return;
    if (pass.length === 0) {
      passwordStrength.style.display = "none";
      return;
    }
    let hasLowercase = /[a-z]/.test(pass);
    let hasUppercase = /[A-Z]/.test(pass);
    let hasNumber = /[0-9]/.test(pass);
    let hasSpecial = /[^A-Za-z0-9]/.test(pass);
    let strength = "";
    if (pass.length < 8) {
      strength = "Weak";
    } else if (hasLowercase && hasUppercase && hasNumber && hasSpecial) {
      strength = "Strong";
    } else if (hasLowercase && hasUppercase && hasNumber) {
      strength = "Medium";
    } else {
      strength = "Weak";
    }
    passwordStrength.style.display = "block";
    passwordStrength.textContent = "Password Strength: " + strength;
    if (passwordRequirements) {
      passwordRequirements.style.display = "block";
      passwordRequirements.style.color = "red";
    }
  });
}
if (passwordInput && confirmInput) {
  confirmInput.addEventListener("input", function () {
    const passwordValue = passwordInput.value;
    const confirmValue = confirmInput.value;
    const confirmStrength = document.getElementById("password-match");
    if (!confirmStrength) return;
    if (confirmValue.length === 0) {
      confirmStrength.style.display = "none";
      return;
    }
    confirmStrength.style.display = "block";
    if (passwordValue !== confirmValue) {
      confirmStrength.textContent = " ✕ Passwords don't match";
    } else {
      confirmStrength.textContent = " ✓ Passwords match.";
    }
  });
}
function showPassword() {
  const passwordField = document.getElementById("password");
  const eyeText = document.getElementById("show");
  if (!passwordField || !eyeText) return;
  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeText.textContent = "(◉‿◉)";
  } else {
    passwordField.type = "password";
    eyeText.textContent = "(⚆_⚆)";
  }
}
function GeneratePassword() {
  let password = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  if (passwordInput) {
    passwordInput.value = password;
  }
  const passwordStrength = document.getElementById("passwordstrength");
  if (passwordStrength) {
    passwordStrength.style.display = "block";
    passwordStrength.textContent = "Password Strength: Strong";
  }
}
if (resetSignupButton) {
  resetSignupButton.addEventListener("click", (event) => {
    event.preventDefault();
    passwordInput.value = "";
    document.getElementById("email").value = "";
    document.getElementById("confirm-password").value = "";
    document.querySelector(".FirstName").value = "";
    document.querySelector(".LastName").value = "";
    document.querySelector(".Username").value = "";
    checkbox.checked = false;
    result1.innerHTML="";
  });
}
if (resetLoginButton) {
  resetLoginButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".EmailLogin").value = "";
    document.getElementById("passwordLogin").value = "";
    document.getElementById("rememberMe").checked = false;
   result2.innerHTML="";
});
}
if (resetPasswordClearButton) {
  resetPasswordClearButton.addEventListener("click", () => {
    document.querySelector(".EmailPass").value = "";
    result3.innerHTML="";
  });
}
function Creation() {
  const passValue = passwordInput.value;
  const email = document.getElementById("email").value.trim();
  const confirmPassValue = confirmInput.value;
  const firstName = document.querySelector(".FirstName").value.trim();
  const lastName = document.querySelector(".LastName").value.trim();
  const userName = document.querySelector(".Username").value.trim();
  let hasLowercase = /[a-z]/.test(passValue);
  let hasUppercase = /[A-Z]/.test(passValue);
  let hasNumber = /[0-9]/.test(passValue);
  let errors = "";
  if (!email.endsWith("@gmail.com")) {
    errors += "✕ Email must end with @gmail.com<br/>";
  }
  if (passValue !== confirmPassValue) {
    errors += "✕ Password and Confirm Password do not match<br/>";
  }
  if (!hasLowercase || !hasUppercase || !hasNumber) {
    errors += "✕ Password must contain at least one lowercase letter, one uppercase letter and one number<br/>";
  }
  if (passValue.length < 8) {
    errors += "✕Password must be at least 8 characters long<br/>";
  }
  if (firstName === "" || lastName === "" || userName === "" || email === "" || passValue === "" || confirmPassValue === "") {
    errors += "✕ Please fill all the fields<br/>";
  }
  if (!checkbox || !checkbox.checked) {
    errors += "✕ Please accept the terms and conditions<br/>";
  }
  if (errors !== "") {
    result1.innerHTML = errors;
    triggerShake(signupForm);
    result1.style.color = "red";
    return;
  
}
  if (signupForm) {
    resetSignupButton.style.display = "none";
    signupForm.style.display = "none";
     result1.classList.add("result-success");
    result1.innerHTML = " ✓ Now You Create An Account! Welcome " + userName + "!";
}
}
if (passLogin) {
  passLogin.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (loginButton) {
        loginButton.click();
      }
    }
  });
}
function Login() {
  const emailLogin = document.querySelector(".EmailLogin");
  const rememberMe = document.getElementById("rememberMe");
  const emailValue = emailLogin ? emailLogin.value.trim() : "";
  const passValue = passLogin ? passLogin.value.trim() : "";
  let errorsLogin = "";

  if (emailValue === "" || passValue === "") {
    errorsLogin += "✕ Please fill all the fields<br/>";
  }
  if (!emailValue.endsWith("@gmail.com")) {
    errorsLogin += "✕ Email must end with @gmail.com<br/>";
  }
  if (passValue.length < 6) {
    errorsLogin += "✕ Password must be at least 6 characters long<br/>";
  }

  if (errorsLogin !== "") {
    result2.innerHTML = errorsLogin;
    result2.style.color = "red";
    triggerShake(loginForm);
    failedAttempts += 1;

    if (failedAttempts >= 5) {
      result2.innerHTML = "✕ Too many failed attempts.<br>Try again in 25 seconds.";
      result2.style.color = "red";
      if (emailLogin) emailLogin.disabled = true;
      if (passLogin) passLogin.disabled = true;
      if (resetLoginButton) resetLoginButton.disabled = true;
      if (loginButton) loginButton.disabled = true;

      let time = 25;
      const countdown = setInterval(() => {
        result2.innerHTML = "Try again in " + time + " seconds.";
        time -= 1;
        if (time <= 0) {
          clearInterval(countdown);
        }
      }, 1000);

      setTimeout(() => {
        if (emailLogin) emailLogin.disabled = false;
        if (passLogin) passLogin.disabled = false;
        if (resetLoginButton) resetLoginButton.disabled = false;
        if (loginButton) loginButton.disabled = false;
         result2.classList.add("result-success");
        result2.innerHTML = "✓ You can try again now.";
        failedAttempts = 0;
      }, 25000);
    }
    return;
  }

  if (rememberMe && rememberMe.checked) {
    localStorage.setItem("rememberMe", "true");
  }

  failedAttempts = 0;
  if (loginForm) {
    if (resetLoginButton) resetLoginButton.style.display = "none";
    loginForm.style.display = "none";
    result2.classList.add("result-success");
    result2.innerHTML = "✓ Login Successful! Welcome back!";
  }
}
document.querySelector(".EmailPass").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (resetPasswordButton) {
      resetPasswordButton.click();
    }
  }
});
function ResetPassword() {
  const emailPass = document.querySelector(".EmailPass");
  const emailValue = emailPass ? emailPass.value.trim() : "";

  if (!emailValue || !emailValue.endsWith("@gmail.com")) {
    result3.innerHTML = "✕ Please enter your Email";
    triggerShake(resetForm);
    result3.style.color = "red";
    return;
  }
  if (resetPasswordButton) {
    resetPasswordButton.style.display = "none";
  }
  if (resetPasswordClearButton) {
    resetPasswordClearButton.style.display = "none";
  }
  if (resetForm) {
    resetForm.style.display = "none";
  }
  if (result3) {
    result3.style.display = "block";
    result3.classList.add("result-success");
    result3.innerHTML = "✓ Password reset successfully!";
  }
  setTimeout(() => {
    if (loginSection) {
      showSection(loginSection);
    }
  }, 5000);
}
