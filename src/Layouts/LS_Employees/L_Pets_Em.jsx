import React from 'react'
import "../../Layouts/Layouts.css"
import C_Title from '../../Components/CS_General/C_Title/C_Title'
import C_TablaMascotas from '../../Components/CS_Employees/C_TablaMascotas'

function L_Pets_Em() {
  return (
    <section className='Layout'>
        <div className='Content_Layout'>
            <C_Title nameTitle={"Gestión de Mascotas"}/>
            <C_TablaMascotas />
        </div>
    </section>
  )
}

export default L_Pets_Em