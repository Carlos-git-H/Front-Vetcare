import React from 'react'
import "../../Layouts/Layouts.css"
import C_Title from '../../Components/CS_General/C_Title/C_Title'
import C_FromData_Em from '../../Components/CS_Employees/C_FromData_Em/C_FromData_Em'
import C_CardData from '../../Components/CS_Employees/C_CardData_Em/C_CardData'
import Btn_Edit from '../../Components/CS_General/Buttons/Btn_Edit'

function L_Profile_Em() {
  return (
      <section className='Layout'>
        <div className='Content_Layout'>
            <C_Title nameTitle={"Perfil"}/>
            <C_CardData />
            <C_FromData_Em />
            <Btn_Edit nameId={"btn_edit"} showContent='text+icon'/>

        </div>
    </section>
    
  )
}

export default L_Profile_Em