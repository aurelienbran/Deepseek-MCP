const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');

dotenv.config();

class GitHubAssistant {
  constructor(githubToken) {
    this.octokit = new Octokit({ auth: githubToken });
  }

  async analyzeRepository(owner, repo) {
    try {
      const repoDetails = await this.octokit.repos.get({ owner, repo });
      const contents = await this.octokit.repos.getContent({ owner, repo, path: '' });
      
      return {
        name: repoDetails.data.name,
        description: repoDetails.data.description,
        language: repoDetails.data.language,
        files: contents.data.map(file => file.name),
        issues: await this.octokit.issues.listForRepo({ owner, repo }).then(r => r.data.length)
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse du repository:', error);
      throw error;
    }
  }

  async proposeChanges(owner, repo, analysis) {
    const changes = [];

    // Amélioration du README si absent
    if (!analysis.files.includes('README.md')) {
      changes.push({
        path: 'README.md',
        content: `# ${analysis.name}

## Description
${analysis.description || 'Projet sans description'}

## Langage Principal
${analysis.language}

## Statistiques
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
        await this.octokit.repos.createOrUpdateFileContents({
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
}

module.exports = { GitHubAssistant };