import { Router } from 'express';
import { TransactionsRepository } from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO

    const { title, value, type } = request.body;
    const balance = transactionsRepository.getBalance();
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
      balance,
    );

    const transtion = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.status(200).json(transtion);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
