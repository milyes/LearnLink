// Modules IA simulés (à remplacer par fetch si tu veux charger depuis JSON)
let modulesIA = [
  { id: "001", nom: "Détection d'intrusion", algorithme: "Analyse comportementale", actif: true },
  { id: "002", nom: "Filtrage intelligent", algorithme: "Réseau de neurones", actif: false },
  { id: "003", nom: "Analyse réseau", algorithme: "SVM", actif: true }
];

// Affiche les modules dans une table interactive
function afficherModules() {
  const tbody = document.querySelector('#table-modules tbody');
  tbody.innerHTML = '';

  modulesIA.forEach((mod, index) => {
    const ligne = document.createElement('tr');
    ligne.innerHTML = `
      <td>${mod.nom}</td>
      <td>${mod.algorithme}</td>
      <td>
        <input type="checkbox" ${mod.actif ? 'checked' : ''} onchange="toggleModule(${index})">
      </td>
    `;
    tbody.appendChild(ligne);
  });
}

// Active/désactive un module
function toggleModule(index) {
  modulesIA[index].actif = !modulesIA[index].actif;
}

// Simule l'initialisation IA
async function initialiserIA() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

// Simule l'analyse IA et affiche les résultats
async function lancerAnalyse() {
  return new Promise(resolve => {
    setTimeout(() => {
      const actifs = modulesIA.filter(mod => mod.actif);
      let html = `<h3>🧠 Résultats de l'analyse IA</h3>`;

      if (actifs.length === 0) {
        html += `<p>Aucun module actif. Veuillez en activer au moins un.</p>`;
      } else {
        html += `<table style="margin:auto; border-collapse: collapse; width: 60%;">
          <thead>
            <tr>
              <th>Module</th>
              <th>Algorithme</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>`;

        actifs.forEach(mod => {
          html += `<tr>
            <td>${mod.nom}</td>
            <td>${mod.algorithme}</td>
            <td style="color: green;">Actif</td>
          </tr>`;
        });

        html += `</tbody></table>`;
      }

      document.getElementById('resultat').innerHTML = html;
      resolve();
    }, 1500);
  });
}

// Lancement complet IA
async function lancerIA() {
  const bouton = document.getElementById('lancer-ia');
  const resultat = document.getElementById('resultat');

  bouton.disabled = true;
  bouton.style.opacity = 0.6;
  resultat.innerHTML = '<div class="loader"></div><p>Analyse en cours...</p>';

  try {
    await initialiserIA();
    await lancerAnalyse();
    bouton.innerHTML = 'Analyse terminée <i class="fas fa-check"></i>';
  } catch (erreur) {
    console.error('Erreur :', erreur);
    resultat.innerHTML = `❌ Erreur : ${erreur.message || 'Analyse impossible.'}`;
    bouton.innerHTML = 'Réessayer <i class="fas fa-redo"></i>';
  }

  bouton.disabled = false;
  bouton.style.opacity = 1;
}

// Initialisation au chargement
window.onload = () => {
  afficherModules();
  document.getElementById('lancer-ia').addEventListener('click', lancerIA);
};