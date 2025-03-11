import { createSlice } from '@reduxjs/toolkit';

// Fonction pour charger les employés depuis localStorage
const loadEmployeesFromStorage = () => {
  try {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    return storedEmployees || [];
  } catch (e) {
    console.error('Failed to load employees from localStorage', e);
    return [];
  }
};

// Création du slice pour gérer les employés
const employeesSlice = createSlice({
  name: 'employees',
  initialState: loadEmployeesFromStorage(),  // Charger les employés au démarrage
  reducers: {
    // Action pour ajouter un employé
    addEmployee: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state)); // Mettre à jour le localStorage
    },
    // Action pour réinitialiser les employés (utile pour certaines actions ou tests)
    setEmployees: (state, action) => {
      return action.payload;
    },
  },
});

export const { addEmployee, setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;