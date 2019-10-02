import * as nconf from 'nconf';
import * as path from 'path';

import { IEnvVariables } from '@app/interfaces/env-variables.interface';

export class EnvService {
  static inited = false;

  public static init() {
    if (this.inited) {
      return;
    }
    this.inited = true;
    nconf.argv().env();
    nconf.file(
      EnvService.environment(),
      path.resolve(
        `dist/env/config.${EnvService.environment().toLowerCase()}.json`,
      ),
    );
    nconf.file('default', path.resolve(`dist/env/config.default.json`));
  }

  public static get(): IEnvVariables {
    this.init();
    return nconf.get();
  }

  public static environment(): string {
    return nconf.get('NODE_ENV') || 'development';
  }
}
