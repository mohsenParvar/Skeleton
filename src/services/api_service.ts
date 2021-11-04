import {
  RequestTypes,
  RequestParameters,
  LocalStorageKeys,
  BaseUrl,
} from './constants';
import { queryStringer } from 'utils/formatters';

import { MessageService, MessageNames } from './message_service';

export class ApiService {
  private static instance: ApiService;
  private constructor() { }
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public baseUrl = BaseUrl;
  public token: string = '';
  public async fetchData(params: RequestParameters) {

    const url = params.isRawUrl ? params.url : this.baseUrl + params.url;
    this.token = localStorage[LocalStorageKeys.ACCESS_TOKEN]
      ? localStorage[LocalStorageKeys.ACCESS_TOKEN]
      : '';
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `🚀 %c${params.requestType} %crequest to: %c${this.baseUrl}${params.url}\n✉%c:`,
        'color:green;',
        'color:black;',
        'color:green;',
        'color:black;',
        params.data,
      );
    }
    switch (params.requestType) {
      case RequestTypes.GET:
        let query = '';
        if (params.data !== {}) {
          query = queryStringer(params.data);
        }
        const rawRes = await fetch(url + query, {
          method: 'GET',
          headers: this.setHeaders(),
        });
        return await this.handleRawResponse(rawRes, params);
      default:
        const rawResponse = await fetch(url, {
          method: params.requestType,
          headers: this.setHeaders(),
          body: JSON.stringify(params.data),
        });
        return await this.handleRawResponse(rawResponse, params);
    }
  }
  handleRawResponse(rawResponse: Response, params: RequestParameters) {
    // let c = rawResponse
    //   .clone()
    //   .json()
    //   .then(response => {
    //     this.extractMessages(response);
    //   });
    if (!rawResponse.ok) {
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      console.log(rawResponse.status);
      if (rawResponse.status === 422) {
        return rawResponse.json();
      }
      if (rawResponse.status === 401) {
        //toast.error('Authentication Failed');
        MessageService.send({ name: MessageNames.SETLOADING, payload: false });
        MessageService.send({ name: MessageNames.AUTH_ERROR_EVENT });
      } else if (rawResponse.status === 500) {
        // toast.error('connection failed');
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      if (rawResponse.ok) {
        rawResponse
          .clone()
          .json()
          .then(response => {
            console.log(
              `✅ %csuccess %c${params.requestType} %crequest to: %c${this.baseUrl}${params.url}\n✉%c:`,
              'color:green;font-size:15px;',
              'color:blue;',
              'color:black;',
              'color:green;',
              'color:black;',
              params.data,
              '\n',
              ' response 👇',
              response,
            );
          });
      } else {
        console.log(
          `⛔ %cError %c${params.requestType} %crequest to: %c${this.baseUrl}${params.url}\n✉%c:`,
          'color:red;font-size:15px;',
          'color:green;',
          'color:black;',
          'color:green;',
          'color:black;',
          params.data,
        );
        return new Error(`❌ Error calling ${this.baseUrl}${params.url}`);
      }
    }
    return rawResponse.json();
  }
  // async extractMessages(response) {
  //   if (response.message) {
  //     // if (response.message[i].type == 0 || response.message[i].type == 1) {
  //     //   toast.success(response.message[i].text);
  //     // } else if (response.message[i].type == 2) {
  //     //   toast.warn(response.message[i].text);
  //     // } else {
  //     //   this.Alert(response.message, 'error');
  //     // }
  //   }
  // }
  public setHeaders():
    | Headers
    | string[][]
    | Record<string, string>
    | undefined {
    if (this.token === '') {
      return {
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
  }
}
export const apiService = ApiService.getInstance();
