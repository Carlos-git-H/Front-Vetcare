import React from 'react'
import "./C_Statisclas.css"

import C_StatisticalBox from './C_statisticalBox/C_StatisticalBox'

function C_Statisclas() {
  return (
    <div className='Statistics'>
        <C_StatisticalBox TitleStatistical={"Citas de Hoy"} NumberStatistical={"5"}></C_StatisticalBox>
        <C_StatisticalBox TitleStatistical={"Pacientes Activos"} NumberStatistical={"27"}></C_StatisticalBox>
        <C_StatisticalBox TitleStatistical={"Recordatorios de Hoy"} NumberStatistical={"14"}></C_StatisticalBox>
    </div>
  )
}

export default C_Statisclas