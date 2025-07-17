 const personas = [
    new Persona('Ejemplo: Juan', 'Perez')
]


function mostrar(){
    let texto =''
    personas.forEach((persona, index) => {
        texto += `<li>${persona.nombre} ${persona.apellido} </li>`
        texto += `<button onclick="eliminar(${index})" style="cursor: pointer; ">-</button>`
        texto += `<button onclick="modificar(${index})" style="cursor: pointer;">📝</button>`
    });
    document.getElementById('personas').innerHTML = texto;
}


function agregar(){
    const formulario = document.forms['forma'];
    const nombre = formulario['nombre'];
    const apellido = formulario['apellido'];
    if (nombre.value != '' && apellido.value != ''){

        const persona = new Persona(nombre.value, apellido.value);
        
        personas.push(persona);
        mostrar();
    }
    else{
        alert('El formulario esta vacio mi bro')
    }
}

function eliminar(index) {
    personas.splice(index, 1)
    
    let contadorEliminaciones = eliminar.contadorEliminaciones || 0;
    contadorEliminaciones++;
    eliminar.contadorEliminaciones = contadorEliminaciones;
    console.log(`Se elimino: ${contadorEliminaciones}`);


    if (confirm('Estás seguro de que quieres eliminar esta persona mi bro?')) {   
        mostrar();
    }
}

function modificar(index) {
    const persona = personas[index];
    const nuevoNombre = prompt('Modificar nombre:', persona.nombre);
    const nuevoApellido = prompt('Modificar apellido:', persona.apellido);

    if (nuevoNombre !== null && nuevoNombre.trim() !== '' && nuevoApellido !== null && nuevoApellido.trim() !== '') {
        persona.nombre = nuevoNombre.trim();
        persona.apellido = nuevoApellido.trim();
        mostrar();
    } else {
        alert('El formulario está vacío mi bro');
    }
}

function exportarAExcel() {

  const worksheet = XLSX.utils.json_to_sheet(personas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Personas");


  XLSX.writeFile(workbook, "lista_personas.xlsx");
}

