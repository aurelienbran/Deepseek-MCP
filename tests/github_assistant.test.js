const { GitHubAssistant } = require('../src/github_assistant');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

describe('GitHubAssistant', () => {
    let assistant;
    const testRepo = {
        owner: 'aurelienbran',
        repo: 'test-repository'
    };

    beforeAll(() => {
        assistant = new GitHubAssistant(process.env.GITHUB_TOKEN);
    });

    test('analyzeRepository doit retourner les informations du dépôt', async () => {
        const analysis = await assistant.analyzeRepository(testRepo.owner, testRepo.repo);
        
        expect(analysis).toHaveProperty('name');
        expect(analysis).toHaveProperty('description');
        expect(analysis).toHaveProperty('language');
        expect(analysis).toHaveProperty('files');
        expect(analysis).toHaveProperty('issues');
    });

    test('proposeChanges doit générer des modifications pertinentes', async () => {
        const mockAnalysis = {
            name: 'Test Repository',
            description: 'Un dépôt de test',
            language: 'JavaScript',
            files: [],
            issues: 0
        };

        const changes = await assistant.proposeChanges(testRepo.owner, testRepo.repo, mockAnalysis);
        
        expect(changes).toBeInstanceOf(Array);
        changes.forEach(change => {
            expect(change).toHaveProperty('path');
            expect(change).toHaveProperty('content');
            expect(change).toHaveProperty('message');
        });
    });

    test('generateProjectReport doit créer un rapport JSON', async () => {
        const report = await assistant.generateProjectReport(testRepo.owner, testRepo.repo);
        
        expect(report).toHaveProperty('project_name');
        expect(report).toHaveProperty('description');
        expect(report).toHaveProperty('primary_language');
        expect(report).toHaveProperty('total_files');
        expect(report).toHaveProperty('open_issues');
        expect(report).toHaveProperty('files_list');

        // Vérifier que le fichier a été créé
        const reportPath = path.join(__dirname, '..', 'reports', `${testRepo.repo}_report.json`);
        expect(fs.existsSync(reportPath)).toBe(true);
    });
});
