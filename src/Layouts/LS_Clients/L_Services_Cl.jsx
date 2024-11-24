import React, { useState, useEffect } from 'react';
import "./LS_Client.css";
import Btn_Search from '../../Components/CS_General/Buttons/Btn_Search';
import Box_Text_Empty from '../../Components/CS_General/Form Box/Box_Text/Box_Text_Empty';
import C_Title from '../../Components/CS_General/C_Title/C_Title';
import Pagination from '../../Components/CS_General/Pagination';
import ModalNewQuote_Cl from '../../Components/CS_Clients/ModalNewQuote_Cl';

function L_Services_Cl() {

  const clientId = localStorage.getItem("userId");
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        categoryName: '',
        especieName: '',
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        fetchServices();
    }, [currentPage]);

    const fetchServices = (customFilters = {}) => {
        const { name, categoryName, especieName } = { ...filters, ...customFilters };

        const queryParams = new URLSearchParams({
            status: '1',
            page: currentPage,
            size: 8,
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
                setServices(data.content || []);
                setTotalPages(data.totalPages || 0);
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
        setCurrentPage(0);
        fetchServices(filters);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (serviceId) => {
        setSelectedServiceId(serviceId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedServiceId(null);
    };

    return (
        <div>
            <section className='Layout'>
                <div className='Content_Layout'>
                    <C_Title nameTitle={"Servicios"} />
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

                                        <button className='btn-infomacio'>
                                            Más Información
                                        </button>
                                        <button
                                            className="btn-appointment"
                                            onClick={() => handleOpenModal(service.idService)}
                                        >
                                            Agendar Cita
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron servicios activos.</p>
                        )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <ModalNewQuote_Cl
                    clientId={clientId}
                    defaultServiceId={selectedServiceId}
                    onClose={handleCloseModal}
                    onUpdate={() => fetchServices()}
                />
            )}
        </div>
    );
}

export default L_Services_Cl;
