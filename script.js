async function lancerAnalyse() {
  console.log("Analyse des modules actifs...");
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