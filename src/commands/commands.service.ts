import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command } from './schemas/command.schema';
import { COMMANDS } from './entities/command.config';
import { AddWalletsDto } from './dto/add-wallets.dto';

@Injectable()
export class CommandsService {

  constructor(@InjectModel(Command.name) private commandModel: Model<Command>) {}

  async create(createCommandDto: CreateCommandDto): Promise<Command> {
    const commandType = this.findOneType(createCommandDto.name);

    if (!commandType?.template) {
      throw new Error('Command type is not supported yet.');
    }

    const kpi = this.buildKpi(commandType.template, createCommandDto);
    console.log('generating kpi', kpi);
    return this.commandModel.create({ ...createCommandDto, kpi });
  }

  async updateGroupId(addWallets: AddWalletsDto): Promise<Command> {
    const { commandId, groupId } = addWallets;
    const updatedCommand = await this.commandModel.findByIdAndUpdate(
      commandId,
      { groupId },
      { new: true }
    );

    if (!updatedCommand) {
      throw new NotFoundException(`Command with ID ${commandId} not found`);
    }

    return updatedCommand;
  }



  findAll() {
    // return `This action returns all commands`;
    return this.commandModel.find().exec();
  }

  findAllTypes() {
    return COMMANDS;
  }

  findOneType(name: string) {
    return COMMANDS.find(cmd => cmd.name === name);
  }

  findOne(id: number) {
    return this.commandModel.findById(id).exec();
  }

  findActive() {
    return this.commandModel.find({ isActive: true }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }

  buildKpi = (template: Object, createCommandDto: CreateCommandDto) => {
    const params = JSON.parse(createCommandDto.params);
    return {
      template,
      params,
      func: this.traverseAndInterpolate(template, params)
    }
  }

  private traverseAndInterpolate(obj: any, params: any): any {
    if (typeof obj === 'string') {
      return obj.replace(/\$\w+/g, (match) => {
        const key = match.slice(1); // Remove the $ sign
        return params[key] !== undefined ? params[key] : match;
      });
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => this.traverseAndInterpolate(item, params));
    }
  
    if (typeof obj === 'object' && obj !== null) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.traverseAndInterpolate(value, params);
      }
      return result;
    }
  
    return obj;
  }
}
