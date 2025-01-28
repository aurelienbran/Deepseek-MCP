# Installation de Deepseek MCP sur Windows

## Prérequis Système

### Configuration Matérielle
- Windows 11 (64-bit)
- Processeur x64
- Minimum 16 Go RAM (32 Go recommandés)
- 100 Go d'espace disque libre
- Connexion Internet haut débit

### Logiciels Requis
- Node.js LTS
- Python 3.9+
- Git
- Ollama
- OpenWebUI

## Étape 1 : Préparation de l'Environnement

### Installation de Node.js
1. Télécharger [Node.js LTS](https://nodejs.org/)
2. Installer en cochant :
   - Ajouter au PATH
   - Installer les outils de compilation

### Installation de Python
1. Télécharger [Python](https://www.python.org/)
2. Installer en cochant :
   - Add Python to PATH
   - Install pip

### Vérification des Installations
```powershell
node --version
npm --version
python --version
pip --version
```

## Étape 2 : Installation d'Ollama et OpenWebUI

### Ollama
```powershell
# Installation d'Ollama
irm get.ollama.ai | iex

# Télécharger DeepSeek R1
ollama pull deepseek:r1-32b
```

### OpenWebUI
```powershell
# Installation via npm (sans Docker)
npm install -g open-webui
```

## Étape 3 : Configuration du Projet

### Clonage du Repository
```powershell
# Cloner le dépôt
git clone https://github.com/aurelienbran/Deepseek-MCP.git
cd Deepseek-MCP

# Installation des dépendances
npm install
pip install -r requirements.txt
```

## Étape 4 : Configuration GitHub

### Création d'un Token GitHub
1. Aller sur [GitHub Settings](https://github.com/settings/tokens)
2. Générer un nouveau token avec les scopes :
   - repo
   - workflow
   - write:packages

### Configuration du Token
```powershell
# Créer un fichier .env
cp .env.example .env
# Éditer et ajouter votre token GitHub
```

## Étape 5 : Lancement du Projet

### Tests et Vérifications
```powershell
# Tests JavaScript
npm test

# Tests Python
pytest tests/

# Lancer le script principal
npm start
```

## Alternatives et Dépannage

### Sans OpenWebUI
- Utiliser l'interface de ligne de commande Ollama
- Développer une interface personnalisée

### Problèmes Courants
- Vérifier les versions des dépendances
- S'assurer que tous les ports sont disponibles
- Mettre à jour les packages

## Ressources Complémentaires
- [Documentation Ollama](https://ollama.ai/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub CLI](https://cli.github.com/)

---

**Note** : Cette procédure est adaptative. N'hésitez pas à consulter la documentation officielle en cas de problème spécifique.