export interface LemonModel {
    exo: string;
    cap: string;
    cloth: string;
    eyes: string;
    head: string;
    teeth: string;
}
export interface LemonSettings {
    model: LemonModel;
}
export interface Lemons {
    [key: string]: LemonSettings;
}
declare const lemons: Lemons;
export default lemons;
