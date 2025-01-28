const { Github } = require('github');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

class GitHubAssistant {
    constructor(token) {
        this.github = new Github({
            token: token
        });
    }

    async analyzeRepository(owner, repo) {
        try {
            const repository = await this.github.repos.get({ owner, repo });
            const contents = await this.github.repos.getContent({ owner, repo, path: '' });
            
            return {
                name: repository.name,
                description: repository.description,
                language: repository.language,
                files: contents.map(file => file.name),
                issues: await this.countIssues(owner, repo)
            };
        } catch (error) {
            console.error('Erreur lors de l\'analyse du repository:', error);
            throw error;
        }
    }

    async countIssues(owner, repo) {
        try {
            const issues = await this.github.issues.listForRepo({ owner, repo });
            return issues.length;
        } catch (error) {
            console.error('Erreur lors du comptage des issues:', error);
            return 0;
        }
    }

    async proposeChanges(owner, repo, analysis) {
        const changes = [];

        if (!analysis.files.includes('README.md')) {
            changes.push({
                path: 'README.md',
                content: `# ${analysis.name}

## Description
${analysis.description || 'Projet sans description'}

## Langage Principal
${analysis.language}

## Statistiques du Projet
- Nombre de fichiers : ${analysis.files.length}
- Nombre de problèmes : ${analysis.issues}

## Généré automatiquement par l'assistant IA`,
                message: 'Création automatique du README'
            });
        }

        return changes;
    }

    async applyChanges(owner, repo, changes) {
        for (const change of changes) {
            try {
                await this.github.repos.createOrUpdateFileContents({
                    owner,
                    repo,
                    path: change.path,
                    message: change.message,
                    content: Buffer.from(change.content).toString('base64'),
                    branch: 'main'
                });
            } catch (error) {
                console.error(`Erreur lors de la modification de ${change.path}:`, error);
                throw error;
            }
        }
    }

    // Nouvelle méthode : Générer un rapport de projet
    async generateProjectReport(owner, repo) {
        const analysis = await this.analyzeRepository(owner, repo);
        const report = {
            project_name: analysis.name,
            description: analysis.description,
            primary_language: analysis.language,
            total_files: analysis.files.length,
            open_issues: analysis.issues,
            files_list: analysis.files
        };

        // Sauvegarder le rapport
        const reportPath = path.join(__dirname, '..', 'reports', `${repo}_report.json`);
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        return report;
    }
}

module.exports = { GitHubAssistant };
