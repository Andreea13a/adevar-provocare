// Selectează butoanele pentru categorii
const familyBtn = document.getElementById("familyBtn");
const friendsBtn = document.getElementById("friendsBtn");
const couplesBtn = document.getElementById("couplesBtn");

// Selectează secțiunea pentru afișarea întrebărilor/provocărilor
const mainSection = document.querySelector("main");

// Funcție pentru a încărca întrebări/provocări dintr-un fișier JSON
function loadQuestions(category, type) {
    const fileName = `./${category}-${type}.json`; // Construiește corect calea către fișierul JSON
    console.log("Se încarcă fișierul:", fileName); // Debugging
    fetch(fileName)
        .then(response => {
            console.log("Răspuns primit:", response); // Debugging
            if (!response.ok) {
                throw new Error(`Eroare la încărcarea fișierului: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Date încărcate:", data); // Debugging
            const randomIndex = Math.floor(Math.random() * data.length);
            const question = data[randomIndex];
            console.log("Întrebare selectată:", question); // Debugging
            displayQuestion(question);
        })
        .catch(error => console.error("Eroare la încărcarea fișierului JSON:", error));
}

function displayQuestion(text) {
    if (!text) {
        console.error("Nu există nicio întrebare de afișat!");
        return;
    }
    console.log("Întrebare afișată:", text); // Debugging
    mainSection.innerHTML = `
        <h2>${text}</h2>
    `;
}

// Funcție pentru a afișa butoanele "Adevăr" și "Provocare"
function showTruthOrDareButtons(category) {
    console.log("Categorie selectată:", category); // Debugging
    mainSection.innerHTML = `
        <h2>Alege Adevăr sau Provocare</h2>
        <div class="truth-dare-buttons">
            <button onclick="loadQuestions('${category}', 'adevar')">Adevăr</button>
            <button onclick="loadQuestions('${category}', 'provocare')">Provocare</button>
        </div>
    `;
}

// Adaugă evenimente pentru butoanele de categorii
familyBtn.addEventListener("click", () => showTruthOrDareButtons("familie"));
friendsBtn.addEventListener("click", () => showTruthOrDareButtons("prieteni"));
couplesBtn.addEventListener("click", () => showTruthOrDareButtons("cupluri"));