import { CommandDto } from "./commad.dto";

export class CallCommandDto extends CommandDto {
  readonly fromWalletAddress: string;
  readonly contractAddress: string;
  readonly contractAbi: string;
  readonly contractMethod: string;
  readonly methodParams: string;
}