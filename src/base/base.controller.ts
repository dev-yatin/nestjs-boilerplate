import { BaseService } from './base.service';

export abstract class BaseController<T> {
  constructor(protected readonly baseService: BaseService<T>) {}
}
