import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe implements PipeTransform {
    transform(value: string | undefined): number | null {
        if (value === undefined || value === null || value === '') {
            return null;
        }

        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) {
            throw new BadRequestException('Validation failed (numeric string expected)');
        }

        return parsed;
    }
}
