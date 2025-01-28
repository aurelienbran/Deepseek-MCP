const { GitHubAssistant } = require('../src/github_assistant');
const dotenv = require('dotenv');

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

  test('applyChanges doit modifier le dépôt', async () => {
    const changes = [{
      path: 'README.md',
      content: '# Test Repository\n\nDescription de test',
      message: 'Mise à jour de test'
    }];

    await expect(
      assistant.applyChanges(testRepo.owner, testRepo.repo, changes)
    ).resolves.not.toThrow();
  });
});