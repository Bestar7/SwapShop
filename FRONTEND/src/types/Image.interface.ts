interface Image {
  id?: number;
  filename: string;
  mimetype: string;
  path: string;
}

interface ImageServerResponse extends Image {
  destination: string;
  encoding: string;
  fieldname: string;
  originalname: string;
  size: number;
}