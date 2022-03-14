export interface LemonSettings {
    model: string;
    scale: number;
    weaponCoord: [number, number, number];
    light: number;
}
export interface Lemons {
    [key: string]: LemonSettings;
}
declare const lemons: Lemons;
export default lemons;
