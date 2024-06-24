/**
 * Defines the User entity.
 * 
 * @interface
 * 
 * @property {number} [id] - The unique identifier of the user.
 * @property {string} email - The email of the user.
 * @property {string} [password] - The hashed password of the user. This should be hidden.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} [role] - The role of the user.
 * @property {string} [phone] - The phone number of the user.
 * @property {string} [address] - The address of the user.
 * @property {Date} [registrationDate] - The date when the user registered.
 * @property {number} [wallet] - The wallet balance of the user.
 */
interface User {
  id?: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: string;
  phone?: string;
  address?: string;
  registrationDate?: Date;
  wallet?: number;
}

interface UserSummary {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface UserOption {
  label: string;
  value: User;
}

/**
 * Defines the credentials that are unsafe to store or transmit.
 * 
 * @interface
 * 
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
interface UnsafeCredentials {
  email: string;
  password: string;
}

/**
 * Defines the credentials that are safe to store or transmit.
 * 
 * @interface
 * 
 * @property {string} token - The authentication token of the user.
 * @property {User} user - The user object.
 */
interface Credentials {
  token:string;
  user:User;
}