import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ClientTypeQuestionsService } from './client-type-questions.service';
import { CreateClientTypeQuestionDto } from './dto/create-client-type-question.dto';
import { UpdateClientTypeQuestionDto } from './dto/update-client-type-question.dto';

@Controller('client-type-questions')
export class ClientTypeQuestionsController {
  constructor(private readonly clientTypeQuestionsService: ClientTypeQuestionsService) {}

  @Post()
  create(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
           createClientTypeQuestionDto: CreateClientTypeQuestionDto
  ) {
    return this.clientTypeQuestionsService.create(createClientTypeQuestionDto);
  }

  @Get("findAllWithParent")
  findAll() {
    return this.clientTypeQuestionsService.findAllWithParent();
  }

  @Get('findOne/:id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.clientTypeQuestionsService.findOne(+id);
  }

  @Patch('update')
  update( @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
            updateClientTypeQuestionDto: UpdateClientTypeQuestionDto
  ){
    return this.clientTypeQuestionsService.update(updateClientTypeQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.clientTypeQuestionsService.remove(+id);
  }
}
