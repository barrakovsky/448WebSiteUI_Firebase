function editUserProfile(){
    const userName = document.querySelector("#userName").value;
     const email = document.querySelector("#inputEmail4").value;
     const address1 = document.querySelector("#inputAddress").value;
     const address2 = document.querySelector("#inputAddress2").value;
     const city = document.querySelector("#inputCity").value;
     const state = document.querySelector("#inputState").value;
     const zip = document.querySelector("#inputZip").value;

    
    userData = {
                  userName : userName,
                  email : email,    
                  address1: address1,
                  address2: address2,
                  city: city, 
                  state: state,
                  zip: zip,
                  userId: firebase.auth().currentUser.uid    
              };

         
              

    db.collection("Users").doc(firebase.auth().currentUser.uid).set(userData).then(function(){
                
                alert("Success, You are now redirected to the account settings page.");                   
                window.location.href = "accountPage.html";

        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
}