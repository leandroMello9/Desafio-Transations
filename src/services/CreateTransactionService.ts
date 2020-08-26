import {
  TransactionsRepository,
  Balance,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(
    transactionsRepository: TransactionsRepository,
    private balance: Balance,
  ) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    // TODO
    if (type === 'outcome' && this.balance.total < value) {
      throw Error(
        'transfer is not possible, as the result value is greater than the total value',
      );
    }
    const transition = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transition;
  }
}

export default CreateTransactionService;
