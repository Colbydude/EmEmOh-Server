import Net, { Socket } from 'net';
import ConnectedClient from './ConnectedClient';
import Packet, { PacketType } from './Packet';

export default class Server {
    private _connectedClients: Map<number, ConnectedClient>;
    private _nextId = 0;
    private _port = 6969;
    private _serverInstance: Net.Server;

    constructor() {
        this._connectedClients = new Map();
        this._serverInstance = new Net.Server();
    }

    public Listen(port?: number): void {
        this._port = port ?? this._port;

        this._serverInstance.on('listening', () => {
            console.log(`Now listening... on port ${this._port}`);
        });

        this._serverInstance.on('connection', (socket: Socket) => this.HandleIncomingConnection(socket));

        this._serverInstance.listen(this._port);
    }

    private HandleIncomingConnection(socket: Socket): void {
        // New connection incoming.
        console.log('New connection...');
        const client = new ConnectedClient(this._nextId++, socket);

        // Set socket events.
        socket.on('data', () => {
            // @TODO
        });

        socket.on('error', () => {
            console.log(`Client ${client.ID} disconnected...`);
            this._connectedClients.delete(client.ID);
        });

        // Send incoming player data to existing clients.
        this.SendToAllClients({
            header: PacketType.PlayerTransform,
            X: client.Transform.X,
            Y: client.Transform.Y
        });

        // Add new client to list of connected clients.
        this._connectedClients.set(client.ID, client);
    }

    // @NOTE: Properly handle packet types extending from Packet interface.
    private SendToAllClients(packet: any): void {
        this._connectedClients.forEach((client) => {
            client.Socket.write(Buffer.from(JSON.stringify(packet)));
        });
    }
}
