/**
 * @interface UserInterface
 * @prop {string} email
 * TODO write full jsdoc
 */
interface UserInterface {
  id?: number;
  email: string;
  password?: string; // TODO password must be hidden
  firstName: string;
  lastName: string;
  phone?: string | null;
  address?: string | null;
  registrationDate?: Date; // TODO is it really useful ?
  wallet?: number; // the amount of token available by the user
  role?: any; // contains owner/admin/user/mod/... // TODO improve this if needed
}

interface UserSummaryInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface UserJwtPayload { // TODO check what is needed in the token
  id: number,
}