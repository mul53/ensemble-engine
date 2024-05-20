import { CommandDto } from "./commad.dto";

export class OnboardCommandDto extends CommandDto {
  readonly depositAmount: string;
}