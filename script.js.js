// Import Firebase modules (make sure Firebase SDK is included in your HTML)
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Handle Form Submission
    const wishForm = document.getElementById("wishForm");
    if (wishForm) {
        wishForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent form from refreshing

            // Get values
            let name = document.getElementById("name").value;
            let wish = document.getElementById("wish").value;

            // Store data in Firestore
            db.collection("wishes").add({
                name: name,
                wish: wish,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert("Wish sent successfully! 🎉");
                wishForm.reset(); // Clear form
            })
            .catch(error => console.error("Error saving wish:", error));
        });
    }

    // Display Wishes on wishes.html
    const wishesContainer = document.getElementById("wishesContainer");
    if (wishesContainer) {
        db.collection("wishes").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            wishesContainer.innerHTML = ""; // Clear old wishes
            snapshot.forEach(doc => {
                let wishData = doc.data();
                let wishElement = document.createElement("div");
                wishElement.classList.add("wish");
                wishElement.innerHTML = `<p><strong>${wishData.name}:</strong> ${wishData.wish}</p>`;
                wishesContainer.appendChild(wishElement);
            });
        });
    }
});


