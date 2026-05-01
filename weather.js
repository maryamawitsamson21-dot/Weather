const date=document.getElementById("date");
const cityhtml=document.getElementById("cityhtml");
const img=document.getElementById("img")
const deg=document.getElementById("deg")
const high=document.getElementById("high");
const lows=document.getElementById("lows");
const type=document.getElementById("type");
high.innerHTML=localStorage.getItem("max")+ " °C";
lows.innerHTML=localStorage.getItem("min")+ " °C";
deg.innerHTML=localStorage.getItem("temp")+ " °C";
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
    const apiKey=`d8e219e82c08a39eec93e6c4dacabe61`
cityhtml.textContent=input.value;
const city=input.value;
localStorage.setItem("city",city)
const temp1=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
const json=await temp1.json();
const temp=json.main.temp ;
localStorage.setItem("temp",JSON.stringify(temp)   )
deg.innerHTML=localStorage.getItem("temp")+ " °C";
const max=json.main.temp_max ;
localStorage.setItem( "max",max  )
high.innerHTML=localStorage.getItem("max")+ " °C";
const min=json.main.temp_min ;
localStorage.setItem( "min",min  )
lows.innerHTML=localStorage.getItem("min")+ " °C";
const weatherType = json.weather[0].main;

if (weatherType === "Clear"){
   type.src="sun.jpeg";}
 else if (weatherType === "Clouds") {
    type.src="cloud.png";
}
else if (weatherType === "Rain") {
    type.src="rain.png";
}
else{
    type.src= "img.png/search_9373594.png";
}localStorage.setItem( "weatherType", weatherType )
localStorage.setItem( "file",type.src  )
}catch(error){
    cityhtml.textContent=error;

}







}
datefun()
