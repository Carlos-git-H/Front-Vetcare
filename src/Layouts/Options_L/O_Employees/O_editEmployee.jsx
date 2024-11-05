import React from 'react'
import Box_Text_Value from  '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value'
import "../../Options_L/Options.css"
import C_Title from '../../../Components/CS_General/C_Title/C_Title'
import Btn_Save from '../../../Components/CS_General/Buttons/Btn_Save'

function O_editEmployee() {
  const empleados = [
    {
        idEmpleado: 1,
        dni: "12345678",
        primerNombre: "Juan",
        preNombre: "Pérez",
        primerApellido: "Gómez",
        segundoApellido: "",
        cmvp: "CMVP001",
        ubicacion: "Lima",
        telefono: "987654321",
        rolId: 2,
        correo: "juan.perez@example.com",
        password: "password123",
        estado: 1
    },
    {
        idEmpleado: 2,
        dni: "87654321",
        primerNombre: "María",
        preNombre: "Luisa",
        primerApellido: "Ramos",
        segundoApellido: "Pérez",
        cmvp: "CMVP002",
        ubicacion: "Arequipa",
        telefono: "987654322",
        rolId: 3,
        correo: "maria.ramos@example.com",
        password: "password456",
        estado: 1
    },
    {
        idEmpleado: 3,
        dni: "45678912",
        primerNombre: "Carlos",
        preNombre: "Ramírez",
        primerApellido: "Torres",
        segundoApellido: "",
        cmvp: "CMVP003",
        ubicacion: "Cusco",
        telefono: "987654323",
        rolId: 2,
        correo: "carlos.ramirez@example.com",
        password: "password789",
        estado: 1
    }
];
  return (
    
    <div className='Options'>
        <div className='Content-Options'>
          
            <C_Title nameTitle={"Editar Empleado"}/>
            <Box_Text_Value id="editDni" Label="Dni"/>
            <Box_Text_Value id="editPrimerNombre" Label="Primer Nombre"/>
            <Box_Text_Value id="editSegundoNombre" Label="Segundo Nombre"/>
            <Box_Text_Value id="editPrimerApellido" Label="Primer Apellido"/>
            <Box_Text_Value id="editSegundoApellido" Label="Segundo Apellido"/>
            <Box_Text_Value id="editDireccion" Label="Dirección"/>
            <Box_Text_Value id="editTelefono" Label="Telefono"/>
            <Btn_Save nameId={"editCliente"} showContent='text+icon'/>
    </div>
    </div>
  )
}

export default O_editEmployee