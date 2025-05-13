import { configureStore } from '@reduxjs/toolkit'; // Import de la fonction pour configurer le store
import employeeReducer from '../features/EmployeeSlice'; // Import du reducer des employés

// Création du store avec le reducer
const store = configureStore({
  reducer: {
    employees: employeeReducer, // Intégration du slice des employés dans le store
  },
});

export default store;