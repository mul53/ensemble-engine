import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command } from './schemas/command.schema';
import { COMMAND_TYPES } from './entities/command-type.entitiy';
import { AddWalletsDto } from './dto/add-wallets.dto';

@Injectable()
export class CommandsService {

  constructor(@InjectModel(Command.name) private commandModel: Model<Command>) {}

  async create(createCommandDto: CreateCommandDto): Promise<Command> {
    console.log(`creating command of type ${createCommandDto.name}`)
    const commandType = this.findOneType(createCommandDto.name);

    if (!commandType?.template) {
      throw new Error('Command type is not supported yet.');
    }

    const goal = this.buildGoal(commandType.template, createCommandDto);
    return this.commandModel.create({ ...createCommandDto, goal });
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
    return COMMAND_TYPES;
  }

  findOneType(name: string) {
    console.log(COMMAND_TYPES.find(cmd => cmd.name === name));
    return COMMAND_TYPES.find(cmd => cmd.name === name);
  }

  findOne(id: number) {
    return this.commandModel.findById(id).exec();
  }

  findActive() {
    return this.commandModel.find({ isActive: true }).exec();
  }

  findPending() {
    return this.commandModel.find({ isActive: true, isPending: true }).exec();
  }

  async setPending(commandId: string, isPending: boolean): Promise<Command> {
    const updatedCommand = await this.commandModel.findByIdAndUpdate(
      commandId,
      { isPending },
      { new: true }
    );

    if (!updatedCommand) {
      throw new NotFoundException(`Command with ID ${commandId} not found`);
    }

    return updatedCommand;
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }

  buildGoal = (template: Object, createCommandDto: CreateCommandDto) => {
    const params = JSON.parse(createCommandDto.params);
    const goal = {
      template,
      params,
      func: this.traverseAndInterpolate(template, params)
    }
    console.log('generated goal is', goal);
    return goal;
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
