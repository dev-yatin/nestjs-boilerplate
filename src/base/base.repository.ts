import { v4 as uuidv4 } from 'uuid';

export class BaseRepository {
  constructor(private entity: any[]) {}

  /**
   *
   * @param validateKey Column which is looked up in entity
   * @param validateValue Column value for which validateKey column is looked up in entity
   * @returns
   */
  private findOneInEntity(validateKey, validateValue) {
    for (const row of this.entity) {
      if (row[validateKey] === validateValue) {
        return row;
      }
    }
    return null;
  }

  /**
   * Find one query
   * @param entityFilterQuery Expected to be {[key:string]:string} format where key is query column
   * @returns First entry that matches key inside entity
   */
  async findOne(entityFilterQuery: object): Promise<object> {
    const validateKey = Object.keys(entityFilterQuery)[0];
    const validateValue = Object.values(entityFilterQuery)[0];

    const foundRow = this.findOneInEntity(validateKey, validateValue);

    if (foundRow) {
      return { ...foundRow };
    }

    return null;
  }

  /**
   * Create query
   * @param entityData Row data to be inserted in entity
   * @returns Created row
   */
  async create(entityData: any): Promise<any> {
    const _id = uuidv4();
    const currentDate = new Date().toISOString();
    const commonEntityData = {
      createdBy: entityData?.createdBy || '',
      updatedBy: entityData?.updatedBy || '',
      updatedAt: '',
      createdAt: currentDate,
    };
    const responseEntity = {
      _id,
      ...(entityData as object),
      ...commonEntityData,
    };
    this.entity.push(responseEntity);
    return responseEntity;
  }
}
