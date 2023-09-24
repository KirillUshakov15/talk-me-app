
export class QueryRoomDto {
    roomID: string;
    userID: string;
    page: number;
}

export class QueryRoomsDto {
    userID: string;
    queryText: string;
    page: number;
    limit: number
}