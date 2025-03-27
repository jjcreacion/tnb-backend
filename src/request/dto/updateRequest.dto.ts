import { PartialType } from '@nestjs/swagger';
import { CreateRequestDto } from './createRequest.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
