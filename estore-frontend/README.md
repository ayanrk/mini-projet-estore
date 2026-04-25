# E-Store Frontend · React + Vite

Frontend React du mini-projet **E-Store** (module Full Stack — Faculté des Sciences Ben M'Sick, Université Hassan II de Casablanca).
Consomme l'API REST du backend **Spring Boot + JPA + MongoDB**.

---

## 🎯 Aperçu

Application e-commerce complète couvrant les 5 domaines fonctionnels du cahier des charges :

| Domaine    | Fonctionnalités frontend                                       |
|------------|----------------------------------------------------------------|
| Customer   | Inscription, connexion, profil utilisateur, déconnexion        |
| Catalog    | Liste produits, recherche, filtre par catégorie, fiche détail  |
| Inventory  | Affichage du stock, désactivation si rupture                   |
| Shopping   | Panier, ajout, modification quantité, suppression, total       |
| Billing    | Validation de commande, historique, suivi des statuts          |
| Reviews    | Avis sur produits (stockés dans MongoDB côté backend)          |

---

## ⚙️ Prérequis

- **Node.js ≥ 18** ([télécharger](https://nodejs.org))
- **Backend Spring Boot lancé sur `http://localhost:8080`**
- MySQL et MongoDB démarrés (utilisés par le backend)

---

## 🚀 Installation et lancement

```bash
# 1. Installer les dépendances
npm install

# 2. (Optionnel) configurer l'URL de l'API
cp .env.example .env
# Modifier .env si le backend n'est pas sur localhost:8080

# 3. Démarrer le serveur de développement
npm run dev
```

Le frontend s'ouvre sur **http://localhost:5173** (port autorisé par CORS dans le backend).

---

## ⚠️ IMPORTANT — Patch backend à appliquer

Pour que l'affichage du **stock** fonctionne sur la fiche produit, deux modifications
sont à faire côté backend (présentes dans le dossier `backend-patch/`) :

### 1. Ajouter un nouveau fichier
**`src/main/java/com/estore/inventory/controller/InventoryController.java`**

```java
package com.estore.inventory.controller;

import com.estore.inventory.entity.Inventory;
import com.estore.inventory.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getStock(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getByProductId(productId));
    }
}
```

### 2. Modifier `Inventory.java`
Ajouter `@JsonIgnore` sur le champ `product` pour casser la boucle JSON :

```java
@JsonIgnore  // ← ajouter cette ligne
@OneToOne
@JoinColumn(name = "product_id")
private Product product;
```

Et ajouter l'import :
```java
import com.fasterxml.jackson.annotation.JsonIgnore;
```

> Le frontend appelle `GET /api/inventory/{productId}` pour afficher le stock disponible
> sur la fiche produit. Sans ce patch, le stock ne s'affichera pas mais le reste fonctionnera.

---

## 🗺️ Routes de l'application

| Route                  | Page              | Protégée |
|------------------------|-------------------|----------|
| `/`                    | Accueil           | Non      |
| `/catalog`             | Catalogue         | Non      |
| `/products/:id`        | Détail produit    | Non      |
| `/login`               | Connexion         | Non      |
| `/register`            | Inscription       | Non      |
| `/cart`                | Panier            | **Oui**  |
| `/orders`              | Mes commandes     | **Oui**  |
| `/profile`             | Mon profil        | **Oui**  |

---

## 🔌 Endpoints backend consommés

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile/{userId}
PUT    /api/auth/profile/{userId}

GET    /api/products?search=&categoryId=
GET    /api/products/{id}
GET    /api/categories
GET    /api/inventory/{productId}     ← Patch backend requis

GET    /api/cart/{userId}
POST   /api/cart/add?quantity=N
PUT    /api/cart/update/{itemId}?quantity=N
DELETE /api/cart/remove/{itemId}
DELETE /api/cart/clear/{userId}

POST   /api/orders/{userId}
GET    /api/orders/user/{userId}
GET    /api/orders/{orderId}

POST   /api/reviews                   ← MongoDB
GET    /api/reviews/product/{productId}
GET    /api/reviews/user/{userId}
```

---

## 🧱 Architecture du projet

Le frontend respecte le **découpage par domaines** du cahier des charges
(parties 4 et 6) — chaque domaine fonctionnel a son propre dossier :

```
src/
├── api/                    # Couche d'accès aux services REST
│   ├── axios.js            # Instance axios + intercepteur d'erreurs
│   ├── authApi.js
│   ├── catalogApi.js
│   ├── cartApi.js
│   ├── inventoryApi.js
│   ├── orderApi.js
│   └── reviewApi.js
│
├── context/                # État global (Auth, Panier)
│   ├── AuthContext.jsx     # Persistance localStorage
│   └── CartContext.jsx     # Synchronisation backend
│
├── components/             # Composants partagés
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   └── Loading.jsx
│
├── features/               # Pages organisées par domaine
│   ├── auth/               # Customer (auth)
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── catalog/            # Catalog
│   │   ├── HomePage.jsx
│   │   ├── CatalogPage.jsx
│   │   └── ProductDetailPage.jsx
│   ├── cart/               # Shopping
│   │   └── CartPage.jsx
│   ├── orders/             # Billing
│   │   └── OrdersPage.jsx
│   ├── profile/            # Customer (profil)
│   │   └── ProfilePage.jsx
│   └── reviews/            # MongoDB
│       ├── ReviewsList.jsx
│       └── ReviewForm.jsx
│
├── utils/
│   └── format.js           # Formatage prix, dates
│
├── App.jsx                 # Routeur principal
├── main.jsx                # Entrée + providers
└── index.css               # Système de design global
```

---

## 🎨 Design

Direction artistique **éditoriale moderne** :
- Palette terracotta sur fond crème (chaleureux, peu utilisé)
- Typographie : **Fraunces** (serif éditorial) + **Inter Tight** (sans-serif)
- Composants soignés : cards, formulaires en split-screen, animations subtiles
- 100% responsive (mobile, tablette, desktop)

---

## 🧪 Comptes de démonstration

Disponibles via le `data.sql` du backend :

| Email                 | Mot de passe |
|-----------------------|--------------|
| `admin@estore.com`    | `admin123`   |
| `youssef@test.com`    | `test123`    |

---

## 📋 Scénario de démonstration recommandé

1. **Page d'accueil** → présentation de l'architecture par domaines
2. **Inscription** d'un nouvel utilisateur (`/register`)
3. **Catalogue** → recherche par mot-clé, filtre par catégorie
4. **Fiche produit** → affichage du stock, ajout au panier, dépôt d'un avis
5. **Panier** → modification de quantité, suppression d'un article
6. **Validation de commande** → mise à jour du stock, panier vidé
7. **Historique** → consultation de la commande passée
8. **Profil** → mise à jour des coordonnées

### Scénario d'erreur (cohérence des données — exigé page 13 du cahier)

- Tenter d'ajouter une quantité supérieure au stock → message d'erreur backend affiché
- Soumettre un formulaire incomplet → validations frontend ET backend
- Tenter d'accéder à `/cart` sans être connecté → redirection vers `/login`

---

## 📦 Build de production

```bash
npm run build      # Génère le dossier dist/
npm run preview    # Aperçu local du build
```

---

## 👤 Auteur

Mini-projet académique — Module Full Stack
**Encadrant** : Pr. Omar Zahour
**Faculté** : Sciences Ben M'Sick — Université Hassan II de Casablanca
