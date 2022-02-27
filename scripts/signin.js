let mob=document.getElementById("bkcolor");
function toEmail(){
    if(mob.innerText=="USE EMAIL"){
    document.getElementById("bkcolor").innerText="USE MOBILE";
    document.getElementById("mobile").type="email";
    document.getElementById("mobile").placeholder="EMAIL(OTP will be send for verification)";
    }
    else{
        document.getElementById("bkcolor").innerText="USE EMAIL";
        document.getElementById("mobile").type="number";
    document.getElementById("mobile").placeholder="MOBILE(OTP will be send for verification)"; 
    }
}

async function sendOtp(){
    var conatiner=document.getElementById("container");
    var con=document.getElementById("verify");
    var empty=document.getElementById("mobile").value;

if(empty==""){
         alert("Please enter the Email Id!")
    }
    else{
try{
    var data={
        email:empty,
    }
    data=JSON.stringify(data)
    console.log('data: ', data);
    
}catch(err){
    console.log('err: ', err);

}
let reg_api=`http://localhost:5500/email`;
let response=await fetch(reg_api,{
    method:'POST',
    body:data,
    headers:{
        "Content-Type":'application/json'
    },
})
let reg_data=await response.json();
console.log('reg_data: ', reg_data);

     con.style.display="none";
     conatiner.style.display="block";
}
}


function validateEmail(email){
    const mailformat=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(mailformat.test(email.toLowerCase())){
        return true;
    }
    else{
        return false;
    }
}
function resendOtp(){
    var conatiner=document.getElementById("container");
    var con=document.getElementById("verify");
    con.style.display="none";
        conatiner.style.display="block";
    setTimeout(()=>{
        alert("OTP="+x);
    },2500);
}

async function verification(){
    
    var input=document.getElementById("input-otp").value;
    let container=document.getElementById("container");
    let con=document.getElementById("verify");
    let bkcolor=document.getElementById("bkcolor");
    let mobile=document.getElementById("mobile");
    let mobile1=document.getElementById("mobile").value;
    let first_name=document.getElementById("first-name");
    let last_name=document.getElementById("last-name");
    let mob=document.getElementById("mob");
    let email_id=document.getElementById("email-id");
    let create=document.getElementById("create");


    console.log(typeof(input));

    
    if(input==""){
        alert("Enter the OTP");
    }
    else{
   

        try{
            var data={
        email:mobile1,
        otp:input
            }
            data=JSON.stringify(data)
            console.log('data: ', data);
            
        }catch(err){
            console.log('err: ', err);
        
        }
        let reg_api=`http://localhost:5500/otp`;
        let response=await fetch(reg_api,{
            method:'POST',
            body:data,
            headers:{
                "Content-Type":'application/json'
            },
        })
        let reg_data=await response.json();
        console.log('reg_data: ', reg_data);

        if("msg" in reg_data){
            if(reg_data.msg=="Wrong otp"){
                alert(reg_data.msg);
            }
            else{
                container.style.display="none";
                con.style.display="none";
                bkcolor.style.display="none";
                first_name.style.display="block";
                last_name.style.display="block";
                mob.style.display="block";
                create.style.display="block"
            }
        }
        else{
            console.log(reg_data);
            let user = reg_data.user;
            localStorage.setItem("login_detail",JSON.stringify(user));
            window.location.href="./index.html";
        }
        }
}

async function toHome(){
    let first_name=document.getElementById("first-name").value;
    let last_name=document.getElementById("last-name").value;
    let mob=document.getElementById("mob").value;
    let email=document.getElementById("mobile").value;

    try{
        let details={
            first_name:first_name,
            last_name:last_name,
            mobile:mob,
            email:email
        }
        data=JSON.stringify(details);
        console.log('data: ', data);
        
    }catch(err){
        console.log('err: ', err);
    
    }
    let reg_api=`http://localhost:5500/user`;
    let response=await fetch(reg_api,{
        method:'POST',
        body:data,
        headers:{
            "Content-Type":'application/json'
        },
    })
    let reg_data=await response.json();
    console.log('reg_data: ', reg_data);

    window.location.href="./index.html";
}
