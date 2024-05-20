import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { Command } from './schemas/command.schema';

function traverseAndInterpolate(obj: any, params: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\$\w+/g, (match) => {
      const key = match.slice(1); // Remove the $ sign
      return params[key] !== undefined ? params[key] : match;
    });
  }

  if (Array.isArray(obj)) {
    return obj.map(item => traverseAndInterpolate(item, params));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = traverseAndInterpolate(value, params);
    }
    return result;
  }

  return obj;
}

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  async create(@Body() createCommandDto: CreateCommandDto) {
    return this.commandsService.create(createCommandDto);
  }

  @Get()
  findAll() {
    return this.commandsService.findAll();
  }

  @Get('types')
  findAllTypes() {
    return this.commandsService.findAllTypes();
  }

  @Get('types/:name')
  findOneType(@Param('name') name: string) {
    return this.commandsService.findOneType(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(+id);
  }
}
