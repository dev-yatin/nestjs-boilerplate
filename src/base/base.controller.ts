import { BaseService } from './base.service';

export class BaseController {
  constructor(private readonly baseService: BaseService) {}
}
