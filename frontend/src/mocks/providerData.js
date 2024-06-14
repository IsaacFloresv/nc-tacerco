// GENERO CAMBIO PARA VER DE SOLUCIONAR EL PROBLEMA

import state from './provincias.json';
import localidades from './localidades.json';
import categoriesResponse from './categorias.json';
import subCategories from './subcategorias.json';

const states = [...state.states];
const dataLocation = localidades;
const categorias = categoriesResponse.categories;
const subcategorias = subCategories.preferencias;
// console.log('estas son las states', states);
// console.log('estas son las dataLocation', dataLocation);
// console.log('estas son las categorias', categorias);
// console.log('estas son las subcategorias', subcategorias);

//funcion que retorna el listado para select categorias
function providerCategories() {
   try {
      return categorias;
   } catch (error) {
      return error;
   }
}

function providerSubCategories(categoryId) {
   const subcategories = subcategorias;
   const respSubcategories = [];

   try {
      // Iterar sobre las localidades y extraer los nombres de las ciudades
      subcategories.forEach((preference) => {
         if (
            preference.categoryId === categoryId &&
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

//funcion que retorna el listado para select pais
function providerContry() {
   return 'Argentina';
}

function providerCitysconN(data) {
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

//funcion que retorna el nombre de los states
function providerStates() {
   try {
      return states;
   } catch (error) {
      return error;
   }
}

//funcion que al recibir el nombre del state devuelte las citys
function providerCitys(cityId) {
   const locations = dataLocation;
   const state = states.states?.filter((item) => item.id == cityId)[0].provincia;
   console.log(state);
   const nombresCitys = [];

   try {
      // Iterar sobre las localidades y extraer los nombres de las ciudades
      locations.localidades.forEach((localidades) => {
         if (
            localidades.provincia.nombre === state &&
            !nombresCitys.includes(localidades.municipio.nombre) &&
            localidades.municipio.nombre !== '' &&
            localidades.municipio.nombre !== null
         ) {
            nombresCitys.push(localidades.municipio.nombre);
         }
      });

      let citysConNumber = providerCitysconN(nombresCitys);
      return citysConNumber;
   } catch (error) {
      console.log('Error en la función providerCitys: ', error);
   }
}

// funcion que al recibir el nombre del state devuelte las citys
function providerCitysN(state) {
   const locations = dataLocation;
   // const state = states.states?.filter(item => item.id == stateId)[0].provincia

   const nombresCitys = [];

   try {
      // Iterar sobre las localidades y extraer los nombres de las ciudades
      locations.localidades.forEach((localidades) => {
         if (
            localidades.provincia.nombre === state &&
            !nombresCitys.includes(localidades.municipio.nombre) &&
            localidades.municipio.nombre !== '' &&
            localidades.municipio.nombre !== null
         ) {
            nombresCitys.push(localidades.municipio.nombre);
         }
      });

      let citysConNumber = providerCitysconN(nombresCitys);
      return citysConNumber;
   } catch (error) {
      console.log('Error en la función providerCitys: ', error);
   }
}

// let repcitys = providerCitys(5);

// let repstates = providerStates();
// let repcategory = providerCategories();
// let respsubCategory = providerSubCategories(7);

// console.log('Result States', repcitys);
// console.log('Result Citys', repstates);

// console.log('Result Category', repcategory);

// console.log('Result subCategory', respsubCategory);
export default {
   providerCategories,
   providerCitys,
   providerSubCategories,
   providerContry,
   providerCitysconN,
   providerStates,
   providerCitysN
};
