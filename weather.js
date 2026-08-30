const input=document.getElementById("input")
const date=document.getElementById("date");
const cityhtml=document.getElementById("cityhtml");
const img=document.getElementById("img")
const deg=document.getElementById("deg")
const high=document.getElementById("high");
const lows=document.getElementById("lows");
const type=document.getElementById("type");
high.innerHTML=localStorage.getItem("max")?localStorage.getItem("max")+ " °C":"";
lows.innerHTML=localStorage.getItem("min")?localStorage.getItem("min")+ " °C":"";
deg.innerHTML=localStorage.getItem("temp")?localStorage.getItem("temp")+ " °C":"";
cityhtml.textContent=localStorage.getItem("city");

type.src=localStorage.getItem("file");

async function datefun(){
    try{
        const now = new Date(); 
const response =now.toLocaleDateString();
date.innerHTML=response;// This specifically prints the date (e.g., "04/30/2026")

    }
    catch(error)
{
    console.log(error)
    cityhtml.textContent = "City not found";
} 
}

img.addEventListener("click",function(e){
    search();
})
async function search(){
    try{
   
cityhtml.textContent=input.value;
const city=input.value;
localStorage.setItem("city",city)
const temp1=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APIKEY}&units=metric`);
if(!temp1.ok){
    deg.textContent="City not found"
    high.textContent=""
     lows.textContent=""
        localStorage.setItem( "city",""  )
     localStorage.setItem( "min",""  )
     localStorage.setItem( "max",""  )
       localStorage.setItem( "file",""  )
         localStorage.setItem( "temp",""  )
           localStorage.setItem( "weatherType",""  )
     
     type.src=""
    return
}
const json=await temp1.json();
const temp=json.main.temp ;
localStorage.setItem("temp",JSON.stringify(temp)||""   )
if(!localStorage.getItem("temp")||localStorage.getItem("temp")==="null"){deg.innerHTML="";}
else {deg.innerHTML=localStorage.getItem("temp")+ " °C";}
const max=json.main.temp_max ;
localStorage.setItem( "max",max ||""  )
if(!localStorage.getItem("max")||localStorage.getItem("max")==="null"){high.innerHTML="";}
else{high.innerHTML=localStorage.getItem("max")+ " °C";}
const min=json.main.temp_min ;
localStorage.setItem( "min",min||""   )
if(!localStorage.getItem("min")||localStorage.getItem("min")==="null"){lows.innerHTML="";}
else{lows.innerHTML=localStorage.getItem("min")+ " °C";}
const weatherType = json.weather[0].main;

if (weatherType === "Clear"){
   type.src="/sun.jpeg";}
 else if (weatherType === "Clouds") {
    type.src="/cloud.png";
}
else if (weatherType === "Rain") {
    type.src="/rain.png";
}
else{
    type.src= "https://openweathermap.org";
}localStorage.setItem( "weatherType", weatherType )
localStorage.setItem( "file",type.src  )
}catch(error){
    cityhtml.textContent=error;

}







}
datefun()
