var db = firebase.firestore();
var user = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
        var docRef = db.collection("Users").doc(user.uid);
        docRef.get().then(function(doc){
    
            if (doc.exists) {
                console.log("Document data:", doc.data());

                var userNameNode = document.getElementById("userName");
                userNameNode.value = doc.data().userName;

                var emailNode = document.getElementById("inputEmail4");
                emailNode.value = doc.data().email;
                emailNode.disabled = true;
                
                var addressNode = document.getElementById("inputAddress");
                addressNode.value = doc.data().address1;
                
                
                var address2Node = document.getElementById("inputAddress2");
                address2Node.value = doc.data().address2;
                
                var cityNode = document.getElementById("inputCity");
                cityNode.value = doc.data().city;
                
                var stateArray = doc.data().state.split(" ");
                if(stateArray.length == 2){
                    var state = stateArray[0].concat(stateArray[1]);
                }else{
                    var state = stateArray[0];
                }
                
                document.getElementById(state).selected = true
                
                var zipNode = document.getElementById("inputZip");
                zipNode.value = doc.data().zip;
                
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
        });
    }
});









