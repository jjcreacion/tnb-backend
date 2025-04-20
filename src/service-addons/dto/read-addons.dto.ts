export class ReadAddonsDto {
    pkAddon: number;
    isReailt: number;
    name: string;
    description: string;
    contentWeb: string;
    price: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkService: number;
    fkServiceType: number;
    fkClientType: number;
}