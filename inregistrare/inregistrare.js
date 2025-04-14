// Pasul 1 - Detalii personale
document.getElementById("formStep1").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Validare număr telefon (+373)
    const phoneRegex = /^\+373\d{8}$/;
    const phone = this.phone.value.trim();
  
    if (!phoneRegex.test(phone)) {
      alert("Numărul de telefon trebuie să înceapă cu +373!");
      return;
    }
  
    // Salvăm datele introduse și trecem la pasul 2
    sessionStorage.setItem("firstName", this.firstName.value);
    sessionStorage.setItem("lastName", this.lastName.value);
    sessionStorage.setItem("email", this.email.value);
    sessionStorage.setItem("phone", phone);
  
    // Ascundem pasul 1 și afișăm pasul 2
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
  });
  
  // Pasul 2 - Setează parola
  document.getElementById("formStep2").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Validare parolă
    const password = this.password.value;
    if (password.length < 8) {
      alert("Parola trebuie să aibă cel puțin 8 caractere!");
      return;
    }
  
    // Salvăm parola și trecem la pasul 3
    sessionStorage.setItem("password", password);
  
    // Ascundem pasul 2 și afișăm pasul 3
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
  
    // După înregistrare, aici poți trimite datele pe server sau într-un fișier.
    setTimeout(function() {
      document.getElementById("inregistrare").style.display = "none"; // Ascunde formularul de înregistrare
      document.getElementById("autentificare").style.display = "block"; // Afișează formularul de autentificare
    }, 500); // O mică întârziere pentru a da utilizatorului timp să vadă mesajul
  });
  