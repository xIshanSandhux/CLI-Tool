import os from 'os';
import path from 'node:path';

// returns the path in which the config directory will be created
export function configDirPath() {
    return path.join(os.homedir(), '.ai')
}

// returns the path in which the config file will be created
export function configFilePath() {
    return path.join(os.homedir(), '.ai', 'config.json');
}