
export class ReadProfileDto {
    pkProfile: number;
    name: string;
    alias: string;
    description?: string;
    phone: string;
    phoneExtension?: string;
    address: string;
    zipCode: number;
    industry: string;
    source: string;
    urlProfileImage: string;
    urlBannerImage: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}