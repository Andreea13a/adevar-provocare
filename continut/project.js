// Selectează butoanele pentru categorii
const familyBtn = document.getElementById("familyBtn");
const friendsBtn = document.getElementById("friendsBtn");
const couplesBtn = document.getElementById("couplesBtn");

// Selectează secțiunea pentru afișarea întrebărilor/provocărilor
const mainSection = document.querySelector("main");

// Variabile pentru a ține evidența alegerilor
let truthCount = 0;
let dareCount = 0;

// Funcție pentru a actualiza statisticile
function updateStats(type) {
    if (type === 'adevar') {
        truthCount++;
        document.getElementById('truthCount').textContent = truthCount;
    } else if (type === 'provocare') {
        dareCount++;
        document.getElementById('dareCount').textContent = dareCount;
    }
}

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
            displayQuestion(question, category); // Trece categoria ca parametru
            updateStats(type); // Actualizează statisticile
        })
        .catch(error => console.error("Eroare la încărcarea fișierului JSON:", error));
}

// Funcție pentru a afișa întrebarea și butoanele "Continuă" și "Înapoi"
function displayQuestion(text, category) {
    if (!text) {
        console.error("Nu există nicio întrebare de afișat!");
        return;
    }
    console.log("Întrebare afișată:", text); // Debugging
    mainSection.innerHTML = `
        <h2>${text}</h2>
        <div class="action-buttons">
            <button class="continue-btn" id="continueBtn">Continuă</button>
            <button class="back-btn" id="backBtn">Înapoi</button>
        </div>
    `;

    // Adaugă eveniment pentru butonul "Continuă"
    const continueBtn = document.getElementById("continueBtn");
    if (continueBtn) {
        continueBtn.addEventListener("click", () => showTruthOrDareButtons(category));
    } else {
        console.error("Butonul 'Continuă' nu a fost creat!");
    }

    // Adaugă eveniment pentru butonul "Înapoi"
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.addEventListener("click", showCategories);
    } else {
        console.error("Butonul 'Înapoi' nu a fost creat!");
    }
}

// Funcție pentru a afișa categoriile
function showCategories() {
    console.log("Se afișează categoriile"); // Debugging
    mainSection.innerHTML = `
        <section id="categories">
            <h2>Alege o categorie:</h2>
            <div class="category-buttons">
                <button id="familyBtn">Familie</button>
                <button id="friendsBtn">Prieteni</button>
                <button id="couplesBtn">Cupluri</button>
            </div>
        </section>
    `;

    // Reatașează evenimentele pentru butoanele de categorii
    document.getElementById("familyBtn").addEventListener("click", () => showTruthOrDareButtons("familie"));
    document.getElementById("friendsBtn").addEventListener("click", () => showTruthOrDareButtons("prieteni"));
    document.getElementById("couplesBtn").addEventListener("click", () => showTruthOrDareButtons("cupluri"));
}

// Funcție pentru a afișa butoanele "Adevăr" și "Provocare"
function showTruthOrDareButtons(category) {
    console.log("Categorie selectată:", category); // Debugging
    mainSection.innerHTML = `
        <h2>Alege Adevăr sau Provocare</h2>
        <div class="truth-dare-buttons">
            <button class="truth-btn" onclick="loadQuestions('${category}', 'adevar')">Adevăr</button>
            <button class="dare-btn" onclick="loadQuestions('${category}', 'provocare')">Provocare</button>
        </div>
    `;
}

// Adaugă evenimente pentru butoanele de categorii
familyBtn.addEventListener("click", () => showTruthOrDareButtons("familie"));
friendsBtn.addEventListener("click", () => showTruthOrDareButtons("prieteni"));
couplesBtn.addEventListener("click", () => showTruthOrDareButtons("cupluri"));