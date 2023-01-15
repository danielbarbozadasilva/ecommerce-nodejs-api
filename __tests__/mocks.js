const { ObjectId } = require('mongodb')

export const mockProduct = {
  title: 'Placa de Vídeo RTX 4090',
  availability: true,
  description: 'GeForce RTX 4090 24GB GDDR6X, DLSS, Ray Tracing',
  photos: [],
  price: 2399.99,
  promotion: 1199.99,
  sku: 'PVNV4090RTX',
  quantity: 50,
  blockedQuantity: 0,
  dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId('6320f577156b47ff1082586e')
}
