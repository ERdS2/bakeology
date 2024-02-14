export interface ConfigurationParameters {
  basePath?: string;

}

export class Configuration {
  basePath?: string;

  constructor(configurationParameters: ConfigurationParameters = {}) {

    this.basePath = configurationParameters.basePath;

  }
}
