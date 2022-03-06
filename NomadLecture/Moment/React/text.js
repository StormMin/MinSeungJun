const button = document.querySelector("#button");
const inw = button.querySelector("span:last-child");
let cnt = 0;
function handlebutton(event) {
  event.preventDefault();
  cnt++;
  inw.innerText = cnt;
}
button.addEventListener("click", handlebutton);
