import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
import { MyQuery, MyDataSourceOptions } from './types';
import { getBackendSrv, toDataQueryResponse } from '@grafana/runtime';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  url?: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    instanceSettings.meta.alerting = true;
    this.url = instanceSettings.url;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const req = {
      ...options,
      data: { ...options },
      url: `${this.url}/query`,
      method: 'POST',
    };

    return getBackendSrv()
      .datasourceRequest(req)
      .then((rsp: any) => {
        return toDataQueryResponse(rsp);
      });
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
