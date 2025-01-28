# Guide Complet d'Installation de Deepseek MCP sur Windows 11

## 🖥️ Prérequis Système Détaillés

### Configuration Matérielle Recommandée
- **Système d'exploitation** : Windows 11 64 bits
- **Processeur** : 
  * Architecture x64 
  * Recommandé : 8 cœurs logiques
  * Support des instructions AVX2
- **RAM** : 
  * Minimum : 16 Go 
  * Recommandé : 32 Go
- **Stockage** : 
  * Minimum : 100 Go libres
  * Type SSD recommandé
- **Connexion Internet** : Haut débit stable

### Vérification Préalable
```powershell
# Commande de vérification système
systeminfo
```

## 🔧 Préparation de l'Environnement de Développement

### 1. Installation de Node.js

#### Téléchargement
1. Visiter [nodejs.org](https://nodejs.org/)
2. Télécharger la version LTS (Long Term Support)

#### Installation Détaillée
- Lancez l'installateur
- ✅ Cocher "Automatically install the necessary tools"
- ✅ Ajouter au PATH Windows
- ✅ Activer l'installation des modules natifs

```powershell
# Vérification post-installation
node --version
npm --version
```

### 2. Installation de Python

#### Téléchargement
1. Visiter [python.org](https://www.python.org/downloads/)
2. Télécharger Python 3.9+ (recommandé 3.10 ou 3.11)

#### Installation Personnalisée
- Cocher "Add Python to PATH"
- Sélectionner "Customize installation"
- Activer "pip" et "python test suite"

```powershell
# Vérification post-installation
python --version
pip --version
```

### 3. Installation de Git

#### Téléchargement
1. Visiter [git-scm.com](https://git-scm.com/download/win)
2. Télécharger la version 64 bits

#### Configuration
- Sélectionner "Use Visual Studio Code as default editor"
- Choisir "Use Git from the command line and also from 3rd-party software"
- Sélectionner "Use Windows' default console window"

```powershell
# Vérification
git --version
```

## 🤖 Installation des Outils IA

### 4. Installation d'Ollama

#### Méthode d'Installation
```powershell
# Script d'installation automatique
irm get.ollama.ai | iex
```

#### Téléchargement du Modèle DeepSeek
```powershell
# Récupération du modèle R1 32B
ollama pull deepseek:r1-32b

# Vérification du modèle
ollama list
```

### 5. Configuration d'OpenWebUI

#### Installation Globale
```powershell
# Installation via npm
npm install -g open-webui
```

## 🚀 Déploiement du Projet Deepseek MCP

### 6. Clonage du Repository
```powershell
# Navigation vers le dossier de projets
cd D:\Projets  # Adapter selon votre configuration

# Clonage
git clone https://github.com/aurelienbran/Deepseek-MCP.git
cd Deepseek-MCP
```

### 7. Installation des Dépendances
```powershell
# Dépendances Node.js
npm install

# Dépendances Python
pip install -r requirements.txt
```

### 8. Configuration GitHub

#### Création d'un Token
1. Aller sur [GitHub Settings](https://github.com/settings/tokens)
2. Générer un nouveau token personnel
3. Scopes à sélectionner :
   - `repo` (Full control of private repositories)
   - `workflow`
   - `write:packages`

#### Configuration du .env
```powershell
# Copier le fichier d'exemple
cp .env.example .env

# Éditer avec votre token
code .env  # Ou tout autre éditeur
```

## 🧪 Tests et Validation

### Exécution des Tests
```powershell
# Tests JavaScript
npm test

# Tests Python
pytest tests/
```

### Lancement du Projet
```powershell
# Démarrage
npm start
```

## 🛠️ Dépannage

### Problèmes Courants
- Vérifier les versions des dépendances
- Mettre à jour npm et pip
- Redémarrer entre chaque installation

### Ressources de Support
- [Documentation Ollama](https://ollama.ai/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub CLI Documentation](https://cli.github.com/)

## 📋 Check-list Finale

- [ ] Node.js installé et configuré
- [ ] Python installé et configuré
- [ ] Git installé
- [ ] Ollama installé
- [ ] DeepSeek R1 32B téléchargé
- [ ] OpenWebUI installé
- [ ] Repository cloné
- [ ] Dépendances installées
- [ ] Token GitHub configuré
- [ ] Tests exécutés avec succès

---

**Note Importante** : Ce guide est évolutif. N'hésitez pas à signaler tout problème ou amélioration.