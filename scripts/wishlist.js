
let items=JSON.parse(localStorage.getItem("wishList"))||[];
console.log("items:",items)
let container=document.getElementById("container");

if(items.length==0){
   let head=document.getElementById("head1");
   head.style.display="block"
}
else{
displayItems(items);
function displayItems(items){
container.innerHTML="";
items.forEach((el,index)=>{
    let {brand,image,price}=el;
    let div=document.createElement("div");
    let img=document.createElement("img");
    img.src=image;
    img.id="image";
    let name1=document.createElement("h4");
    name1.innerText=brand;
  
    let price1=document.createElement("h3");
    price1.innerText=`₹${price}`;
    price.id="priceid";
    let btn=document.createElement("button");
    btn.innerText="Remove";
    btn.id="btnid";
    btn.addEventListener("click",function(){
        deleteItem(index);
    })

    div.append(img,name1,price1,btn);
container.append(div);

})


}


 deleteItem=(index)=>{ 
    items.splice(index,1);
    if(items.length==0){
        shownoItems();
    }
    console.log(items); 
    localStorage.setItem("listItems",JSON.stringify(items));
    displayItems(items);

}
}

shownoItems=()=>{
    head1.style.display="block";
}