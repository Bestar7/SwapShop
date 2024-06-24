interface Material {
  id?: number;
  category: string;
  subcategory: string;
  suggestedPrice: number;
  defaultUnit: string;
}

interface MaterialOption {
  label: string;
  options: {
    label: string;
    value: Material;
  }[];
}