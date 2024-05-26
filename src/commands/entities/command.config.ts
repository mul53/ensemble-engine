// src/commands/config/commands.config.ts

export interface CommandConfig {
  name: string;
  description: string;
  template?: Object;
}

export const COMMANDS: CommandConfig[] = [
  {
    name: 'loadtest',
    description: 'Run a network load test',
  },
  {
    name: 'gas-manipulation',
    description: 'Keeps the gas price in the specified range',
    template: ['gas_price()','$max_gas_price'],
  },
  {
    name: 'balance-maintain',
    description: 'Maintain account balances in a certain range',
  },
  {
    name: 'token-activity',
    description: 'Generate token activity',
  },
  {
    name: 'game-activity',
    description: 'Generate game activity',
    template: [[{'volume_of()':['$contract_address', '$token_address']},'$min_volume'],
      [{'number_of_players()': '$contract_address'}, '$min_players']],
  },
];
