interface Article {
  id?: number;
  storingShopId?: number | null; // TODO add a shop entity
  contributorUserId?: number | null;
  name: string;
  category: Material;
  price: number;
  description?: string | null;
  condition: number;
  tags?: {label:string}[];
  weight?: number | null;
  dimension?: number | null;
  quantity: number;
  submittedDate?: Date;
  images?: Image[] | File[] | null;// TODO type File[] needed to send image (type file) to server, fix this in image.service
}