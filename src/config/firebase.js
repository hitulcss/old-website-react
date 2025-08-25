
import { getRemoteConfig } from '@firebase/remote-config';
import { initializeApp } from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyCoTY_2YqRoJFTbOoI-mUP95iJ3shZukKk",
    authDomain: "sdcampus-d00f3.firebaseapp.com",
    databaseURL: "https://sdcampus-d00f3-default-rtdb.firebaseio.com",
    projectId: "sdcampus-d00f3",
    storageBucket: "sdcampus-d00f3.appspot.com",
    messagingSenderId: "633168368670",
    appId: "1:633168368670:web:0ce09ad0367532297c8a0f",
    measurementId: "G-YE9NRSMQ96"
};
const app = initializeApp(firebaseConfig);


remoteConfig.settings.minimumFetchIntervalMillis = 3600000; const remoteConfig = getRemoteConfig(app);

remoteConfig.defaultConfig = {
    "welcome_message": "Welcome"
};