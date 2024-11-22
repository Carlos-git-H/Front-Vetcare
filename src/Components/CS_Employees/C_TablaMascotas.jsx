import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import Btn_New from '../CS_General/Buttons/Btn_New';
import Btn_PetInfo from '../CS_General/Buttons/Btn_PetInfo';
import Box_Text_Empty from '../CS_General/Form Box/Box_Text/Box_Text_Empty';
import Pagination from '../CS_General/Pagination';
import ModalEditPet from '../../Layouts/LS_Employees/ModalPet/ModalEditPet';
import ModalNewPet from '../../Layouts/LS_Employees/ModalPet/ModalNewPet';
import L_InfoPet_Em from '../../Layouts/LS_Employees/L_InfoPet_Em';
import C_Title from '../CS_General/C_Title/C_Title';

function C_TablaMascotas() {
  const [pets, setPets] = useState([]); // Lista de mascotas
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const [filters, setFilters] = useState({
    status: '1', // Por defecto, mascotas activas
    dni: '',
    raceName: '',
    petName: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPetModalOpen, setIsNewPetModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedPetInfoId, setSelectedPetInfoId] = useState(null); // Para abrir información de mascota

  // Cargar mascotas activas al iniciar
  useEffect(() => {
    fetchPets(currentPage, { status: '1' }); // Por defecto, carga mascotas activas
  }, [currentPage]);

  // Función para calcular la edad
  const calculateAge = (dateNac) => {
    const today = new Date();
    const birthDate = new Date(dateNac);
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays} días`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} semanas`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} meses`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} años`;
    }
  };

  // Función para obtener mascotas desde la API
  const fetchPets = (page, customFilters = {}) => {
    const { status, dni, raceName, petName } = { ...filters, ...customFilters };

    const queryParams = new URLSearchParams({
      page,
      size: 9,
      ...(status && { status }),
      ...(dni && { dni }),
      ...(raceName && { raceName }),
      ...(petName && { petName }),
    }).toString();

    fetch(`http://localhost:8080/api/pets/search?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las mascotas');
        }
        return response.json();
      })
      .then((data) => {
        if (data.content) {
          setPets(data.content); // Actualiza la tabla con los resultados
          setTotalPages(data.totalPages); // Actualiza las páginas totales
        } else {
          setPets([]); // Limpia la tabla si no hay resultados
          setTotalPages(0);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Ejecutar búsqueda al dar clic en el botón
  const handleSearch = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto
    setCurrentPage(0); // Reiniciar la paginación a la primera página
    fetchPets(0, filters); // Realizar búsqueda con los filtros
  };

  // Bloquear mascota
  const handleBlockPet = (petId) => {
    fetch(`http://localhost:8080/api/pets/${petId}/block`, {
      method: 'PUT',
    })
      .then((response) => response.text())
      .then(() => {
        fetchPets(currentPage, { status: '1' }); // Actualizar mascotas activas
      })
      .catch((error) => console.error('Error al bloquear la mascota:', error));
  };

  const openModal = (petId) => {
    setSelectedPetId(petId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPetId(null);
  };

  const openNewPetModal = () => {
    setIsNewPetModalOpen(true);
  };

  const closeNewPetModal = () => {
    setIsNewPetModalOpen(false);
  };

  const openPetInfo = (petId) => {
    setSelectedPetInfoId(petId); // Guardar ID de mascota seleccionada para mostrar información
  };

  const closePetInfo = () => {
    setSelectedPetInfoId(null); // Ocultar componente de información
  };

  const styles = {
    flexButtonOptions: {
      display: 'flex',
      alignItems: 'center'
    },
  };

  return (
    <div>
      {!selectedPetInfoId ? (
        <>
        
        <C_Title nameTitle={"Gestión de Mascotas"}/>
          {/* Formulario de búsqueda */}
          <form onSubmit={handleSearch} className="row">
            <div className="col">
              <div className="form-group">
                <label>Estado:</label>
                <select
                  name="status"
                  className="input-box"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="1">Activo</option>
                  <option value="0">Muerto</option>
                </select>
              </div>
            </div>
            <div className="col">
              <Box_Text_Empty
                id="dni"
                Label="DNI del Dueño"
                value={filters.dni}
                onChange={handleFilterChange}
                name="dni"
              />
            </div>
            <div className="col">
              <Box_Text_Empty
                id="raceName"
                Label="Nombre de la Raza"
                value={filters.raceName}
                onChange={handleFilterChange}
                name="raceName"
              />
            </div>
            <div className="col">
              <Box_Text_Empty
                id="petName"
                Label="Nombre de la Mascota"
                value={filters.petName}
                onChange={handleFilterChange}
                name="petName"
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </div>
          </form>

          {/* Tabla de mascotas */}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Sexo</th>
                <th>Dueño</th>
                <th>Peso</th>
                <th>Edad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <tr key={pet.idPet}>
                    <td>{pet.idPet}</td>
                    <td>{pet.name}</td>
                    <td>{pet.race.name}</td>
                    <td>{pet.sex}</td>
                    <td>{`${pet.client.firstName} ${pet.client.firstLastName}`}</td>
                    <td>{pet.weight} kg</td>
                    <td>{calculateAge(pet.dateNac)}</td>
                    <td>{pet.status === '1' ? 'Activo' : 'Muerto'}</td>
                    <td>
                      <div
                        className="flex_button_options"
                        style={styles.flexButtonOptions}
                      >
                        <Btn_PetInfo
                          nameId={pet.idPet}
                          showContent="icon"
                          onClick={() => openPetInfo(pet.idPet)}
                        />
                        <Btn_Edit
                          nameId={pet.idPet}
                          showContent="icon"
                          onEdit={() => openModal(pet.idPet)}
                        />
                        <Btn_Delete
                          nameId={pet.idPet}
                          showContent="icon"
                          onDelete={() => handleBlockPet(pet.idPet)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No se encontraron mascotas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="d-flex justify-content-between align-items-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)} // Cambiar de página
            />
            <Btn_New
              nameId="btnAddNewPet"
              showContent="text+icon"
              onNew={openNewPetModal}
            />
          </div>
        </>
      ) : (
        <L_InfoPet_Em idPet={selectedPetInfoId} onClose={closePetInfo} />
      )}

      {/* Modales */}
      {isModalOpen && (
        <ModalEditPet
          petId={selectedPetId}
          onClose={closeModal}
          onUpdate={() => fetchPets(currentPage, { status: '1' })} // Actualizar mascotas activas
        />
      )}
      {isNewPetModalOpen && (
        <ModalNewPet
          onClose={closeNewPetModal}
          onUpdate={() => fetchPets(currentPage, { status: '1' })} // Actualizar mascotas activas
        />
      )}
    </div>
  );
}

export default C_TablaMascotas;
