# Projet Kanban - API Backend

Ce projet est une API RESTful développée avec Spring Boot pour une application de type Kanban. Elle gère les utilisateurs, les listes de tâches et les tâches elles-mêmes, avec une authentification basée sur JWT.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

-   **Java JDK** : Version 17 ou supérieure.
-   **Docker** et **Docker Compose** : Pour faire tourner la base de données PostgreSQL dans un conteneur.
-   **Maven** : Bien que le projet utilise le wrapper Maven (`mvnw`), avoir Maven installé peut être utile.

## Installation et Lancement

Suivez ces étapes pour configurer et lancer l'environnement de développement local.

### 1. Lancer la base de données

Le projet utilise une base de données PostgreSQL qui est gérée via Docker Compose.

```bash
# Naviguez dans le dossier docker
cd docker/

# Lancez le conteneur de la base de données en arrière-plan
docker-compose up -d
```

La base de données sera accessible sur `localhost:5435`.

### 2. Lancer l'application Backend

L'application Spring Boot peut être lancée à l'aide du wrapper Maven inclus.

```bash
# Depuis la racine du projet
./api/kanban/mvnw spring-boot:run -f ./api/kanban/pom.xml
```

L'application démarrera et sera accessible sur `http://localhost:8080`.

## Documentation de l'API (Swagger)

Une fois l'application lancée, toute l'API est documentée et testable via Swagger UI.

-   **URL de la documentation** : [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Vous y trouverez la liste de tous les points de terminaison, les modèles de données et vous pourrez même exécuter des requêtes directement depuis votre navigateur.

### Importer dans un client API (Insomnia/Postman)

Pour tester l'API plus facilement, vous pouvez importer la spécification OpenAPI dans votre client API préféré.

1.  Assurez-vous que l'application est en cours d'exécution.
2.  Exécutez la commande suivante pour télécharger la spécification :

    ```bash
    curl http://localhost:8080/v3/api-docs -o kanban-api.json
    ```

3.  Importez le fichier `kanban-api.json` généré dans Insomnia ou Postman. La collection de requêtes sera créée automatiquement.

## Points de terminaison principaux

-   **URL de base de l'API** : `http://localhost:8080`
-   **Authentification** : `/api/v1/auth/register`, `/api/v1/auth/login`
-   **Listes** : `/api/v1/list`
-   **Tâches** : `/api/v1/task`
