import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PersonNoteEntity} from "@/person-notes/entities/person-note.entity";
import {Repository} from "typeorm";
import {CreatePersonNoteDto} from "@/person-notes/dto/create-person-note.dto";
import {ReadPersonNoteDto} from "@/person-notes/dto/read-person-note.dto";
import {PersonNoteMapper} from "@/person-notes/mapper/person-note.mapper";
import {UpdatePersonNoteDto} from "@/person-notes/dto/update-person-note.dto";
import {ContactEntity} from "@/contact/entities/contact.entity";
import {UserEntity} from "@/user/entities/user.entity";

@Injectable()
export class PersonNotesService {
  constructor(
      @InjectRepository(PersonNoteEntity)
      private readonly noteRepo: Repository<PersonNoteEntity>,
      @InjectRepository(ContactEntity)
      private readonly contactRepo: Repository<ContactEntity>,
      @InjectRepository(UserEntity) 
      private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreatePersonNoteDto): Promise<ReadPersonNoteDto> {
    const entity = this.noteRepo.create(dto);
    entity.contact = {pkContact : dto.fkContact} as ContactEntity;
    
    // Si se proporciona un usuario, asignarlo; de lo contrario, usar el valor por defecto (42)
    if (dto.fkUser) {
      entity.user = {pkUser : dto.fkUser} as UserEntity;
    } else {
      entity.user = {pkUser : 42} as UserEntity; // Usuario por defecto según el comentario en la BD
    }
    
    const saved = await this.noteRepo.save(entity);
    return PersonNoteMapper.entityToReadPersonNoteDto(saved);
  }
  
  async findAll(): Promise<ReadPersonNoteDto[]> {
    const notes = await this.noteRepo.find({ 
      relations: ["contact", "user"] 
    });
    return notes.map(PersonNoteMapper.entityToReadPersonNoteDto);
  }

  async findOne(id: number): Promise<ReadPersonNoteDto> {
    const note = await this.noteRepo.findOne({
      where: { pkNote: id },
      relations: ["contact", "user"]
    });
    if (!note) {
      throw new HttpException(`Note with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return PersonNoteMapper.entityToReadPersonNoteDto(note);
  }

  async findByContact(id: number): Promise<ReadPersonNoteDto[]> {
    const notes = await this.noteRepo.find({
      where: { contact: { pkContact: id } },
      relations: ["contact", "user"]
    });
    return notes.map(PersonNoteMapper.entityToReadPersonNoteDto);
  }

  async findByUser(id: number): Promise<ReadPersonNoteDto[]> {
    const notes = await this.noteRepo.find({
      where: { user: { pkUser: id } },
      relations: ["contact", "user"]
    });
    return notes.map(PersonNoteMapper.entityToReadPersonNoteDto);
  }

  async findPriority(): Promise<ReadPersonNoteDto[]> {
    const notes = await this.noteRepo.find({
      where: { isPriority: 1 },
      relations: ["contact", "user"]
    });
    return notes.map(PersonNoteMapper.entityToReadPersonNoteDto);
  }

  async update(dto: UpdatePersonNoteDto): Promise<{
    message: string;
    status: HttpStatus;
    note: ReadPersonNoteDto;
  }> {
    const found = await this.noteRepo.findOneBy({ pkNote: dto.pkNote });
    if (!found) throw new HttpException('Note not found', HttpStatus.NOT_FOUND);

    // Actualizar relaciones si se proporcionan
    if (dto.fkContact) {
      found.contact = {pkContact: dto.fkContact} as ContactEntity;
    }
    if (dto.fkUser) {
      found.user = {pkUser: dto.fkUser} as UserEntity;
    }

    this.noteRepo.merge(found, dto);
    const updated = await this.noteRepo.save(found);
    
    // Cargar las relaciones para la respuesta
    const noteWithRelations = await this.noteRepo.findOne({
      where: { pkNote: updated.pkNote },
      relations: ["contact", "user"]
    });
    
    if (!noteWithRelations) {
      throw new HttpException('Error loading updated note', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return {
      message: "Person note updated",
      status: HttpStatus.OK,
      note: PersonNoteMapper.entityToReadPersonNoteDto(noteWithRelations)
    };
  }

  async remove(id: number): Promise<{ message: string; status: HttpStatus }> {
    const found = await this.noteRepo.findOneBy({ pkNote: id });
    if (!found) {
      throw new HttpException(`Note with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.noteRepo.remove(found);
    return {
      message: "Note deleted",
      status: HttpStatus.OK
    };
  }
}