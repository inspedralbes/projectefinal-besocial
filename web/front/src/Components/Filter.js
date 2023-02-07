import React from 'react'
import '../Pages/css/style.css';
import 'leaflet/dist/leaflet.css';
import filtericon from './filter.svg';

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  let fechaHoy = year + '-' + month + '-' + day;
  
export default function Filter (){
  return (
    <div className='filtersContainer'>
      <img src={filtericon} alt='filter icon' width={50}/>
        <form action='#'>
            <div className='searchbyName'>
              <label for='nombre'>Nombre</label>
              <input type='text' name='nombre' id='nombre' placeholder='Nombre del evento o local'/> 
            </div>

            <div className='searchbyDate'>
              <label for='fecha'>Fecha</label>
              <input type='date' name='fecha' id='fecha' defaultValue={fechaHoy} min={fechaHoy}/>
            </div>

            <div className='searchbyDistance'>
              <label for='distancia'>Distancia</label>
              <input type='text' name='distancia' id='distancia' placeholder='Distancia de tu ubicación'/> 
            </div>
            
          <button type='submit' style={{margin : 0}}>Buscar</button>  
        </form>
    </div>
  )
}
