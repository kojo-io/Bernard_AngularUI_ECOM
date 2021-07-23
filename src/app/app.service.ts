import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient, private baseService: BaseService) { }

  getAll(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Employee`);
  }

  getAllPositions(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Employee/GetAllPosition`);
  }

  getNextIDs(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Employee/GetNextID`);
  }

  add(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Employee`, info);
  }

  edit(info, id): any {
    return this.httpClient.put(`${this.baseService.getBaseUrl()}Employee/${id}`, info);
  }

  getOne(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Employee/${info}`);
  }

  delete(info): any {
    return this.httpClient.delete(`${this.baseService.getBaseUrl()}Employee/${info}`);
  }
}
