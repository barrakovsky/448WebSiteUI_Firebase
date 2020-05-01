var db = firebase.firestore();
var auth = firebase.auth();
var user = firebase.auth().currentUser;

async function myUserFunction(){
    var userlogin = document.querySelector("#userLogin");
    
    
    await firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
              
              var userUid = user.uid;
              console.log(userUid);
        
                var userData = db.collection("Users").doc(userUid);
                var userName; 

                userData.get().then(function(doc) {
                    if (doc.exists) {
                        console.log(doc.data().userName);
                       
                        var userlogin = document.querySelector("#userLogin");
                         userlogin.innerHTML = "";
                        userlogin.innerHTML = 
                            "<label class='font-weight-bold ml-3'>Welcome " + doc.data().userName +"</label>"+
                            "<div class='dropdown-divider'></div>" +
                            "<a class='dropdown-item' href='accountPage.html'>Account Settings</a>" +
                            "<button class='dropdown-item' type='button' onclick='signOut(); return false;'>Logout</button>";
                        
                        onclick="window.location.href = 'https://www.w3docs.com';" 
                        
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        userName = "no Success"
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });


             
                 
    
          }
    
    
    
    });

    
}

async function signOut(){
    firebase.auth().signOut();
    alert("You are now signed out");
    //when signing out need to set the previouse menu
    
    var userlogin = document.querySelector("#userLogin");
    userlogin.innerHTML = "";
     userlogin.innerHTML = "<form class='px-4 py-3'>" +
                            "<div class='form-group'>" +
                                "<label for='userEmail'>Email address</label>" +
                                "<input type='email' class='form-control' id='userEmail' placeholder='email@example.com'>" +
                                "</div>" +
                            "<div class='form-group'>" +
                                "<label for='userPassword'>Password</label>"+
                               "<input type='password' class='form-control' id='userPassword' placeholder='Password'>"+
                            "</div>"+
                            "<div class='form-check'>"+
                                "<input type='checkbox' class='form-check-input' id='dropdownCheck'>"+
                                "<label class='form-check-label' for='dropdownCheck'>Remember me</label>"+
                                "<button type='button' class='btn btn-primary' id='btnLogin' onclick='signInFunction(); return false;'>Sign in</button>"+
                            "</div>" +
                        "</form>"+
                          "<div class='dropdown-divider'></div>"+
                          "<a class='dropdown-item' href='userLogin.html'>New around here? Sign up</a>"+
                          "<a class='dropdown-item' href='#'>Forgot password?</a>";
}


async function signInFunction(){
    
    const email = document.querySelector("#userEmail").value;
    const password = document.querySelector("#userPassword").value; 
    
    if(!email || !password){
       alert("Email and password are required"); 
       }
    
   await firebase.auth().signInWithEmailAndPassword(email, password);
      
        
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("logged in");
          
          
      } else {
       console.log("not logged in");
      }
    });
    
    
}

async function registration(){
    
    const userName = document.querySelector("#userName").value;
     const email = document.querySelector("#inputEmail4").value;
     const password = document.querySelector("#inputPassword4").value;
     const address1 = document.querySelector("#inputAddress").value;
     const address2 = document.querySelector("#inputAddress2").value;
     const city = document.querySelector("#inputCity").value;
     const state = document.querySelector("#inputState").value;
     const zip = document.querySelector("#inputZip").value;
    
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
        if(error.code == 'auth/email-already-in-use'){
            alert("email is already in use, please login");
        }
      // ...
    });
    
    await firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
              userData = {
                  userName : userName,
                  email: email,
                  address1: address1,
                  address2: address2,
                  city: city, 
                  state: state,
                  zip: zip,
                  userId: firebase.auth().currentUser.uid
              };

    db.collection("Users").doc(firebase.auth().currentUser.uid).set(userData).then(function(){
                
                alert("Success, You are now redirected to the main page.");
                //setting new dropdown menu
                 var userlogin = document.querySelector("#userLogin");
                 userlogin.innerHTML = "";
                userlogin.innerHTML = "<a class='dropdown-item' href='accountPage.html'>Account Settings" +
                    "<button class='dropdown-item' type='button'>Logout</button>";
                
        
       
                window.location.href = "index.html";

                }).catch(function(error) {
                    console.error("Error adding document: ", error);
                });

          } else {
           console.log("not logged in");
          }

        });
    
    
  
    
    
}

