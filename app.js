import { inquirerMenu, pausa, leerInput, ListadoTareasBorrar, confirmar, mostrarListadoCheackList} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

//const {mostrarMenu, pausa} = require('./helpers/mensaje');

const main= async()=>{
    let opt='';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        opt= await inquirerMenu();
        
        switch(opt){
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheackList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await ListadoTareasBorrar(tareas.listadoArr);
                if(id!=='0'){
                    const confirm = await confirmar('¿Está seguro?');
                    if(confirm){
                        tareas.borrarTareas(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    }while(opt!=='0');

    //pausa();
}

main();