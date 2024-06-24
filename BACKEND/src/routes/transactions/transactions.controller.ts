import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UserRole } from '~/entities/users/User.entity';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { Roles } from '~/decorator/role.decorator';
import { TransactionsDTO } from '~/entities/transaction/Transaction.dto';

@Controller("transactions")
class TransactionsController {

  constructor(
    private readonly transactionsService: TransactionsService,
  ){}

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Post()
  async createTransactions(@Body() transactions: TransactionsDTO): Promise<TransactionInterface[]> {
    if (!transactions.user.id)
      throw new BadRequestException('User is required'); // TODO allowed for anon donation
    if (!transactions.swapShop.id)
      throw new BadRequestException('SwapShop is required');
    if (!transactions.requestedArticles || transactions.requestedArticles.length == 0)
      throw new BadRequestException('Articles required'); // TODO allowed for service kinda

    try {
      return await this.transactionsService.createTransactions(transactions);
    } catch (error) {
      throw error;
    }
  }
}

export {TransactionsController}