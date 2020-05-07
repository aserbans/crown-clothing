import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBABH8BMkH5s4Q3lnwVqCOHxMGYlgxLzcw",
    authDomain: "crwn-db-860a7.firebaseapp.com",
    databaseURL: "https://crwn-db-860a7.firebaseio.com",
    projectId: "crwn-db-860a7",
    storageBucket: "crwn-db-860a7.appspot.com",
    messagingSenderId: "196968395652",
    appId: "1:196968395652:web:d8051dd8f0e2c7c2ece3d1",
    measurementId: "G-YLY3N8YFPL"
 };

 export const createUserProfileDocument = async (userAuth,additionalData) => {
 		if(!userAuth) return;

 		const userRef = firestore.doc(`users/${userAuth.uid}`);
 		const snapShot = await userRef.get();
 		if(!snapShot.exists){
 			const {displayName,email} = userAuth;
 			const createdAt = new Date();

 			try{
 				await userRef.set({
 					displayName,
 					email,
 					createdAt,
 					...additionalData
 				}
 				)
 			}catch(error){
 				console.log(`error creating the user`,error.message);
 			}
 			
 		}
 		return userRef;
 }

 export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
 	const collectionRef = firestore.collection(collectionKey);

 	const batch = firestore.batch();
 	objectsToAdd.forEach(obj => {
 		const newDocRef = collectionRef.doc();
 		batch.set(newDocRef,obj);
 		}
 	)
 	return await batch.commit();
 }

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc =>{
	   const {title,items} = doc.data();

	   return{
	   		routeName: encodeURI(title.toLowerCase()),
	   		id: doc.id,
	   		title,
	   		items
	   }
	});
	return transformedCollection.reduce((accumulator,collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}
	,{});
};

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({prompt : 'select_account'});
 export const signInWithGoogle = () => auth.signInWithPopup(provider);

 export default firebase;