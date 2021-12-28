 const images=[
     "amaizing.jpg",
     "tom.jpg",
     "origin.jpg",
 ]
 const chosenImage=images[Math.floor(Math.random()*images.length)];
 const bgImage=document.createElement("img");
bgImage.src=`${chosenImage}`;
 document.body.appendChild(bgImage);