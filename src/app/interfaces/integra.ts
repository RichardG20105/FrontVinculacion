import { Estudiante } from "./estudiante";
import { Proyecto } from "./proyecto";

export interface Integra{
    idIntegra: number,
    carrera: string,
    formaParticipacion: string,
    integraInicio: Date,
    integraFinal: Date,
    estudiante: Estudiante,
    proyecto: Proyecto
}