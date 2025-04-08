// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { environment } from '../environments/environment';

const app = initializeApp(environment.firebase);
export const db = getDatabase(app);
