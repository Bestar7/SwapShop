/**
 * Represents a SwapShop.
 * 
 * @interface
 * 
 * @property {number} id - The unique identifier of the SwapShop.
 * @property {string} [federation] - The federation that the SwapShop belongs to, if any.
 * @property {string} name - The name of the SwapShop.
 * @property {string} [description] - A brief description of the SwapShop, if any.
 */
interface SwapShop {
    id: number;
    federation?: string,
    name: string;
    description?: string;
}