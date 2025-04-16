export class ReadServiceAddonDto {
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
    fkSubCategory: number;
    fkServiceType: number;
    fkClientType: number;
}