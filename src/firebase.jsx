import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

firebase.initializeApp(
  {
    apiKey: 'AIzaSyD4cs9X4WWw7LEGkRe2mRVCBe3vk-ypL54',
    authDomain: 'e-comerce-77412.firebaseapp.com',
    projectId: 'e-comerce-77412',
    storageBucket: 'e-comerce-77412.appspot.com',
    messagingSenderId: '720626585097',
    appId: '1:720626585097:web:f7a60475b620cdb533b2d8',
  },
);

export const auth = firebase.auth();
