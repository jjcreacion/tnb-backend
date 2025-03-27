import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './createCategory.dto';

export class UpdatCategoryDto extends PartialType(CreateCategoryDto) {}
