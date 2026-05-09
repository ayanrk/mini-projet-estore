# E-Store - Application e-commerce Full Stack

> Mini-Projet Full Stack · Spring Boot + JPA + MongoDB + React  
> Encadrant : Pr. Omar Zahour  
> Faculté des Sciences Ben M'Sick · Université Hassan II de Casablanca

---

## 📋 Description du projet

E-Store est une application e-commerce complète développée en architecture full stack. Elle permet aux clients de parcourir un catalogue de produits, gérer un panier, passer des commandes, et déposer des avis. Les administrateurs disposent d'un panel de gestion pour superviser le catalogue, le stock, et les commandes.

**Fonctionnalités principales :**
- ✅ Authentification sécurisée (inscription, connexion, hashage BCrypt)
- ✅ Catalogue de produits avec recherche et filtres par catégorie
- ✅ Gestion du panier en temps réel
- ✅ Validation de commande avec mise à jour automatique du stock
- ✅ Système d'avis produits (MongoDB)
- ✅ Panel d'administration complet

---

## 🛠️ Technologies utilisées

### Backend
- **Spring Boot** 3.x
- **Spring Data JPA** (persistance MySQL)
- **Spring Data MongoDB** (persistance NoSQL)
- **BCrypt** (hashage des mots de passe)
- **Maven** (gestion des dépendances)

### Frontend
- **React** 18
- **Vite** (build tool)
- **Axios** (requêtes HTTP)
- **React Router** (navigation)
- **Context API** (gestion d'état)

### Bases de données
- **MySQL 8.0** (port 3307) - données transactionnelles
- **MongoDB 7.0** (port 27017) - avis produits

---

## 📦 Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- **Java JDK 17** ou supérieur
- **Node.js 18** ou supérieur + npm
- **MySQL 8.0** (configuré sur le port 3307)
- **MongoDB 7.0** (configuré sur le port 27017)
- **Maven** 3.8+
- **Git**

### Vérification des installations

```bash
# Vérifier Java
java -version

# Vérifier Node.js et npm
node -v
npm -v

# Vérifier Maven
mvn -v

# Vérifier MySQL (doit tourner sur port 3307)
mysql -u root -p --port=3307

# Vérifier MongoDB (doit tourner sur port 27017)
mongosh --port 27017
```

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-repo/estore.git
cd estore
```

### 2. Configuration MySQL

Créer la base de données et les tables :

```bash
# Se connecter à MySQL
mysql -u root -p --port=3307

# Exécuter le script d'initialisation
source estore-backend2/src/main/resources/init.sql
```

Ou directement depuis MySQL Workbench :
1. Ouvrir le fichier `estore-backend2/src/main/resources/init.sql`
2. Exécuter le script complet

### 3. Configuration MongoDB

Vérifier que MongoDB est démarré :

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod

# Ou via MongoDB Compass : se connecter à mongodb://localhost:27017
```

La collection `reviews` sera créée automatiquement au premier ajout d'avis.

### 4. Configuration Backend

Vérifier le fichier `estore-backend2/src/main/resources/application.properties` :

```properties
server.port=8080

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3307/estore_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=Mbarka0101
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/estore_mongo
spring.data.mongodb.database=estore_mongo

# Important : évite la perte de données au redémarrage
spring.sql.init.mode=never
```

⚠️ **Adapter le mot de passe MySQL** (`spring.datasource.password`) selon votre configuration.

### 5. Installation des dépendances Frontend

```bash
cd estore-frontend
npm install
```

---

## ▶️ Lancement du projet

### Option 1 : Lancement manuel (recommandé pour la première fois)

#### Terminal 1 - Backend

```bash
cd estore-backend2
mvn clean install
mvn spring-boot:run
```

✅ Le backend démarre sur **http://localhost:8080**

Vous devriez voir dans les logs :
```
Started EstoreApplication in X.XXX seconds
```

#### Terminal 2 - Frontend

```bash
cd estore-frontend
npm run dev
```

✅ Le frontend démarre sur **http://localhost:5173**

Ouvrir votre navigateur et accéder à : **http://localhost:5173**

---

### Option 2 : Lancement rapide (après la première installation)

#### Windows (PowerShell ou CMD)

**Backend :**
```bash
cd estore-backend2
mvn spring-boot:run
```

**Frontend :**
```bash
cd estore-frontend
npm run dev
```

#### Linux/Mac (bash)

**Backend :**
```bash
cd estore-backend2 && mvn spring-boot:run
```

**Frontend :**
```bash
cd estore-frontend && npm run dev
```

---

## 👤 Comptes de test

### Compte Administrateur

| Champ | Valeur |
|---|---|
| **Email** | `admin@estore.com` |
| **Mot de passe** | `admin123` |
| **Accès** | Panel d'administration (`/admin`) |

### Compte Client

| Champ | Valeur |
|---|---|
| **Email** | `youssef@test.com` |
| **Mot de passe** | `test123` |
| **Accès** | Toutes les fonctionnalités client |

> **Note :** Vous pouvez créer de nouveaux comptes via la page d'inscription `/register`

---

## 🌐 Navigation dans l'application

### Pages publiques (accessibles sans connexion)

| Page | URL | Description |
|---|---|---|
| Accueil | `/` | Page d'accueil style éditorial |
| Catalogue | `/catalog` | Liste des produits avec recherche et filtres |
| Fiche produit | `/products/:id` | Détail d'un produit + avis |
| Connexion | `/login` | Formulaire de connexion |
| Inscription | `/register` | Formulaire d'inscription |

### Pages protégées (connexion requise)

| Page | URL | Description |
|---|---|---|
| Panier | `/cart` | Gestion du panier |
| Mes commandes | `/orders` | Historique des commandes |
| Mon profil | `/profile` | Consultation et modification du profil |

### Pages administrateur (email = admin@estore.com)

| Page | URL | Description |
|---|---|---|
| Panel Admin | `/admin` | Gestion produits, stock, commandes, catégories |

---

## 🧪 Scénario de test recommandé

### 1. Inscription et connexion
1. Aller sur `/register`
2. Créer un nouveau compte
3. Se déconnecter
4. Se reconnecter avec les identifiants créés

### 2. Navigation catalogue
1. Aller sur `/catalog`
2. Rechercher "Laptop" dans la barre de recherche
3. Filtrer par catégorie "Informatique"
4. Cliquer sur un produit pour voir le détail

### 3. Gestion du panier
1. Depuis la fiche produit, ajouter au panier (quantité 2)
2. Aller sur `/cart`
3. Modifier la quantité
4. Valider la commande
5. **Vérifier que le stock a diminué** (aller sur la fiche produit)

### 4. Avis produit
1. Depuis la fiche produit, laisser un avis (note + commentaire)
2. Vérifier que l'avis s'affiche
3. **Bonus :** ouvrir MongoDB Compass et voir le document créé dans `estore_mongo.reviews`

### 5. Panel Admin
1. Se connecter avec `admin@estore.com` / `admin123`
2. Cliquer sur "⚙ Admin" dans le header
3. Tester les 4 onglets :
   - **Produits** : ajouter un nouveau produit
   - **Stock** : modifier le stock d'un produit
   - **Commandes** : voir toutes les commandes
   - **Catégories** : ajouter une nouvelle catégorie

---

## 📂 Structure du projet

```
mini-projet-estore/
├── estore-backend2/              ← Backend Spring Boot
│   ├── src/main/java/com/estore/
│   │   ├── customer/             → Authentification, profils
│   │   ├── catalog/              → Produits, catégories
│   │   ├── inventory/            → Gestion du stock
│   │   ├── shopping/             → Panier
│   │   ├── billing/              → Commandes
│   │   ├── shared/review/        → Avis (MongoDB)
│   │   ├── config/               → Configuration (CORS, BCrypt)
│   │   └── exception/            → Gestion des erreurs
│   └── src/main/resources/
│       ├── application.properties
│       └── init.sql              → Script d'initialisation MySQL
│
└── estore-frontend/              ← Frontend React
    ├── src/
    │   ├── api/                  → Services Axios (authApi, catalogApi...)
    │   ├── context/              → AuthContext, CartContext
    │   ├── components/           → Header, Footer, ProtectedRoute
    │   ├── features/             → Pages organisées par domaine
    │   │   ├── auth/             → Login, Register
    │   │   ├── catalog/          → HomePage, CatalogPage, ProductDetail
    │   │   ├── cart/             → CartPage
    │   │   ├── orders/           → OrdersPage
    │   │   ├── profile/          → ProfilePage
    │   │   └── admin/            → AdminPage
    │   └── utils/                → Helpers (formatPrice, formatDate)
    └── package.json
```

---

## 🔧 Résolution de problèmes

### Erreur : "Access denied for user 'root'@'localhost'"

**Cause :** Mot de passe MySQL incorrect ou MySQL non démarré sur le port 3307.

**Solution :**
1. Vérifier que MySQL tourne : `netstat -ano | findstr 3307`
2. Adapter le mot de passe dans `application.properties`
3. Se connecter manuellement pour tester : `mysql -u root -p --port=3307`

### Erreur : "CORS policy: No 'Access-Control-Allow-Origin'"

**Cause :** Le backend n'autorise pas le frontend à communiquer.

**Solution :**
1. Vérifier que `CorsConfig.java` autorise `http://localhost:5173`
2. Redémarrer le backend

### Erreur : "Cannot execute npm run dev" (PowerShell)

**Cause :** Politique d'exécution de scripts Windows.

**Solution :**
1. Utiliser **CMD** au lieu de PowerShell
2. Ou exécuter : `Set-ExecutionPolicy RemoteSigned` (en admin)

### Les données disparaissent au redémarrage du backend

**Cause :** `spring.sql.init.mode=always` dans `application.properties`.

**Solution :**
1. Vérifier que `spring.sql.init.mode=never`
2. Ne **jamais** exécuter `init.sql` après avoir créé des données

### MongoDB ne démarre pas

**Windows :**
```bash
net start MongoDB
```

**Linux/Mac :**
```bash
sudo systemctl start mongod
```

**Alternative :** Utiliser MongoDB Compass (interface graphique)

---

## 📊 Endpoints principaux

### Authentication
```
POST   /api/auth/register          → Inscription
POST   /api/auth/login             → Connexion
GET    /api/auth/profile/{userId}  → Profil utilisateur
PUT    /api/auth/profile/{userId}  → Modifier profil
```

### Products
```
GET    /api/products?search=&categoryId=  → Liste produits (avec filtres)
GET    /api/products/{id}                 → Détail produit
POST   /api/products                      → Créer produit (admin)
PUT    /api/products/{id}                 → Modifier produit (admin)
DELETE /api/products/{id}                 → Supprimer produit (admin)
```

### Cart
```
GET    /api/cart/{userId}                 → Panier utilisateur
POST   /api/cart/add?quantity=N           → Ajouter au panier
PUT    /api/cart/update/{itemId}?quantity=N → Modifier quantité
DELETE /api/cart/remove/{itemId}          → Retirer du panier
```

### Orders
```
POST   /api/orders/{userId}               → Valider commande
GET    /api/orders/user/{userId}          → Commandes d'un utilisateur
GET    /api/orders                        → Toutes les commandes (admin)
```

### Inventory
```
GET    /api/inventory/{productId}         → Stock d'un produit
PUT    /api/inventory/{productId}?quantity=N → Modifier stock (admin)
```

### Reviews
```
POST   /api/reviews                       → Créer un avis
GET    /api/reviews/product/{productId}   → Avis d'un produit
```

---

## 👥 Équipe

- **Membre 1** : [NARAKI AYA ]
- **Membre 2** : [RAMZI Mariam]

**Encadrant :** Pr. Omar Zahour  
**Établissement :** Faculté des Sciences Ben M'Sick, Université Hassan II de Casablanca  
**Année universitaire :** 2025/2026


---



**Dernière mise à jour :** Mai 2026
