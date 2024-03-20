import { Encounter } from "./encounter.model";

export interface EncounterExecution {
    id: number,
    encounterId: number,
    encounter: Encounter,
    touristId: number,
    status: string,
    startTime: Date
}