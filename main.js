let S_Result = document.getElementsByClassName("Success_Result");
let F_Result = document.getElementsByClassName("Failed_Result");
let Name = document.getElementById("name");
let Marke = document.getElementById("marke");
let Production = document.getElementById("D_Production");
let Type = document.querySelector("#select");
const TypeR =document.querySelector(".type");
let Prix = document.getElementById("prix");
let Promotion = document.getElementsByName("promotion");
let PopUp = document.getElementById("popup");
let Create_P = document.getElementById("Add_btn");
let Update = document.getElementById("Update_btn");
let Name_Regex = /\w/gi;
let  M_Regex = /[a-z]/gi;
let P_Regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/gi;
let mood = "create" ;
let temp;

// create product 

let Add_Pro = [];

Create_P.addEventListener("click" , (e)=>{
 e.preventDefault();
    let arr = [];
  // ======================================= clean data =======================================

  // ================ Name_Validation ====================

  if (Name.value.length === 0) {
    document.getElementById("Name_ER").innerHTML = "ce champ obligatoir";
  } else if (Name.value.length > 15) {
    document.getElementById("Name_ER").innerHTML = "Your name must be between 1 and 15 charachters";
  } else if (Name_Regex.test(Name.value) === false) {
    document.getElementById("Name_ER").innerHTML = "seules les lettres sont autorisees";
  } else {
    document.getElementById("Name_ER").innerHTML = "";
    arr.push(true);
  }

  // ================ Marke_Validation ====================

  if (Marke.value.length === 0) {
    document.getElementById("Marke_ER").innerHTML = "ce champ obligatoir";
  } else if (M_Regex.test(Marke.value) === false) {
    document.getElementById("Marke_ER").innerHTML = "seules les lettres sont autorisees";
  } else {
    document.getElementById("Marke_ER").innerHTML = " ";
    arr.push(true);
  }

  // =================== Prduction_Validation ====================

//   if (Production.value.length === 0) {
//     document.getElementById("Prduction_ER").innerHTML = "ce champ obligatoir";
//   }  else {
//     document.getElementById("Prduction_ER").innerHTML = "";
//     arr.push(true);
//   }

  // ================ Type_Validation ====================

  if (Type.length === 0) {
    document.getElementById("Type_ER").innerHTML = "obligatoir de choisir";
  } else {
    document.getElementById("Type_ER").innerHTML = "";
    arr.push(true);
  }

   // =================== Prix_Validation ====================

   if (Prix.value.length === 0) {
    document.getElementById("Prix_ER").innerHTML = "ce champ obligatoir";
  } else {
    document.getElementById("Prix_ER").innerHTML = "";
    arr.push(true);
  }

  // ================ Promotion_Validation ====================

  let pro = false;
  for (let i = 0; i < Promotion.length; i++) {
    if (Promotion[i].checked === true) {
      pro = true
      break;
    }
  }
  if (pro === false) {
    document.getElementById("Promotion_ER").innerHTML = "please select your group";
  } else {
    document.getElementById("Promotion_ER").innerHTML = "";
    arr.push(true);
  }
  
  // ================ Create_product ====================

if(localStorage.product != null){
  Add_Pro = JSON.parse(localStorage.product);
}

if (arr.length === 5 && mood === "create") {
     let New_Pro =  {
            Name:Name.value,
            Marke:Marke.value,
            Production:Production.value,
            Type:document.getElementById("select").selectedOptions[0]. value,
            Prix:Prix.value,
            promotion: document.getElementsByClassName('promotion:checked')?.value,
            }
    Add_Pro.push(New_Pro); 
    localStorage.setItem("product" , JSON.stringify(Add_Pro));
    showdata();
  }else if(arr.length === 5 && mood === "update"){
    let New_Pro =  {
      Name:Name.value,
      Marke:Marke.value,
      Production:Production.value,
      Type:document.getElementById("select").selectedOptions[0]. value,
      Prix:Prix.value,
      promotion: document.querySelector('input[name="promotion"]:checked')?.value,
    }
    Add_Pro[temp]= New_Pro ;
    localStorage.setItem("product" , JSON.stringify(Add_Pro));
    document.getElementById("Add_btn").innerHTML="Add Product";
    mood = "create"
    showdata();
  }
  
  
    //======================= clear inputs ============================

   Name.value="";
    Marke.value="";
    Production.value="";
    Type.value="";
    Prix.value="";
    document.getElementById("Promo_Y").checked = false;
    document.getElementById("Promo_N").checked = false;
}) 
 

//read 

function showdata(){
  
    let table ="";
    if(Add_Pro.length == 0){
      table=""
    }else {
      for(let i=0;i<Add_Pro.length;i++){
        table +=`
        <tr> 
        <td>${Add_Pro[i].Name}</td>
        <td>${Add_Pro[i].Marke}</td>
        <td>${Add_Pro[i].Production}</td>
        <td>${Add_Pro[i].Type}</td>
        <td>${Add_Pro[i].Prix}</td>
        <td>${Add_Pro[i].Promotion}</td>
        <td><button onclick="EditData(${i})" id="Edit">Edit</button></td>
        <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
      }
    }
    document.getElementById("tbody").innerHTML=table;
         
}


//delete

function DeleteData(i){
  document.getElementById("Product_form").style.display="none"
  document.getElementById("modal").style.display="block";
  delete_Pro.setAttribute("onclick",  `DeletedData(${i})`);
}
function DeletedData(i){
  Add_Pro.splice(i,1);
  localStorage.product = JSON.stringify(Add_Pro); 
  document.getElementById("modal").style.display="none";
  document.getElementById("Product_form").style.display="block"
  showdata();
}


// =============== Cancel_Delete =======================

function Cancel() {
  document.getElementById("modal").style.display="none";
  document.getElementById("Product_form").style.display="block"
}

//Edit

function EditData(i){
   
   Name.value = Add_Pro[i].Name;
   Marke.value = Add_Pro[i].Marke;
   Production.value = Add_Pro[i].Production;
   Type.value = Add_Pro[i].Type;
   Prix.value = Add_Pro[i].Prix;
   Promotion.value = Add_Pro[i].Promotion;
   scroll ({
    top : 0,
    behavior:"smooth",
   })
   document.getElementById("Add_btn").innerHTML="Update";
   mood = "update"
   temp = i ;
}


function HideModal() {
  document.getElementById("modal").style.display="none";
  document.getElementById("Product_form").style.display="block";
}

//Create popup

showdata();