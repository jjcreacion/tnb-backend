import { Module } from '@nestjs/common';
import { ClientTypeQuestionsService } from './client-type-questions.service';
import { ClientTypeQuestionsController } from './client-type-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEnTity } from '@/client-type-questions/entities/client-type-question.entity';

@Module({
  imports:[  TypeOrmModule.forFeature([QuestionEnTity])],
  controllers: [ClientTypeQuestionsController],
  providers: [ClientTypeQuestionsService],
  exports:[ClientTypeQuestionsService]
})
export class ClientTypeQuestionsModule {}
