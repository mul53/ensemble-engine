import { CommandDto } from "../command/commad.dto";

export class OnboardCommandDto extends CommandDto {
  readonly depositAmount: string;
}