import { OpenRouter } from '@openrouter/sdk';
import { readConfigFile } from '../config/configMain.js';
import {Messages} from './MessageInterface.js';
import fs from 'node:fs';

export async function chat(messages: Messages[]): Promise<string>{
  const config = await readConfigFile();
  const ApiKey: string = config.apiKey;
  const modelName: string = config.model;

  const openRouter = new OpenRouter({apiKey: ApiKey});

  const completion = await openRouter.chat.send({
    model:modelName,
    messages: messages,
    stream: false,
  });
  return completion.choices[0].message.content?.toString() ?? '';
}

