export default interface Transform {
    X: number;
    Y: number;
}

export interface TransformWithId extends Transform {
    ID: number;
}
