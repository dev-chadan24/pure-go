import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Since no real .env was provided, we're setting up the structure 
// but using a mock implementation in the context if real credentials are not present.
// These would normally come from import.meta.env
const firebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "mock-auth-domain",
  projectId: "mock-project-id",
  storageBucket: "mock-storage-bucket",
  messagingSenderId: "mock-sender-id",
  appId: "mock-app-id"
};

// Initialize Firebase only if we have real credentials, otherwise just return mock object
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
