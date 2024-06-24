interface ArticleInterface { // TODO add swap-shop which stores it
  id?: number;
  storingShopId?: number | null; // TODO add a shop entity

  name: string;
  category?: MaterialInterface | null;
  price: number;
  description: string;
  condition: number;
  weight?: number | null; // TODO make use of it
  dimension?: number | null;// TODO make use // TODO better type
  quantity: number;
  submittedDate?: Date | null; // TODO better type
  images?: ImageInterface[] | null;
  tags?: TagInterface[] | null;
}