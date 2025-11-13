import { ReadUserDto } from "@/user/dto/readUser.dto"; 

export class ReadDeviceDto {
    pkDevice: number;
    expoPushToken: string;
    platform: string;
    notificationsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    user?: ReadUserDto; 
}