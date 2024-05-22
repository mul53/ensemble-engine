import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { AddWalletsDto } from './dto/add-wallets.dto';
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  async create(@Body() createCommandDto: CreateCommandDto) {
    return this.commandsService.create(createCommandDto);
  }

  @Put('/:id/wallets')
  async updateGroupId(@Body() addWallets: AddWalletsDto) {
    return this.commandsService.updateGroupId(addWallets);
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
