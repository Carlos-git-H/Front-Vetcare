import React from 'react'
import "../../Layouts/Layouts.css"
import C_Title from '../../Components/CS_General/C_Title/C_Title'
import C_Statisclas from '../../Components/CS_General/C_Statiscals/C_Statisclas'
import PaymentButton from '../../Components/CS_General/Buttons/PaymentButton'
function L_Agenda_Cl() {


  return (
    <section className='Layout'>
        <div className='Content_Layout'>
            <C_Title nameTitle={"Agenda"}/>
            <C_Statisclas />            
            <PaymentButton />

        </div>
    </section>
    
  )
}

export default L_Agenda_Cl