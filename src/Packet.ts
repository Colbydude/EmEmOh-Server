export default interface Packet {
    header: PacketType;
}

export interface PlayerTransformPacket extends Packet {
    X: number;
    Y: number;
}

export enum PacketType {
    Heartbeat = 0,
    PlayerTransform
}
