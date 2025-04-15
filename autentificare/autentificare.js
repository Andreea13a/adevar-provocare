document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Previne reîncărcarea paginii
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    // Verificare autentificare
    if (
      (email === env.USER1_EMAIL && password === env.USER1_PASSWORD) ||
      (email === env.USER2_EMAIL && password === env.USER2_PASSWORD)
    ) {
      document.getElementById("loginResult").textContent = "Autentificare reușită!";
      document.getElementById("loginResult").style.color = "black";
      // Redirecționare către pagina principală
      setTimeout(() => {
        window.location.href = "../continut/text.html"; // Calea corectă către fișier
      }, 1000);
    } else {
      document.getElementById("loginResult").textContent = "Email sau parolă incorectă.";
      document.getElementById("loginResult").style.color = "red";
    }
  });