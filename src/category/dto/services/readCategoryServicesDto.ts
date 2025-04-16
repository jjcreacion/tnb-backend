export class ReadCategoryServicesDto {
    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkCategory: number;
}