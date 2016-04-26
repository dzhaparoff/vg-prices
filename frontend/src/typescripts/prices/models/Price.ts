export class Price {
  id: BsonId;
  name: string;
  sheets: Sheet;
  sku_prefix: string;
  spreadsheet_loaded: boolean;
}

export class BsonId {
  $oid: string
}

export class Sheet {
  _id: BsonId;
  name: string;
  number: number;
  configurated: boolean;
  first_row: number;
  last_row: number;
  first_column: number;
  last_column: number;
  price_config: PriceConfig
}

export class PriceConfig {
  name_column: string;
  sku_column: string;
  price_column: string;
  default_currency: string;
  purchase_markup: number;
  retail_markup: any;
}

export class PurchaseMarkup {
  price: number;
  value: number;
}