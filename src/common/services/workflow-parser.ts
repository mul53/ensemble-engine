import { Injectable } from '@nestjs/common';
import jsYaml from 'js-yaml';

enum Network {
  Fuse = 'Fuse',
  Ethereum = 'Ethereum',
}

interface Step {
  name: string;
  contractName: string;
  contractAddress: string;
  contractMethod: string;
  contractArgs: Array<string>;
  network: Network;
}

export interface Workflow {
  name: string;
  steps: Array<Step>;
}

@Injectable()
export class WorkflowParser {
  parse(configFile: string): Workflow {
    return jsYaml.load(configFile) as Workflow;
  }
}
