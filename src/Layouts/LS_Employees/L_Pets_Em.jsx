import React from 'react'
import "../../Layouts/Layouts.css"
import C_Title from '../../Components/CS_General/C_Title/C_Title'
import C_TableMascotas from '../../Components/CS_Employees/C_TablaMascotas'
import Btn_New from '../../Components/CS_General/Buttons/Btn_New'

function L_Pets_Em() {
  return (
    <section className='Layout'>
        <div className='Content_Layout'>
            <C_Title nameTitle={"Gestión de Mascotas"}/>
            <C_TableMascotas />
            <Btn_New nameId={'nuevaMascota'} name={'Mascota'} showContent='text+icon' />
        </div>
    </section>
  )
}

export default L_Pets_Em