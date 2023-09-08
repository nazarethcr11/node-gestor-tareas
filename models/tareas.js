import Tarea from './tarea.js';

class Tareas{
    _listado = {};

    constructor(){
        this._listado = {};
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
        this.listadoArr.forEach((tarea, i)=>{
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArr.forEach((tarea, i)=>{
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)? 'Completada'.green : 'Pendiente'.red;

            if(completadas===true && completadoEn){
            contador += 1;
            console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`);
            }else if(completadas===false && !completadoEn){
            contador += 1;
            console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
            }
        });
    }
    borrarTareas(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
    
    toggleCompletadas(ids =[]){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

export default Tareas;