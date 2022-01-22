import { Docente } from "./docente";
import { Proyecto } from 'src/app/interfaces/proyecto';

export interface Participa {
    idParticipa: number,
    cargo: string,
    facultad: string,
    anioParticipaDoc: Date,
    horasParticipacion: number,
    docente: Docente,
    proyecto: Proyecto
}
