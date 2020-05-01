var db = firebase.firestore();
var user = firebase.auth().currentUser;


/*docRef.get().then(function(doc){
    
    if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
});*/

firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
        var docRef = db.collection("Users").doc(user.uid);
        docRef.get().then(function(doc){
    
            if (doc.exists) {
                console.log("Document data:", doc.data());

                var userNameNode = document.getElementById("userName");
                userNameNode.innerHTML += "<label class='col-md-auto'>" + doc.data().userName+"</label>";

                var emailNode = document.getElementById("email");
                emailNode.innerHTML += "<label class='col-md-auto'>" + doc.data().email +"</label>";
                
                var addressNode = document.getElementById("address");
                addressNode.innerHTML += "<label class='col-md-auto'>" + doc.data().address1 +"</label>";
                
                
                var address2Node = document.getElementById("address2");
                address2Node.innerHTML += "<label class='col-md-auto'>" + doc.data().address2 +"</label>";
                
                var cityNode = document.getElementById("city");
                cityNode.innerHTML += "<label class='col-md-auto'>" + doc.data().city +"</label>";
                
                var stateNode = document.getElementById("state");
                stateNode.innerHTML += "<label class='col-md-auto'>" + doc.data().state +"</label>";
                
                var zipNode = document.getElementById("zipCode");
                zipNode.innerHTML += "<label class='col-md-auto'>" + doc.data().zip +"</label>";
                
                
                var carsToSellDiv = document.getElementById("carsToSell");
                db.collection("Users").doc(user.uid).collection("CarsToSell").onSnapshot(async function(querySnapshot){
                    querySnapshot.forEach(async (doc) => {

                    console.log("inside the cars query"); 
                    var data = await doc.data();
                      carsToSellDiv.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";

                    });
                });

                
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
        });
    }
});

