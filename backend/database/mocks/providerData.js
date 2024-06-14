// import dataLocatsion from "./localidades.json" assert { type: "json" };
import { readFileSync } from 'fs';

const states = JSON.parse(readFileSync('./provincias.json'));
const dataLocation = JSON.parse(readFileSync('./localidades.json'));
const categorias = JSON.parse(readFileSync('./categorias.json'));
const subcategorias = JSON.parse(readFileSync('./subcategorias.json'));

if (typeof dataLocation !== 'object') {
   throw new Error('El archivo localidades.json no es de tipo JSON');
}

// Ahora puedes usar dataLocation con confianza sabiendo que es un objeto JSON

/* function providerStates(locations) {
  const nombresProvincias = [];
  let idProv = 0;

  // Iterar sobre las localidades y extraer los nombres de las provincias
  locations.localidades.forEach((localidades) => {
    if (!nombresProvincias.includes(localidades.provincia.nombre)) {
      nombresProvincias.push(localidades.provincia.nombre);

      idProv = idProv + 1;
    }
  });
  return nombresProvincias;
}

export function providerStatesconN(data) {
  const nombresProvincias = [];
  let idProv = 0;

  // Iterar sobre las provincias y agregar el id
  data.forEach((provincia) => {
    if (!nombresProvincias.includes(provincia)) {
      nombresProvincias.push({ id: idProv, provincia: provincia });

      idProv = idProv + 1;
    }
  });
  return nombresProvincias;
} */

// funcion que retorna el listado para select categorias
export function providerCategories() {
   try {
      return categorias;
   } catch (error) {
      return error;
   }
}

export function providerSubCategories(category) {
   const subcategories = subcategorias;
   const respSubcategories = [];

   try {
      // Iterar sobre las localidades y extraer los nombres de las ciudades
      subcategories.preferencias.forEach((preference) => {
         if (
            preference.categoryId === category &&
            !respSubcategories.includes(preference)
         ) {
            respSubcategories.push(preference);
         }
      });
   } catch (error) {
      return error;
   }

   return respSubcategories;
}

// funcion que retorna el listado para select pais
export function providerContry() {
   return 'Argentina';
}

// funcion que retorna el nombre de los states
export function providerStates() {
   try {
      return states;
   } catch (error) {
      return error;
   }
}

// funcion que al recibir el nombre del state devuelte las citys
export function providerCitys(stateId) {
   const locations = dataLocation;
   const state = states.states?.filter((item) => item.id === stateId)[0].provincia; // revisar == a ===
   console.log(state);
   const nombresCitys = [];

   try {
      // Iterar sobre las localidades y extraer los nombres de las ciudades
      locations.localidades.forEach((localidades) => {
         if (
            localidades.provincia.nombre === state &&
            !nombresCitys.includes(localidades.municipio.nombre)
         ) {
            nombresCitys.push(localidades.municipio.nombre);
         }
      });

      const citysConNumber = providerCitysconN(nombresCitys);
      return citysConNumber;
   } catch (error) {
      console.log('Error en la función providerCitys: ', error);
   }
}

export function providerCitysconN(data) {
   const nombresProvincias = [];
   let idProv = 0;

   try {
      // Iterar sobre las ciudades y agregar los Ids
      data.forEach((provincia) => {
         if (!nombresProvincias.includes(provincia)) {
            nombresProvincias.push({ id: idProv, city: provincia });

            idProv = idProv + 1;
         }
      });
      return nombresProvincias;
   } catch (e) {
      console.log('Error en providerCitysconN: ', e);
   }
}

const repcitys = providerCitys(0);
// let repstates = providerStates();
// let repcategory = providerCategories();
// let respsubCategory = providerSubCategories(7);

console.log('Result States', repcitys);
// console.log('Result Citys', repstates);

// console.log('Result Category', repcategory);
// console.log('Result subCategory', respsubCategory);
