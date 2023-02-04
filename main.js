let Result = document.getElementById("Result");
let Name = document.getElementById("name");
let Marke = document.getElementById("marke");
let Production = document.getElementById("D_Production");
let Type = document.querySelector("#select");
let Prix = document.getElementById("prix");
let promotions = document.getElementsByName("promotion");
let Create_P = document.getElementById("Add_btn");
let Name_Regex = /[a-zA-Z-\s\w\s]+$/gi;
let M_Regex = /[a-zA-Z-\s]+$/gi;
let P_Regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
let mood = "create";
let temp;

// ============================ Create product =========================

let Add_Pro = [];

Create_P.addEventListener("click", (e) => {
    e.preventDefault();
    let arr = [];

    // ======================================= Name_Validation ====================================

    if (Name.value.length === 0) {
        document.getElementById("Name_ER").innerHTML = "required field";
    } else if (!(Name_Regex.test(Name.value))) {
        document.getElementById("Name_ER").innerHTML = "You can't use special characters";
    } else {
        document.getElementById("Name_ER").innerHTML = ""
        arr.push(true);
    }

    // ====================================== Marke validation ===============================

    if (Marke.value.length === 0) {
        document.getElementById("Marke_ER").innerHTML = "required field";
    } else if (M_Regex.test(Name.value) === false) {
        document.getElementById("Marke_ER").innerHTML = "Only Letters Allowed";
    } else {
        document.getElementById("Marke_ER").innerHTML = ""
        arr.push(true);
    }

    // ================ Production_Validation ====================

    if (Production.value.length === 0) {
        document.getElementById("Prduction_ER").innerHTML = "Required field";
    } else if (P_Regex.test(Production.value) === false) {
        document.getElementById("Prduction_ER").innerHTML = "invalid date format (dd/mm/yyyy)";
    } else {
        document.getElementById("Prduction_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Type_Validation ====================

    if (Type.value === "") {
        document.getElementById("Type_ER").innerHTML = "Required field";
    } else {
        document.getElementById("Type_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Prix_Validation ====================

    if (Prix.value === "") {
        document.getElementById("Prix_ER").innerHTML = "Required field";
    } else {
        document.getElementById("Prix_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Promotion_Validation ====================

    if (promotions[0].checked === false && promotions[1].checked == false) {
        document.getElementById("promotion_ER").innerHTML = "You must check yes or no";
    } else {
        document.getElementById("promotion_ER").innerHTML = "";
        arr.push(true);
    }

    // ================ Create_product ====================

    if (localStorage.product != null) {
        Add_Pro = JSON.parse(localStorage.product);
    }

    if (arr.length === 6 && mood === "create") { // this part is for creating a new product
        let New_Pro = {
            Name: Name.value,
            Marke: Marke.value,
            Production: Production.value,
            Type: document.getElementById("select").selectedOptions[0].value,
            Prix: Prix.value,
            promotion: document.querySelector('input[name="promotion"]:checked')?.value
        }
        Add_Pro.push(New_Pro);
        localStorage.setItem("product", JSON.stringify(Add_Pro));
        Name.value = "";
        Marke.value = "";
        Production.value = "";
        Type.value = "";
        Prix.value = "";
        document.getElementById("Promo_Y").checked = false;
        document.getElementById("Promo_N").checked = false;
        Result.innerHTML ="Your Product added successfuly";
        Result.style.color="green";
        Result.style.backgroundColor="white";
        showdata();
    } else if (arr.length === 6 && mood === "update") { // this part is for updating a existing product
        let New_Pro = {
            Name: Name.value,
            Marke: Marke.value,
            Production: Production.value,
            Type: document.getElementById("select").selectedOptions[0].value,
            Prix: Prix.value,
            promotion: document.querySelector('input[name="promotion"]:checked')?.value
        }
        Add_Pro[temp] = New_Pro;
        localStorage.setItem("product", JSON.stringify(Add_Pro));
        document.getElementById("Add_btn").innerHTML = "Add Product";
        mood = "create"
        Name.value = "";
        Marke.value = "";
        Production.value = "";
        Type.value = "";
        Prix.value = "";
        document.getElementById("Promo_Y").checked = false;
        document.getElementById("Promo_N").checked = false;
        Result.innerHTML ="Your Product Updated successfuly";
        Result.style.color="green";
        Result.style.backgroundColor="white";
        showdata();
    }else {
        Result.innerHTML ="an error occurred";
        Result.style.color="red";
        Result.style.backgroundColor="white";
    }

})

// ================= read_data =========================

function showdata() {

    let table = "";
    if (Add_Pro.length == 0) {
        table = ""
    } else {
        for (let i = 0; i < Add_Pro.length; i++) {
            table += `
        <tr>
        <td>${
                Add_Pro[i].Name
            }</td>
        <td>${
                Add_Pro[i].Marke
            }</td>
        <td>${
                Add_Pro[i].Production
            }</td>
        <td>${
                Add_Pro[i].Type
            }</td>
        <td>${
                Add_Pro[i].Prix
            }</td>
        <td>${
                Add_Pro[i].promotion
            }</td>
        <td><button onclick="EditData(${i})" id="Edit">Edit</button></td>
        <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
        }
    }
    document.getElementById("tbody").innerHTML = table;

}


// delete

function DeleteData(i) {
    document.getElementById("Product_form").style.display = "none"
    document.getElementById("modal").style.display = "block";
    document.getElementById("Output_form").style.display = "none";
    delete_Pro.setAttribute("onclick", `ConfirmDelete(${i})`);
}
function ConfirmDelete(i) {
    Add_Pro.splice(i, 1);
    localStorage.product = JSON.stringify(Add_Pro);
    document.getElementById("modal").style.display = "none";
    document.getElementById("Product_form").style.display = "block";
    document.getElementById("Output_form").style.display = "block";
    showdata();
}


// =============== Cancel_Delete =======================

function Cancel() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("Product_form").style.display = "block"
    document.getElementById("Output_form").style.display = "block";
}

// ===================== Edit =========================

function EditData(i) {

    Name.value = Add_Pro[i].Name;
    Marke.value = Add_Pro[i].Marke;
    Production.value = Add_Pro[i].Production;
    Type.value = Add_Pro[i].Type;
    Prix.value = Add_Pro[i].Prix;
    promotion = Add_Pro[i].promotion;
    scroll({top: 0, behavior: "smooth"})
    document.getElementById("Add_btn").innerHTML = "Update";
    mood = "update"
    temp = i;
}

function HideModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("Product_form").style.display = "block";
    document.getElementById("Output_form").style.display = "block";
}

showdata();
