import React, { useEffect, useState } from 'react';
import "./LS_Client.css";
import Btn_Search from '../../Components/CS_General/Buttons/Btn_Search';
import Box_Text_Empty from '../../Components/CS_General/Form Box/Box_Text/Box_Text_Empty';
import C_Title from '../../Components/CS_General/C_Title/C_Title';
import Pagination from '../../Components/CS_General/Pagination';
import Btn_Info from '../../Components/CS_General/Buttons/Btn_Info';

function L_Services_Cl() {
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({
      name: '',
      categoryName: '',
      especieName: '',
  });
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  useEffect(() => {
      fetchServices(); // Cargar los servicios activos al iniciar
  }, [currentPage]); // Se ejecuta cada vez que cambia la página actual

  const fetchServices = (customFilters = {}) => {
      const { name, categoryName, especieName } = { ...filters, ...customFilters };

      const queryParams = new URLSearchParams({
          status: '1', // Estado fijo en activo
          page: currentPage, // Página actual
          size: 8, // Tamaño de página (puedes ajustarlo según lo necesites)
          ...(name && { name }),
          ...(categoryName && { categoryName }),
          ...(especieName && { especieName }),
      }).toString();

      fetch(`http://localhost:8080/api/services/search?${queryParams}`)
          .then((response) => {
              if (!response.ok) throw new Error('Error al obtener los servicios');
              return response.json();
          })
          .then((data) => {
              setServices(data.content || []); // Guardar los servicios obtenidos
              setTotalPages(data.totalPages || 0); // Guardar el total de páginas
          })
          .catch((error) => console.error('Error:', error));
  };

  const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
      }));
  };

  const handleSearch = (e) => {
      e.preventDefault();
      setCurrentPage(0); // Reiniciar a la primera página al buscar
      fetchServices(filters); // Realizar búsqueda con los filtros
  };

  const handlePageChange = (page) => {
      setCurrentPage(page); // Cambiar la página actual
  };

  return (
      <div>
        <section className='Layout'>
          <div className='Content_Layout'>
                
                <C_Title nameTitle={"Servicios"}/>
                {/* Formulario de búsqueda */}
                <form onSubmit={handleSearch} className="row">
                  <div className='col'>
                    <Box_Text_Empty
                        id="especieName"
                        Label="Especie"
                        name="especieName"
                        value={filters.especieName}
                        onChange={handleFilterChange}
                    />
                  </div>
                    
                  <div className='col'>
                    <Box_Text_Empty
                        id="categoryName"
                        Label="Categoría"
                        name="categoryName"
                        value={filters.categoryName}
                        onChange={handleFilterChange}
                    />
                  </div>

                  <div className='col'>
                    <Box_Text_Empty
                        id="name"
                        Label="Nombre"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                    />
                  </div>
                    
                  <div className='col'>
                    <Btn_Search
                        nameId="btnSearch"
                        showContent="text+icon"
                        onClick={handleSearch}
                    />
                  </div>
                    
                </form>

                {/* Lista de servicios */}
                <div className="services-list">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <div key={service.idService} className="service-card">
                              <div className='service-img'>
                                <img src={service.dirImage} alt={service.name} />
                              </div>
                              <div className='service-info'>
                                <h3 className='service-title'>{service.name}</h3>
                                <p>Especie: {service.especie.name}</p>
                                
                                <button className="btn-infomacio">Más Información</button>
                                <button className="btn-appointment">Agendar Cita</button>
                                  
                              </div>
                                
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron servicios activos.</p>
                    )}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Paginación */}
                  <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                  />
                </div>
                
            </div>

        </section>
      </div>
  );
}

export default L_Services_Cl;
