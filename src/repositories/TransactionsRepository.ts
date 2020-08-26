import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const filterOutCome = this.transactions.filter(
      transiton => transiton.type === 'outcome',
    );
    const filterInCome = this.transactions.filter(
      transiton => transiton.type === 'income',
    );

    const numbersOutCome = filterOutCome.map(out => out.value);

    const numbersInCome = filterInCome.map(income => income.value);

    const numberTotalOutCome = numbersOutCome.reduce((a, b) => a + b, 0);

    const numberTotalInCome = numbersInCome.reduce((a, b) => a + b, 0);

    const balance: Balance = {
      income: numberTotalInCome,
      outcome: numberTotalOutCome,
      total: numberTotalInCome - numberTotalOutCome,
    };

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    // TODO
    const transactions = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transactions);
    return transactions;
  }
}

export { TransactionsRepository, Balance };
