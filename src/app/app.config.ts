import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC-FGwIcz795U7dHUKwLrJnKWgzbP6Ik_8",
      authDomain: "catalogo-libros-a0e78.firebaseapp.com",
      projectId: "catalogo-libros-a0e78",
      storageBucket: "catalogo-libros-a0e78.firebasestorage.app",
      messagingSenderId: "579137800090",
      appId: "1:579137800090:web:5f659ed161958e139e1c23"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
