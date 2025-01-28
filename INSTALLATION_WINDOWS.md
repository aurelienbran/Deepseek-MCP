# Installation de Deepseek MCP sur Windows

## Prérequis Système

### Configuration Matérielle
- Windows 11 (64-bit)
- Processeur x64 compatible virtualisation
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

### Activation des Fonctionnalités Windows
⚠️ **Problèmes courants et solutions** :
- Si les commandes échouent, utilisez l'interface graphique
- Assurez-vous d'être en mode Administrateur

```powershell
# Ouvrir PowerShell en mode Administrateur

# Activer WSL et Plateforme de Machine Virtuelle
dism /online /enable-feature /featurename:VirtualMachinePlatform /all
dism /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all

# Mettre à jour WSL
wsl --update

# Définir WSL 2 comme version par défaut
wsl --set-default-version 2
```

### Alternatives en cas de problème
1. Ouvrir "Fonctionnalités Windows"
   - Appuyez sur Windows+R
   - Tapez `optionalfeatures`
   - Cochez manuellement :
     * Sous-système Windows pour Linux
     * Plateforme de machine virtuelle

2. Téléchargement manuel
   - Télécharger le package de mise à jour Linux : 
     https://wsl.azureedge.net/download/wsl/wsl2-linux-kernel/linux-msft-wsl-5.10.102.1.cab

## Étape 2 : Installation de Docker Desktop

### Téléchargement et Installation
1. [Télécharger Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Pendant l'installation :
   - Cocher "Use WSL 2 instead of Hyper-V"
   - Autoriser les modifications système

### Résolution des Problèmes Courants
- En cas d'échec d'installation :
  * Vérifier les mises à jour Windows
  * Redémarrer complètement
  * Désactiver temporairement les antivirus

## Étape 3 : Installation des Dépendances

### Node.js
```powershell
# Installer Node.js LTS depuis le site officiel
# https://nodejs.org/

# Vérifier l'installation
node --version
npm --version
```

### Python
```powershell
# Installer Python depuis le site officiel
# https://www.python.org/

# Vérifier l'installation
python --version
pip --version
```

## Étape 4 : Préparation du Projet

### Clonage du Repository
```powershell
# Cloner le dépôt
git clone https://github.com/aurelienbran/Deepseek-MCP.git
cd Deepseek-MCP

# Installation des dépendances
npm install
pip install -r requirements.txt
```

### Configuration GitHub
1. [Créer un token GitHub](https://github.com/settings/tokens)
2. Scopes recommandés :
   - repo
   - workflow
   - write:packages

## Étape 5 : Installation d'Ollama et DeepSeek R1

```powershell
# Installer Ollama
irm get.ollama.ai | iex

# Télécharger DeepSeek R1
ollama pull deepseek:r1-32b
```

## Démarrage des Services

### OpenWebUI
```powershell
docker run -d `
  --network=host `
  -v open-webui:/app/backend/data `
  -e OLLAMA_BASE_URL=http://localhost:11434 `
  --name open-webui `
  --restart always `
  ghcr.io/open-webui/open-webui:main
```

## Dépannage

### Problèmes Courants
- Vérifier les logs Docker
- S'assurer que tous les ports sont disponibles
- Mettre à jour les pilotes GPU
- Redémarrer en cas de problème

### Ressources Complémentaires
- [Documentation Ollama](https://ollama.ai/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Support Docker](https://docs.docker.com/desktop/troubleshoot/overview/)

---

**Note** : Cette procédure est adaptative. N'hésitez pas à consulter la documentation officielle en cas de problème spécifique.