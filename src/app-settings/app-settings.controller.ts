import { Controller, Get, Param } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { ReadSettingDto } from './dto/read-setting.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('App Settings')
@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Get(':key')
  @ApiOperation({ summary: 'Get an application setting by key' })
  @ApiParam({ name: 'key', description: 'The key of the setting to retrieve', type: 'string', example: 'some_key' })
  @ApiResponse({ status: 200, description: 'The setting was found.', type: ReadSettingDto })
  @ApiResponse({ status: 404, description: 'Setting not found.' })
  findOne(@Param('key') key: string): Promise<ReadSettingDto> {
    return this.appSettingsService.findOne(key);
  }
}

