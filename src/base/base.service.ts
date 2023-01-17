import { BaseRepository } from './base.repository';

export abstract class BaseService<T> {
  constructor(protected baseRepository: BaseRepository<T>) {}

  /**
   * Find one query
   * @param entityFilterQuery Expected to be {[key:string]:string} format where key is query column
   * @returns First entry that matches key inside entity
   */
  async findOne(entityFilterQuery: object): Promise<T> {
    return await this.baseRepository.findOne(entityFilterQuery);
  }

  /**
   * Create query
   * @param entityData Row data to be inserted in entity
   * @returns Created row
   */
  async create(entityData: any): Promise<any> {
    return await this.baseRepository.create(entityData);
  }
}
