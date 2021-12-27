
const loginForm=document.querySelector("#login-form");
const loginInput=document.querySelector("#login-form input");
const greeting=document.querySelector("#greeting");
const ID="user";
const HID="hidden"
function handleclick(event){
    event.preventDefault();
    loginForm.classList.add(HID);
   const user=loginInput.value;
   localStorage.setItem(ID,user);
    paintGreetings(user);
}
function paintGreetings(username){
    greeting.innerText=`Hello ${username}`;
    greeting.classList.remove(HID);
}
const saved=localStorage.getItem(ID);
if (saved===null){
    loginForm.classList.remove(HID);
    loginForm.addEventListener("submit",handleclick);
}
else {
    paintGreetings(saved);
}