# Modifications backend à appliquer (Solution 1)

Pour permettre au frontend d'afficher le stock, applique ces 2 changements :

## 1. AJOUTER un nouveau fichier
Crée `src/main/java/com/estore/inventory/controller/InventoryController.java`
(le fichier est fourni dans `backend-patch/inventory/controller/InventoryController.java`)

Ce contrôleur expose :
- `GET /api/inventory/{productId}` → retourne `{ "id": ..., "quantity": ... }`

## 2. REMPLACER le fichier existant
Remplace `src/main/java/com/estore/inventory/entity/Inventory.java`
par celui fourni dans `backend-patch/inventory/entity/Inventory.java`

**Seul changement** : ajout de `@JsonIgnore` sur le champ `product` pour casser
la boucle de sérialisation JSON (Product ↔ Inventory).

## C'est tout
Pas besoin de toucher au reste. Redémarre Spring Boot et teste :
```
curl http://localhost:8080/api/inventory/1
```
Tu devrais obtenir :
```json
{ "id": 1, "quantity": 50 }
```
