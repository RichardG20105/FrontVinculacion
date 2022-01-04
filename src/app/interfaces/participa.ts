import { Docente } from "./docente";

export interface Participa {
    idParticipa: number,
    cargo: string,
    anioParticipaDoc: Date,
    horasParticipacion: number,
    docente: Docente
}
