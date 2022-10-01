/* eslint-disable prettier/prettier */
import {
  Repository,
  EntityRepository,
  getRepository,
  EntityManager,
  getConnection,
} from 'typeorm';
import { Customer } from './customer.entity';

@EntityRepository(Customer)
export class TransactionDemoRepository extends Repository<Customer>{

}