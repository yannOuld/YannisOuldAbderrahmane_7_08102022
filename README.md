# YannisOuldAbderrahmane_7_08102022

Réseau Social Groupomania 

Projet:
Vue 3 , Nodes Js, Mysql, ORM Sequelize.

AVANT DE COMMENCER !!! 
Une fois le repository cloné 

Ouvrir deux terminals et installer les dépendances des dossiers server et groupomania à l'aide des commandes:
      
        cd server
        npm install
        
        cd groupomania
        npm install
        
A l'installation du projet créer un fichier environnement contenant les variables suivantes:
PORT // port de connection du server 
JWT_SECRET // votre clé secrete jsonwebtoken 
DB_NAME // le nom de la base de donnée utilisée 
DB_HOST = localhost  // * Attention si votre base de donnée n'est pas hebergée en local des changements sont à faire dans l'api  
DB_USER // utilisateur de votre base de donnée Mysql 
DB_PASSWORD  // le mot de passe de votre de base de donnée Mysql
DB_DIALECT = mysql
ADMINPASS // mot de pase de l'administrateur du site

lancer le server à l'aide la commande:
          npm run start
lancer l'application à l'aide la commande:
            npm run dev 

(le projet n'a pas encore subit de compression afin d'ameliorer la visibilité)

