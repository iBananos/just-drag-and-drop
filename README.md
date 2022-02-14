# just-drag-and-drop

Type : 	Développement

## Lancement de l'application en local :
```
git clone https://github.com/iBananos/just-drag-and-drop
```

Installation requise : 
 - NodeJs 17.x.x
 - Python 3.8 et Python 3.9
  
Protocole de build : 
  ```
  cd just-drag-and-drop
  pip install -r /backend/python_script/requirements.txt
  
  cd site-web/react-ts-app/
  npm install
  npm run build
  
  cd ../../backend/python
  npm install
  npm run dev
  ```

- Se rendre sur : http://localhost:4000

## Lancement de l'application sur le serveur Polytech :

Machine hébergeant le serveur accessible uniquement via le réseau de Polytech Sophia où sur son VPN: 
```
ssh projet@134.59.215.240
mot de passe : à demander aux étudiants, M.Sander ou M.Cyril Tonin

cd just-drag-and-drop/backend
npm run build
```
- Se rendre sur : https://134.59.215.240

## Lancement des tests Jest :

- depuis la racine du projet 
```
cd backend
npm run test
```
## Résumé : 

Contexte:

La data est au centre du monde du travail et les entreprises disposent d'un grand nombre de bases inexploité car réaliser l'analyse peut prendre plusieurs jour de développement.    Le but de ce projet est de permettre à tout le monde par le biais d'une application web d'accéder à différentes analyses et différents algorithmes de machine learning. Afin de réaliser l'analyse d'une base de données en seulement quelques minutes. Le livrable devra être une application web d'analyse entièrement automatisé. 

L'outil: 

Cette web app devra être des plus simples en effet suffira de glisser déposer la base et l'application web fera le reste. La web application devra s'adapter à tout type de base et adapter son analyse en fonction et différents algorithmes de machine learning devront être implémenté.  Une gestion et une vérification des bases glissé déposé devra être implémenté afin d'éviter tout type d'attaque. Une partie sécurité devra être implémenté premièrement sur la partie client notamment sur l’authentification, puis sur la partie serveur pour assurer l’intégrité des bases de données (injection SQL). Des sécurités devront aussi être intégré afin qu'un utilisateur ne puisse pas surcharger le serveur et le rendre inaccessible.

Mot-clés : 	
- Machine learning 
- Sécurité web 
- Data visualisation 
- Web application 
- Python, React, JavaScript, TypeScript

Bibliographie: 

Encadrant: Peter Sander

Coordonées: sander@unice.fr

Co-encadrant: 

Pièce jointe:	

Etudiants:

- Nicolas Demolin (MAM5-SD), 
- Christel Ralalasoa (MAM5-SD), 
- Ralph El Chalfoun (M2-WIA), 
- Jérémy HIRTH DAUMAS (M2-CASPAR) 
