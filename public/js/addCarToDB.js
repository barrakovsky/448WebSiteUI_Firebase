var db = firebase.firestore();



async function fAddCarToDB(){
    
    var user = await firebase.auth().currentUser.uid;
    
    var typeCheckBox = document.getElementById("typeBox");
    if(typeCheckBox.checked){
        //take the value from the input
        //the value can't be null
        var type = document.getElementById("inputType").value;
        if(!type){
            alert("please type in your car's type or select from the list.");
        }
    }else{
        var type = document.getElementById("typeSelection").value;
    }
    
    var makeCheckBox = document.getElementById("makeBox");
    if(makeCheckBox.checked){
        //take the value from the input
        //the value can't be null
        var make = document.getElementById("inputMake").value;
        if(!type){
            alert("please type in your car's make or select from the list.");
        }
        
    }else{
        var make = document.getElementById("makeSelection").value;
    }
    
    
    var colorCheckBox = document.getElementById("colorBox");
    if(colorCheckBox.checked){
        //take the value from the input
        //the value can't be null
        var color = document.getElementById("colorInput").value;
        if(!type){
            alert("please type in your car's exterior color or select from the list.");
        }
        
    }else{
        var color = document.getElementById("exteriorColorSelection").value;
    }
    
    var year = document.getElementById("yearSelection").value;
    if(year == "Choose..."){
        alert("Please select a year");
    }
    
    var model = document.getElementById("modelInput").value;
    if(!model){
        alert("Please enter your car's model");
    }
    
    var mileage = document.getElementById("mileageInput").value;
    
     if(!mileage){
        alert("Please enter your car's mileage");
    }
        
    var price = document.getElementById("priceInput").value;
    
     if(!price){
        alert("Please enter your car's sell price");
    }
    
    carData = {
        type: type, 
        make: make, 
        exteriorColor: color, 
        model: model, 
        mileage: mileage,
        price: price,
        year: year
    }
    
    var docID;
   
    
    await db.collection("Users").doc(user).collection("CarsToSell").add(carData);
    
    var carDoc = await db.collection("Users").doc(user).collection("CarsToSell").where("type","==", type).where("make","==",make).where("exteriorColor","==", color).where("model","==",model).where("price","==",price).where("year","==",year).get().then(function(querySnapshot) {
                querySnapshot.forEach(async function(doc) {
                    
                    docID = await doc.id;
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    
    
    
    
    
    var carDocument = await db.collection("Users").doc(user).collection("CarsToSell").doc(docID);
    
    await carDocument.set({
        carID: docID
        
    },{merge: true});
    
   
    
    await carDocument.get().then(async function(doc) {
        
        if (doc.exists) {
                
            await db.collection("Cars").doc(docID).set(doc.data());
            
            var carsForSellDiv = document.getElementById("carsToSell");
            carsForSellDiv.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";
  
            
            
            
            alert("Your car has been added to out db, you will now be redirected to your account page.");
            window.location.href = "accountPage.html";
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    
    
    
    
    
}