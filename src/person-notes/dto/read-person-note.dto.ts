import { ApiProperty } from "@nestjs/swagger";
import { ContactEntity } from "@/contact/entities/contact.entity";
import { UserEntity } from "@/user/entities/user.entity";

export class ReadPersonNoteDto {
    @ApiProperty()
    pkNote: number;
    
    @ApiProperty()
    note: string;
    
    @ApiProperty()
    isPriority: number;
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
    
    @ApiProperty()
    contact: ContactEntity;
    
    @ApiProperty()
    user: UserEntity;
}