import React, { useState, useEffect } from 'react'; 
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'; // Importation des hooks nécessaires de react-table

function EmployeeList() {
  const [employees, setEmployees] = useState([]); // Déclare un état pour stocker la liste des employés

  // Utilisation de useEffect pour charger les employés depuis le localStorage lorsque le composant se monte
  useEffect(() => {
    // Récupère les employés du localStorage ou initialise un tableau vide si aucun élément n'est trouvé
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees); // Met à jour l'état des employés
  }, []); // Le tableau vide signifie que cet effet ne se déclenche qu'une fois au montage du composant

  const data = employees; // Attribue la liste des employés à la constante data, utilisée par react-table

  // Définition des colonnes de la table avec leurs titres et clés d'accès aux données
  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    [] // Ce tableau vide garantit que la définition des colonnes ne sera calculée qu'une seule fois
  );

  // Utilisation de react-table pour préparer la table avec les hooks nécessaires
  const {
    getTableProps,  // Propriétés pour la table
    getTableBodyProps, // Propriétés pour le corps de la table
    headerGroups, // Groupes d'en-têtes pour la table
    prepareRow, // Prépare les lignes pour le rendu
    state: { pageIndex, pageSize, sortBy }, // État pour gérer la pagination et le tri
    setPageSize,  // Permet de définir la taille de la page (nombre d'entrées par page)
    page,  // Données de la page courante
    canPreviousPage, // Détermine si la page précédente est accessible
    canNextPage, // Détermine si la page suivante est accessible
    previousPage,  // Fonction pour aller à la page précédente
    nextPage, // Fonction pour aller à la page suivante
    pageCount, // Nombre total de pages
    setGlobalFilter, // Fonction pour appliquer un filtre global à la table
    state: { globalFilter }, // État du filtre global
  } = useTable(
    {
      columns,  // Les colonnes de la table
      data,     // Les données des employés
    },
    useGlobalFilter,  // Hook pour filtrer globalement les données
    useSortBy,  // Hook pour trier les colonnes
    usePagination // Hook pour la pagination
  );

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>

      {/* Zone de recherche et de filtrage */}
      <div className='div-search'>
        {/* Sélecteur pour choisir le nombre d'éléments par page */}
        <div className="select-wrapper">
          <span className="label">Show </span>
          <select
            value={pageSize}  // La taille de la page est liée à l'état pageSize
            onChange={(e) => setPageSize(Number(e.target.value))}  // Met à jour la taille de la page
          >
            {[5, 10, 25, 50, 100].map((size) => ( // Propose différentes tailles de page
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="label"> entries</span>
        </div>

        {/* Zone de recherche pour filtrer les employés */}
        <div>
          <input
            type="text"
            value={globalFilter || ''} // La valeur du champ de recherche est liée au filtre global
            onChange={(e) => setGlobalFilter(e.target.value)}  // Met à jour le filtre global à chaque saisie
            placeholder="Search employees..."  // Texte d'indication dans le champ de recherche
          />
        </div>
      </div>

      {/* Affichage de la table avec les propriétés générées par react-table */}
      <table {...getTableProps()} className="display">
        <thead>
          {headerGroups.map((headerGroup, index) => (  // Parcours les groupes d'en-têtes
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, columnIndex) => ( // Parcours les colonnes dans chaque groupe
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}  // Permet de trier les colonnes
                  key={columnIndex}
                >
                  {column.render('Header')}  {/* Affiche le titre de chaque colonne */}
                  <span>
                    {sortBy.length > 0 && column.id === sortBy[0]?.id ? ( // Affiche l'icône de tri si la colonne est triée
                      sortBy[0]?.desc ? ' 🔽' : ' 🔼'
                    ) : (
                      ' ↕️'  // Affiche une flèche par défaut si la colonne n'est pas triée
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {  // Affiche les lignes de la page courante
            prepareRow(row);  // Prépare la ligne avant de l'afficher
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (  // Parcours les cellules de chaque ligne
                  <td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render('Cell')}
                  </td> // Affiche la donnée de chaque cellule
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Contrôles de pagination */}
      <div className="page-button">
        <span> {/* Affiche le nombre d'éléments visibles */}
          Showing{' '}<span className='number_element'>{pageIndex + 1} to {pageCount} of {pageCount} entries</span>
        </span>
        <div className="div-button">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>  {/* Bouton pour aller à la page précédente */}
            {'Previous'}
          </button>
          <span>
          <strong>Page {pageIndex + 1} </strong>
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>  {/* Bouton pour aller à la page suivante */}
            {'Next'}
          </button>
        </div>
      </div>

      {/* Lien pour revenir à la page d'accueil */}
      <a href="/">Home</a>
    </div>
  );
}

export default EmployeeList;