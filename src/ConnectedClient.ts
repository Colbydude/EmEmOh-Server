import { Socket } from 'net';

import Transform from './Transform';

export default class ConnectedClient {
    public Transform: Transform = { X: 0, Y: 0};
    private _id: number;
    private _socket: Socket;

    constructor(id: number, socket: Socket) {
        this._id = id;
        this._socket = socket;
    }

    public get ID(): number {
        return this._id;
    }

    public get Socket(): Socket {
        return this._socket;
    }
}
