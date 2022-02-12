import { Carrera } from "./carrera";
import { Facultad } from "./facultad";

export interface Proyecto {
    idProyecto: number,
    codigo: string,
    nombreProyecto: string,
    resolucion: string,
    estado: string,
    facultad: Facultad,
    carreras: Carrera[]
}
