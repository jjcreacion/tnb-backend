export class ReadServiceDto {
    pkService: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    fkCategory: number; // Add categoryId for potential inclusion
}