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

const mockCategory = {
  name: 'Cameras',
  code: '51421148302633523',
  photo: ''
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

const mockPayment = {
  status: 'paga'
}

const mockRating = {
  name: 'Daniel Barboza',
  text: 'Gostei muito do produto',
  score: 5,
  clientid: '6320f577156b47ff1082586e',
  productid: '63432f02a7f855351c99dc71'
}

const mockDelivery = {
  status: 'started',
  trackingCode: 'DF34434FDSFSGSD'
}

const mockDeliveryShipping = {
  cart: [
    {
      product: '63432f02a7f855351c99dc71',
      price: 1199.99,
      quantity: '1',
      title: 'produto01'
    },
    {
      product: '63432f02a7f855351c99dc72',
      price: 429.99,
      quantity: '3',
      title: 'produto02'
    }
  ],
  zipCode: '21987-200'
}

const mockSolicitationSuccess = {
  cart: [
    {
      title: 'Placa de Vídeo RTX 3060',
      product: '63432f02a7f855351c99dc71',
      price: 1199.99,
      quantity: 1
    },
    {
      title: 'Intel Core i5-10400F',
      product: '63432f02a7f855351c99dc72',
      price: 429.99,
      quantity: 3
    }
  ],
  zipCode: '21987-200',
  shipping: 79.33,
  payment: {
    price: 2569.29,
    type: 'BOLETO',
    installments: 1,
    addressDeliveryIgualCharging: false,
    address: {
      street: 'Av. Manuel Gomes',
      number: '1223',
      complement: 'casa',
      district: 'Rio de janeiro',
      city: 'Rio de janeiro',
      state: 'RJ',
      zipCode: '21987-200'
    },
    card: {
      fullName: 'DANIEL BARBOZA DA SILVA',
      areaCode: '21',
      phone: '(21)2434-1207',
      birthDate: '2000-02-09',
      creditCardToken: '0ec7d144527b410da270e13e15666294',
      cpf: '82429888467'
    }
  },
  deliveries: {
    price: 79.33,
    type: '4014',
    deliveryTime: 2,
    address: {
      street: 'Av. Manuel Gomes',
      number: '1223',
      complement: 'casa',
      district: 'Rio de janeiro',
      city: 'Rio de janeiro',
      state: 'RJ',
      zipCode: '21987200'
    }
  }
}

const mockSolicitationError = {
  cart: [
    {
      product: '13432f02a7f855351c99dc09',
      price: 2299.99,
      quantity: '1',
      title: 'produto01'
    },
    {
      product: '13432f02a7f855351c99dc90',
      price: 129.99,
      quantity: '3',
      title: 'produto02'
    }
  ],
  card: {
    fullName: 'DANIEL BARBOZA DA SILVA',
    areaCode: '21',
    phone: '(21)2434-1207',
    birthDate: '2000-02-09',
    creditCardToken: '0ec7d144527b410da270e13e15666294',
    cpf: '82429888467'
  },
  zipCode: '21987-200',
  price: 79.33,
  code: '4014',
  payment: {
    price: 2569.29,
    installments: 3
  }
}

module.exports = {
  mockProduct,
  mockCategory,
  clientMock,
  clientMockInsert,
  clientMockUpdate,
  mockPayment,
  mockRating,
  mockDelivery,
  mockDeliveryShipping,
  mockSolicitationSuccess,
  mockSolicitationError
}
