import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import zxcvbn from 'zxcvbn';

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SHOP = 'SHOP',
}

@Entity()
class User implements UserInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Exclude()
  @Column({ nullable:true })
  password?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable:true})
  phone?: string;
  
  @Column({nullable:true})
  address?: string;
  
  @Column({nullable:true})
  registrationDate?: Date;
  
  @Column({ type:'float', scale: 3,
    transformer: { to: (value: number) => {if (value) return value.toFixed(3)}, from: (value: string) => Number(value)}
  })
  wallet: number;
  
  @Column()
  role: UserRole;

  @BeforeInsert()
  beforeInsert(){ // TODO try put this in default (see Transaction.entity)
    this.registrationDate = new Date();
    if (!this.wallet)
      this.wallet = Number(process.env.USER_STARTING_WALLET);
    this.role = UserRole.USER;
  }

  isPasswordStrong(): boolean {
    return zxcvbn(this.password).score > 3;
  }
  async verifyPassword(password : string): Promise<boolean> {
    const pepperPassword = password + process.env.HASH_PEPPER;
    return await bcrypt.compare(pepperPassword, this.password);
  }
  async hashPassword(): Promise<void> {
    this.password = await this.hashPasswordUtils(this.password);
  }
  private async hashPasswordUtils(password: string): Promise<string> {
    const pepperPassword = password + process.env.HASH_PEPPER;
    const rounds = Number(process.env.HASH_ROUND) >= 7 ? Number(process.env.HASH_ROUND) : 7;
    const hashedPassword = await bcrypt.hash(pepperPassword, rounds);

    return hashedPassword;
  }
}

export { User, UserRole }