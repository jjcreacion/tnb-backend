import { ReadUserDto } from "@/user/dto/readUser.dto"; 

export class ReadDeviceDto {
    pkDevice: string;
    expoPushToken: string;
    platform: string;
    notificationsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    user?: ReadUserDto; 
}