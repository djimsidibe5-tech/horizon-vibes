# horizon-vibes
Application pour télécharger film , Manga et animer# Horizon VIBES – mise en ligne avec Firebase

## 1. Projet et configuration
1. Sur console.firebase.google.com, crée un projet et ajoute une application Web (icône </>). Copie la configuration.
2. Colle-la dans `index.html` (`firebaseConfig`) et dans `firebase-messaging-sw.js` (mêmes valeurs).
3. Authentication > Sign-in method : active « E-mail/Mot de passe ».
4. Firestore Database : crée la base, puis colle `firestore.rules` dans l’onglet Règles et publie.

## 2. Ton compte administrateur
Inscris-toi dans l’application. Dans Authentication > Users, copie ton UID. Dans Firestore, crée la collection `admins` avec un document dont l’ID est cet UID (un champ quelconque). Recharge : le formulaire « Ajouter une nouveauté » apparaît.

## 3. Affiches et images
Chaque contenu a un champ « Affiche ». Deux façons :
- Mets l’image dans le dossier `posters/` (par exemple `posters/spring.jpg`, format portrait 2:3) et écris `posters/spring.jpg`. C’est la plus fiable, car l’image est hébergée avec ton application.
- Ou colle un lien `https://` vers l’image.
N’utilise que des affiches libres de droits ou fournies par l’éditeur ou le studio (dossier de presse, accord de partenariat). Pour les films Blender, prends l’image sur la page officielle du film et respecte la licence (mention de l’auteur). Sans affiche, l’application affiche un visuel coloré avec le titre.

## 4. Notifications push (application fermée)
1. Firebase > Paramètres du projet > Cloud Messaging > Certificats Web Push : génère une clé et colle-la dans `VAPID_KEY` (index.html).
2. Les Cloud Functions demandent le forfait Blaze (paiement à l’usage, avec un quota gratuit). Passe le projet en Blaze.
3. Déploie : `npm i -g firebase-tools`, `firebase login`, `firebase init` (garde les fichiers existants), puis `cd functions && npm install && cd ..` et `firebase deploy`.

À chaque nouveauté publiée, la fonction `notifyNewItem` envoie une notification (avec l’affiche si elle est en https) à tous les appareils qui ont accepté les alertes. Sur iPhone, les alertes web demandent d’ajouter l’application à l’écran d’accueil.

