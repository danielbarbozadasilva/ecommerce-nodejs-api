const { ObjectId } = require('mongodb')
const faker = require('faker-br')

const mockProduct = {
  title: 'Placa de Vídeo RTX 4090',
  availability: true,
  description: 'GeForce RTX 4090 24GB GDDR6X, DLSS, Ray Tracing',
  photos: [],
  files: [{ filename: '' }],
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

const clientMock = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'daniel',
  cpf: '112.223.434-90',
  phones: ['(21)3454-3456', '(21)99876-7883'],
  address: {
    street: 'Rua abc',
    number: '123',
    complement: 'casa',
    district: 'Rio de janeiro',
    city: 'RIO DE JANEIRO',
    zipCode: '21099-100',
    state: 'RJ'
  },
  birthDate: '02/09/2000'
}

const clientMockInsert = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'daniel',
  cpf: '112.223.434-90',
  phones: ['(21)3454-3456', '(21)99876-7883'],
  address: {
    street: 'Rua abc',
    number: '123',
    complement: 'casa',
    district: 'Rio de janeiro',
    city: 'RIO DE JANEIRO',
    zipCode: '21099-100',
    state: 'RJ'
  },
  birthDate: '02/09/2000'
}

const clientMockUpdate = {
  name: 'Daniel Silva',
  email: 'daniel95barboza@gmail.com',
  password: 'daniel',
  cpf: '112.223.434-90',
  phones: ['(21)3454-3456', '(21)99876-7883'],
  address: {
    street: 'Rua abc',
    number: '123',
    complement: 'casa',
    district: 'Rio de janeiro',
    city: 'RIO DE JANEIRO',
    zipCode: '21099-100',
    state: 'RJ'
  },
  birthDate: '02/09/2000'
}

module.exports = {
  mockProduct,
  clientMock,
  clientMockInsert,
  clientMockUpdate
}
