import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ContractEntity } from 'src/workflows/entities/Contract.entity';
import { Step } from 'src/workflows/entities/step.entity';
import { Workflow } from 'src/workflows/entities/workflow.entity';
import { WorkflowsService } from 'src/workflows/workflows.service';
import { BlockchainProviderService } from 'src/utils/blockchain-provider/blockchain-provider.service';
import { promises as fs } from 'fs';
import { WalletService } from 'src/wallet/wallet.service';
import { BaseWallet, Contract, parseEther, SigningKey } from 'ethers';

/**
 * Generates a random number between 5 and 20.
 * @returns {number} A random number between 5 and 20.
 */
function generateRandom(): number {
  return Math.floor(Math.random() * (20 - 5 + 1)) + 5;
}

@Injectable()
export class WorkflowEngineService {

  constructor(
    private readonly workflowsService: WorkflowsService,
    private readonly blockchainProviderService: BlockchainProviderService,
    private walletService: WalletService,
  ) {}

  @Interval(5000)
  async loop() {
    console.log('EngineService V2 loop, fetching active commands:');
    const workflows = await this.workflowsService.findAll();
    console.log(workflows)
    if (workflows.length === 0) {
      console.log('No active workflows found');
    }
    for (const workflow of workflows) {

      await this.processWorkflow(workflow);
    }
    // if (commands.length === 0) { 
    //   console.log('No active commands found');_
    // }
    // for (const command of commands) {
    //   const executor = this.commandExecutorFactory.createExecutor(command.name);
    //   await executor.execute(command);
    // }
  }
  processWorkflow(workflow: Workflow) {
    console.log(`Processing ${workflow.name} workflow`);
    const stepIndex = 0;
    const step = workflow.steps[stepIndex];
    this.processStep(step, workflow);
    // throw new Error('Metho not implemented.');
  }

  
 generateRandomAmount(): bigint {
    return parseEther(generateRandom().toString())
  }

  async callContractMethod(contract, methodName, ...args) {
    if (!contract[methodName]) {
      throw new Error(`Method ${methodName} does not exist on the contract`);
    }
    console.log(`calling method ${methodName} with args ${JSON.stringify(args)}`);
    const result = await contract[methodName](this.generateRandomAmount());
    return result;
  }

  async processStep(step: Step, workflow: Workflow) {
    console.log(`Processing step ${step.name} for workflow with ID: ${workflow.name}`);
    const contract = await this.loadContract(step, workflow);
    // console.log(contract)

    const methodName = step.method;
    const methodArgs = step.arguments;
    console.log(`calling method ${methodName} with args ${JSON.stringify(methodArgs)}`);
    
    const result = await this.callContractMethod(contract, methodName, ...methodArgs);
  }

  async loadContract(step: Step, workflow: Workflow) {
    console.log(`loading contract ${step.contract} for workflow ${workflow.name}`);
    const contractEntity = this.getConract(step.contract, workflow);
    const abiFileContent = await fs.readFile(contractEntity.abi, 'utf-8');

    const provider = this.blockchainProviderService.getProvider(contractEntity.network);

    const wallet = await this.walletService.loadWallet(step, workflow);
    const signingProvider = new BaseWallet(new SigningKey(wallet.privateKey), provider);
    const contract = new Contract(contractEntity.address, abiFileContent, signingProvider);
    return contract
  }


  getConract(contractName: string, workflow: Workflow) : ContractEntity {
    console.log(`loading contract ${contractName} for workflow ${workflow.name}`);
    const { contracts } = workflow
    return contracts.find(contract => contract.name === contractName);
  }

}
