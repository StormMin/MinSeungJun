const clock=document.querySelector("h2#clock");

function sayhello(){
    const times=new Date();
    const hours=String(times.getHours()).padStart(2,"0");
    const minutes=String(times.getMinutes()).padStart(2,"0");
    const second=String(times.getSeconds()).padStart(2,"0");
    clock.innerText=`${hours} : ${minutes}: ${second}`
}
sayhello();
setInterval(sayhello,1000);