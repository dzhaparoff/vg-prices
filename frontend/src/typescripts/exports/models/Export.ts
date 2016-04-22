import { Price } from './../../prices/models/Price'

export class Export {
  id: BsonId;
  name: string;
  prices: Price[];
  exported_at: string;
  exported: boolean;
}

class BsonId {
  $oid: string
}
