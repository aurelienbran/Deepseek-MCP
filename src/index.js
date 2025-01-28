const dotenv = require('dotenv');
const { GitHubAssistant } = require('./github_assistant');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

async function main() {
    try {
        // Vérifier la présence du token GitHub
        if (!process.env.GITHUB_TOKEN) {
            throw new Error('Token GitHub manquant. Veuillez configurer le .env');
        }

        // Initialiser l'assistant GitHub
        const assistant = new GitHubAssistant(process.env.GITHUB_TOKEN);

        // Exemple d'utilisation : génération de rapport pour un dépôt test
        const reportData = await assistant.generateProjectReport('aurelienbran', 'test-repository');

        // Créer un dossier de rapports s'il n'existe pas
        const reportsDir = path.join(__dirname, '..', 'reports');
        fs.mkdirSync(reportsDir, { recursive: true });

        // Sauvegarder le rapport
        const reportPath = path.join(reportsDir, 'project_report.json');
        fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));

        console.log('Rapport généré avec succès :', reportPath);
        console.log('Détails du rapport :', reportData);

    } catch (error) {
        console.error('Erreur lors de l\'exécution :', error);
        process.exit(1);
    }
}

// Lancer le script principal
main();
