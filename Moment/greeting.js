const loginForm=document.querySelector("#login-form");
const loginInput=loginForm.querySelector("input");
const greeting=document.querySelector("#greeting");

function paints(name){
    greeting.innerText=`Hello ${name}`;
    greeting.classList.remove("hidden");
}

function handlebutton(event){
    event.preventDefault();
    loginForm.classList.add("hidden");
    localStorage.setItem("user",loginInput.value);
    paints(loginInput.value);
}

const savedloginForm=localStorage.getItem("user");
if (savedloginForm==null){
    loginForm.classList.remove("hidden");
    loginForm.addEventListener("submit",handlebutton);
}
else {
    paints(savedloginForm);
}
