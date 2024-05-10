import { CommandDto } from "../command/commad.dto";

export class LoadTestCommandDto extends CommandDto {
  readonly numberOfWallets: number;
  readonly duration: number;
}