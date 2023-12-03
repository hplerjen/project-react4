export class ProductFull  {
    id?: string
    title: string
    description : string
    artist: string
    mediaType: string
    onStock: number
    imageUrl: string
  
    constructor(product : ProductFull) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
      this.artist = product.artist
      this.mediaType = product.mediaType
      this.onStock = product.onStock
      this.imageUrl = product.imageUrl
    }
  }