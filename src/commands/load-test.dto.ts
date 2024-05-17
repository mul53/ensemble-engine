import { CommandDto } from "./commad.dto";

export class LoadTestCommandDto extends CommandDto {
  readonly numberOfWallets: number;
  readonly duration: number;
}