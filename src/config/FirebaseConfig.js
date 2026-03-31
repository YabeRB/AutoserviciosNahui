import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCexz94XibKT1zYSP39ypqnVQ40zw3DraA",
    authDomain: "autoserviciosnahui-41a94.firebaseapp.com",
    projectId: "autoserviciosnahui-41a94",
    storageBucket: "autoserviciosnahui-41a94.firebasestorage.app",
    messagingSenderId: "260300583152",
    appId: "1:260300583152:web:c22f488e059447d8a79235"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let authInstance;

export const getFirebaseAuth = () => {
    if (!authInstance) {
        try {
            authInstance = initializeAuth(app, {
                persistence: getReactNativePersistence(AsyncStorage),
            });
        } catch (e) {
            authInstance = getAuth(app);
        }
    }
    return authInstance;
};