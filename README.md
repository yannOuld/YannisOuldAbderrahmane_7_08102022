# YannisOuldAbderrahmane_7_08102022

Réseau Social Groupomania 

Application de partage de messages et d'images avec la possibilitée de modifier, supprimer et commenter les posts.
Authentification JsonWebToken.


Principaux outils utilisés pour réaliser le projet:
Vue 3, Pinia, TailWindCss , Nodes Js, Mysql, Sequelize.

A l'installation du projet créer un fichier environnement contenant les variables suivantes:

         PORT
         // port de connection du server 
         JWT_SECRET 
         // votre clé secrete jsonwebtoken 
         DB_NAME
         // le nom de la base de donnée utilisée 
         DB_HOST = localhost  
         // * Attention si votre base de donnée n'est pas hebergée en local des changements sont à faire dans l'api  
         DB_USER 
         // utilisateur de votre base de donnée Mysql 
         DB_PASSWORD 
         // le mot de passe de votre de base de donnée Mysql
         DB_DIALECT = mysql
         ADMINPASS
         // mot de pase de l'administrateur du site doit contenir 8 caracteres dont 1 minuscule, 1 majuscule, 1 chiffre et un symbole au mininmum. 

Ouvrir deux terminals et installer les dépendances des dossiers server et groupomania à l'aide des commandes:
      
        cd server
        npm install
        npm run start
        
        cd groupomania
        npm install
        npm run build
        npm run dev

Afin de crée le User possédant les droits d'administrateur du site:

        - rendez vous dans le fichier 20230301140258-admin-user.js du dossier seeder 
        - remplacez l'email dans la promise User.create à la ligne 18 par celui de votre choix
        - dans le terminal server rentrer la ligne de code suivante afin de créée le User:
                           npx sequelize-cli db:seed:all
        -par default l'email et le mot de passe seront: 
                           email: example@example.com
                           mot de passe:  ADMINPASS
                           
      
 

