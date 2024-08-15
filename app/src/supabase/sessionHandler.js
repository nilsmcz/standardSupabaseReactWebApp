// src/authListener.js
import { supabase } from './supabase';
import { setAuthUser, clearAuthUser } from '../redux/actions/userActions';
import store from '../redux/store';

const { dispatch } = store;

// Diese Funktion wird aufgerufen, wenn sich der Authentifizierungsstatus ändert
const handleAuthStateChange = async (event, session) => {
  if (event === 'SIGNED_IN') {
    // User ist angemeldet
    dispatch(setAuthUser(session.user));
  } else if (event === 'SIGNED_OUT') {
    // User ist abgemeldet
    dispatch(clearAuthUser());
  }
};

// Setze den Auth-Listener
supabase.auth.onAuthStateChange(handleAuthStateChange);
