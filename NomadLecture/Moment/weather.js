const API_KEY='412bef2f726b3961f6022179027b554f';
function succes(position){
    const lat=position.coords.latitude;
    const lng=position.coords.longitude;
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    const nam=document.querySelector("#weather :first-child");
    const wea=document.querySelector("#weather :nth-child(2)");
    const tem=document.querySelector("#weather :nth-child(3)");
    fetch(url)
        .then(Response => Response.json())
        .then((data)=>{
            const name=data.name;
            const weather=data.weather[0].main;
            const temp=data.main.temp;
            nam.innerText=`${name}`;
            wea.innerText=`${weather}`;
            tem.innerText=`${temp}℃`;
        });
}

function error(position){
    console.log("no")
}
navigator.geolocation.getCurrentPosition(succes,error);