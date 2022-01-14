import { TransformWithId } from './Transform';

export default interface Packet {
    header: PacketType;
}

export interface PlayerListPacket extends Packet {
    players: TransformWithId[];
}

export interface PlayerTransformPacket extends Packet {
    transform: TransformWithId;
}

export enum PacketType {
    Heartbeat = 0,
    PlayerLeave,
    PlayerList,
    PlayerTransform
}
