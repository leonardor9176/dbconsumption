import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config = config

  constructor() { }
  
  getConfig(){
    return this.config
  }
}
