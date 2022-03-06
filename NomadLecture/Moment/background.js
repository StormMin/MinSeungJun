const images=[
    "amaizing.jpg",
    "tom.jpg",
    "origin.jpg",
]
const chosenImg=images[Math.floor(Math.random()*images.length)];
const indexImg=document.createElement("img");
indexImg.src=`${chosenImg}`;
document.body.appendChild(indexImg);