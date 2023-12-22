export class ProductFull  {
    id?: string
    title: string
    description : string
    artist: string
    mediaType: string
    imageUrl: string
    stock: number
    price: number
  
    constructor(product : ProductFull) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
      this.artist = product.artist
      this.mediaType = product.mediaType
      this.imageUrl = product.imageUrl
      this.stock = product.stock
      this.price = product.price
    }
  }