import { QuestionEnTity } from '@/client-type-questions/entities/client-type-question.entity';
import { ReadQuestionDto } from '@/client-type-questions/dto/read-client-type-question.dto';


export class QuestionMapper{

  static entityToReadQuestionDto(entity:QuestionEnTity):ReadQuestionDto{
      let responseDto = new ReadQuestionDto();
        responseDto.pkQuestion = entity.pkQuestion;
        responseDto.name = entity.name;
        responseDto.description = entity.description;
        if(entity.clientType)responseDto.fkClientType = entity.clientType.pkType;
        responseDto.status = entity.status;
        responseDto.updatedAt =entity.updatedAt;
        responseDto.createdAt = entity.createdAt;

      return responseDto;
  }



}