import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";



/*const CreateJob: React.FC<> = () => {


  const CreateJobValues = {
    position: '',
    company: '',
    description: '',
    createdAt: '',
    location: '',
    type: ''
  }*/

 

  return (
    <Layout>
      <div
        className="bg-cover bg-center h-screen flex justify-center items-center"
        style={{ backgroundImage: `url("img/pattern.svg")` }}
            <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col m-5 md:w-1/2">

        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="puesto">
        Puesto
      </label>
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="puesto" type="text" placeholder="......" required>
        </div>

        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="compañia">
        Compañia
      </label>
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="compañia" type="text" placeholder="......" required>
        </div>

        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="descripcion">
        Descripción
      </label>
            <textarea class="shadow appearance-none border border-red rounded w-full py-6 px-3 text-grey-darker mb-3" id="descripcion" required></textarea>
        </div>

        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="fechadecreacion">
        Fecha de Creación
      </label>
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" type="date" id="fechadecreacion" required>
        </div>


        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="ubicacion">
        Ubicación
      </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 " id="ubicacion" type="text" placeholder="......" required>
        </div>

        <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="tipo">
        Tipo
      </label>
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="tipo" type="text" placeholder="......" required>
        </div>

        <div class="flex items-center justify-between">
            <button class="bg-blue-800 hover:bg-gray-700 text-white font-bold py-4 px-7 rounded" type="submit">
        Crear Empleo
      </button>
           
        </div>
    </div>
      >
       
      </div>
    </Layout>
  );
};

export default CreateJob;
