import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/createPerson.dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';
import {ReadPersonDto} from "@/person/dto/readPerson.dto";
import {ValidID} from "@/utils/validID";
import {PersonMapper} from "@/person/mapper/person.mapper";

@Controller('person')
export class PersonController {
  constructor(
      private readonly personService: PersonService,
  ) {}

  @Post()
  async create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
             createPersonDto: CreatePersonDto) {
    return await this.personService.create(createPersonDto);
  }

  @Get('findAll')
  async findAll(): Promise<ReadPersonDto[]> {
    return await this.personService.findAll();
  }

  @Get(':findByPk')
  async findOne(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
              validPersonId: ValidID) : Promise<ReadPersonDto> {
    const responseEntity = await this.personService.findOneBy(validPersonId);

    const responseDto = PersonMapper.entityToReadPersonDto(
        responseEntity
    );

    return responseDto;
  }

  @Patch()
  async update(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
                   updatePersonDto: UpdatePersonDto) {
    return await this.personService.update(updatePersonDto);
  }




  /*// Ejemplo en el controlador de login
    @Post('login')
    async login() {
        const user = [] //Ejemplo de buscar un usuario
        if (!user) {
            throw new UnauthorizedException();
        }
        // si existe enviamos info personal del usuario al middleware para saber que onda
        const payload = { sub: 1, username: 2 };
        const token = await this.authService.generateToken(payload);

        return { access_token: token };
    }*/
}
