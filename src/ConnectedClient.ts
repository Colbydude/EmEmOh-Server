import { encode } from '@msgpack/msgpack';
import { Socket } from 'net';

import Transform from './Transform';
import { getRandomInt } from './utils';

export default class ConnectedClient {
    public Transform: Transform;
    private _id: number;
    private _socket: Socket;

    constructor(id: number, socket: Socket) {
        this._id = id;
        this._socket = socket;

        // Spawn at "random" location.
        this.Transform = { X: getRandomInt(100), Y: getRandomInt(100) };
    }

    public get ID(): number {
        return this._id;
    }

    public get Socket(): Socket {
        return this._socket;
    }

    public SendPacket(packet: any): void {
        this._socket.write(encode(packet));
    }
}
