import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientTypeQuestionDto } from './dto/create-client-type-question.dto';
import { UpdateClientTypeQuestionDto } from './dto/update-client-type-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientTypeEntity } from '@/client-type/entities/clientType.entity';
import { Repository } from 'typeorm';
import { ReadQuestionDto } from '@/client-type-questions/dto/read-client-type-question.dto';
import { QuestionEnTity } from '@/client-type-questions/entities/client-type-question.entity';
import { ClientTypeService } from '@/client-type/client-type.service';
import { ValidID } from '@/utils/validID';
import { QuestionMapper } from '@/client-type-questions/mapper/client-type-question.mapper';

@Injectable()
export class ClientTypeQuestionsService {


  constructor(
    @InjectRepository(ClientTypeEntity)
    private readonly questionRepository: Repository<QuestionEnTity>,
    private readonly clientTypeService : ClientTypeService
  ) {}


  async create(createClientTypeQuestionDto: CreateClientTypeQuestionDto):Promise<ReadQuestionDto> {
    const tempQuestion = this.questionRepository.create(createClientTypeQuestionDto);

    const clientType = await this.clientTypeService.findOne(new ValidID(createClientTypeQuestionDto.fkClientType));

    if(!clientType){ throw new HttpException(`Client Type with ID `+createClientTypeQuestionDto.fkClientType+' Not Found', HttpStatus.NOT_FOUND);}
    tempQuestion.clientType = {pkType : clientType.pkType } as ClientTypeEntity;

    const insert = await this.questionRepository.save(tempQuestion);

    if(!insert){ throw new HttpException(`Question are not added`, HttpStatus.NOT_MODIFIED);}

    return

  }

  async findAllWithParent() {

    return await this.questionRepository.find({relations:['clientType']}).then( questions =>
      questions.map( (question) => {
          QuestionMapper.entityToReadQuestionDto(question)
      }))
  }

  async findOne(id: number):Promise<ReadQuestionDto> {
    let entity = await this.questionRepository.findOne({
      where : {pkQuestion : id},
      relations: ['clientType']
    })
    if(!entity){throw new HttpException(`Question with ID ${id}  Not Found`, HttpStatus.NOT_FOUND);}

    return QuestionMapper.entityToReadQuestionDto(entity);
  }

  async update(updateClientTypeQuestionDto: UpdateClientTypeQuestionDto):Promise<{ message: string, status: HttpStatus, question:ReadQuestionDto | null }> {

    let entity = await this.questionRepository.findOne({
      where : {pkQuestion : updateClientTypeQuestionDto.pkQuestion},
      relations: ['clientType']
    })
    if(!entity){throw new HttpException(`Question with ID ${updateClientTypeQuestionDto.pkQuestion}  Not Found`, HttpStatus.NOT_FOUND);}

    const clientType = await this.clientTypeService.findOne(new ValidID(updateClientTypeQuestionDto.fkClientType));

    if(!clientType){ throw new HttpException(`Client Type with ID `+updateClientTypeQuestionDto.fkClientType+' Not Found', HttpStatus.NOT_FOUND);}


    const merge = await this.questionRepository.merge(entity,updateClientTypeQuestionDto);

    const update = await this.questionRepository.save(merge);

    if(!update){ return {message :'Error Upgrade' , status: HttpStatus.NOT_MODIFIED, question:null}}

    return {message :'Update Completed' , status: HttpStatus.OK, question:QuestionMapper.entityToReadQuestionDto(update)}
  }

  async remove(id: number):Promise<{ message: string, status: HttpStatus }> {
    let entity = await this.questionRepository.findOne({
      where : {pkQuestion : id},
      relations: ['clientType']
    })
    if(!entity){throw new HttpException(`Question with ID ${id}  Not Found`, HttpStatus.NOT_FOUND);}

    const remove = await this.questionRepository.remove(entity);

    if(!remove){ return {message :'Error Delete' , status: HttpStatus.NOT_MODIFIED}}

     return {message :'Delete Completed' , status: HttpStatus.OK }
  }
}
