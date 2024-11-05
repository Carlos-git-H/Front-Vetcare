import React from 'react';
import Box_Text_Bloq from '../../CS_General/Form Box/Box_Text/Box_Text_Bloq';
import "./C_FromData_Em.css";

function C_FromData_Em() {
    const empleado = {
        dni: "57452158",
        primerNombre: "Luis",
        preNombre: "Jose",
        primerApellido: "Astonitas",
        segundoApellido: "Pérez",
        cmvp: "12345",
        ubicacion: "Guadalupe",
        telefono: "987654330",
        rolId: 2,
        correo: "empleado@example.com",
        password: "passwordXYZ",
        estado: 1
    };

    return (
        <div className='contentFromData'>
            <div className='contentData'>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"DNI"} V_Text={empleado.dni} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Primer Nombre"} V_Text={empleado.primerNombre} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Segundo Nombre"} V_Text={empleado.preNombre} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Primer Apellido"} V_Text={empleado.primerApellido} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"Segundo Apellido"} V_Text={empleado.segundoApellido} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Email"} V_Text={empleado.correo} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Dirección"} V_Text={empleado.ubicacion} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"Teléfono"} V_Text={empleado.telefono} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"CMVP"} V_Text={empleado.cmvp} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Rol"} V_Text={empleado.rolId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default C_FromData_Em;
