import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from "@nestjs/common";
import {PersonEmailService} from "@/person-emails/person-emails.service";
import {CreatePersonEmailDto} from "@/person-emails/dto/create-person-email.dto";
import {ReadPersonEmailDto} from "@/person-emails/dto/read-person-email.dto";
import {UpdatePersonEmailDto} from "@/person-emails/dto/update-person-email.dto";

@Controller('person-email')
export class PersonEmailController {
  constructor(private readonly personEmailService: PersonEmailService) {}

  @Post()
  create(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: CreatePersonEmailDto
  ) {
    return this.personEmailService.create(dto);
  }

  @Get('findAll')
  findAll(): Promise<ReadPersonEmailDto[]> {
    return this.personEmailService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ReadPersonEmailDto> {
    return this.personEmailService.findOne(id);
  }

  @Patch()
  update(
      @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
          dto: UpdatePersonEmailDto
  ) {
    return this.personEmailService.update(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.personEmailService.remove(id);
  }
}
