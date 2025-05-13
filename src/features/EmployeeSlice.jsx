import { createSlice } from '@reduxjs/toolkit';

// Fonction pour charger les employés depuis localStorage
const loadEmployeesFromStorage = () => {
  try {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')); // Récupère les employés du localStorage
    return storedEmployees || []; // Retourne les employés ou un tableau vide si aucun
  } catch (e) {
    console.error('Failed to load employees from localStorage', e); // Gère l'erreur si le chargement échoue
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

// Création du slice pour gérer les employés
const employeesSlice = createSlice({
  name: 'employees',
  initialState: loadEmployeesFromStorage(),  // Charger les employés au démarrage
  reducers: {
    // Action pour ajouter un employé
    addEmployee: (state, action) => {
      state.push(action.payload); // Ajoute l'employé à l'état
      localStorage.setItem('employees', JSON.stringify(state)); // Mettre à jour le localStorage
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;