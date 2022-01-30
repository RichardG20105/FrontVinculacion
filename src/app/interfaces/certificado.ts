import { Integra } from "./integra";
import { Participa } from "./participa";

export interface Certificado{
    idCertificado: Number,
    fechaEntrega: Date,
    fechaRecepcion: Date,
    observacionCertificado: String,
    integra: Integra,
    participa: Participa
}