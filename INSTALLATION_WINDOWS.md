# Installation de Deepseek MCP sur Windows

## Prérequis Système

### Configuration Matérielle
- Windows 10 ou 11 (64-bit)
- Processeur x64 avec virtualisation
- Minimum 16 Go RAM (32 Go recommandés)
- 100 Go d'espace disque libre
- Connexion Internet haut débit

### Logiciels Requis
- Windows Subsystem for Linux 2 (WSL2)
- Docker Desktop
- Node.js LTS
- Python 3.9+
- Git

## Étape 1 : Préparation de l'Environnement Windows

### Activer WSL2
1. Ouvrir PowerShell en mode Administrateur
2. Exécuter les commandes :
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all
wsl --install -d Ubuntu
```

### Installation de Docker Desktop
1. Télécharger depuis [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Installer en sélectionnant :
   - Use WSL 2 instead of Hyper-V
   - Add shortcut to desktop

## Étape 2 : Installation des Dépendances

### Node.js
1. Télécharger [Node.js LTS](https://nodejs.org/)
2. Installer en cochant :
   - Ajouter au PATH
   - Installer les outils de compilation

### Python
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
docker --version
```

## Étape 3 : Installation du Projet

### Clonage du Repository
```powershell
git clone https://github.com/aurelienbran/Deepseek-MCP.git
cd Deepseek-MCP
```

### Installation des Dépendances
```powershell
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

## Étape 5 : Démarrage du Projet

### Lancement des Services
```powershell
# Démarrer Ollama
ollama pull deepseek:r1-32b

# Lancer OpenWebUI
docker run -d `
  --network=host `
  -v open-webui:/app/backend/data `
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 `
  --name open-webui `
  --restart always `
  ghcr.io/open-webui/open-webui:main
```

## Dépannage
- Vérifier les logs Docker
- S'assurer que tous les ports sont disponibles
- Mettre à jour les pilotes GPU si nécessaire

## Ressources Complémentaires
- [Documentation Ollama](https://ollama.ai/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

**Note** : Toujours vérifier les mises à jour et la compatibilité des versions.