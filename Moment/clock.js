const clock=document.querySelector("#clock");

function time(){
    const times=new Date();
    const hours=String(times.getHours()).padStart(2,"0");
    const miutes=String(times.getMinutes()).padStart(2,"0");
    const second=String(times.getSeconds()).padStart(2,"0");
    clock.innerText=`${hours}:${miutes}:${second}`;
}
time();
setInterval(time,1000);