import * as nconf from 'nconf';
import * as path from 'path';

import { IEnvVariables } from '@app/models/env-variables.interface';

export class EnvService {
  static inited = false;

  public static init() {
    if (this.inited) {
      return;
    }
    this.inited = true;
    const environment = nconf.get('NODE_ENV') || 'development';
    console.log(environment);
    nconf.argv().env();
    nconf.file(
      environment,
      path.resolve(`dist/env/config.${environment.toLowerCase()}.json`),
    );
    nconf.file('default', path.resolve(`dist/env/config.default.json`));
  }

  public static get(): IEnvVariables {
    this.init();
    return nconf.get();
  }
}
