#!/bin/bash

set -e

mongo <<EOF
use admin
db.createUser(
  {
    user: ${MONGO_USER},
    pwd: ${MONGO_PASS},
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
  
use ${MONGO_DB_NAME}

db.createCollection("stores")
db.stores.insert([
  {
    _id: ObjectId("631e00f5190d800a90c6fa4d"),
    name: "Loja 01",
    cnpj: "01.302.654/0001-81",
    email: "store@gmail.com",
    phones: ["(21)2435-8906", "(21)99099-8990"],
      address: {
        street: "Rio de janeiro",
        number: "2265",
        complement: "casa",
        district: "Rio de janeiro",
        city: "Rio de janeiro",
        zipCode: "25286-782"
    }
  }
])

db.createCollection("users")
db.users.insert([
  {
    _id: ObjectId("631e0278ec9f46c1da4d933a"),
    name: "Daniel Barboza",
    email: "danielbarboza56@hotmail.com",
    permissions: ["administrator"],
    hash: "6537db89072e21b7835298f908c713635700729ba487004b16bec537ea974233004458dedbfb7fbbb7f988bdb996c220855342ed7ff13db0300888b770b939bc296ec4dea725f54e826f40aae56f4d8ed10b205521ca37a57aa429103787f6a860b83f489844da29e6792e7eba1aab8ccf5eeb8c71356fa7e730ff0f6ddb47f73cad6374a62dd80f7ef9975da6535d14a57ec4a2e8ccc461a3cab7728cc4c50b71f3c06e9d889663c079722300673840a712a389614a2ea12078fe6432279fc6d5351decadc758331a8f22ca753f66e20400ba9168a31351bc6a35cb27ff37358b3b9b35dbdb23c28bb4f3e3bfdea9feb87145a82cfab4f58995e05c40f56b72524432013047eaeb3841d34c52263754d9655ce6c8e260259c0123ca4710a9bf1314b5f6ee9f9b2ad869524230a86a77f82c2758328f9a3661512283c68ece42072b1b713c2f05658d1b15365a1d8bb74108ddcd694edee555df3542b412164366b8093c32648c047a1d9cedd94d1c6d9ec84c7af6fd82c064bc3de2af498bf34650fdc891f4e6a116f4ad245e85da0505b3518a3c499168948647448937263f5b1c5d1e977f2a0c80c5d9cbef522f2138f7650923127ca8c74286ddba267f7bf8e533d55a3b5a2286ab9ce15eed015ed3115bb426b4db19b3ce592c3118338154ae3ea1354f7a7e21338033e4dd613b875023d8c40cb5679524b160f8ea8947",
    salt: "588758caa04a2620948482a3172380c1"
  },
  {
    _id: ObjectId("6320f577156b47ff1082586c"),
    name: "Daniel Silva",
    email: "daniel95barboza@gmail.com",
    permissions: ["client"],
    hash: "e0eeaf5184a03f85bc79db79e707ec14b2855ad5d2eea5d695883347e9762ae4cedd1b965f01ed5ab7048f517d5106ce546dc248b0ba6b7090ef8eb7769823f1e32ded7bfabdfe4ce71296633b131bc6629801f65759a674ba35d63a363eadb1c05cf89910f821cf7fb9f19052de0ddd86841c62118d5c9033c405d3434ee154eef823d4ddb23170425fa4c24dda318fb50394ac130759a8c2b61e3691031d78805ce0679d3908c8d16c342b63437f4c9f0fdd1c2b09278aa7de63924d5bfb47e5ee26f6c619697bc081789d3797d4668aae5555a362b8329c0d86473c7962eba00600f161f35c8b69023207a29ea696f9f62611d5e3adcc08c087517a16033e1562936bfc8aa2300fbb6585888912b4c12faca3548c394077d3c573efb882483be6fff49fb7fdfaffb67b03865eb55e9d5189597017602115e2318536eeb0a4396e59eb2a799e9a44251f81b33ae57ce54c1a048822d4360cc92b616a03da661bdabfde566bc186def582a313138902045bb11d15ead9992f80c526c3a18260950365f88acaf15f3104a85234bf5129f70d6d7225eab3229105e0117fe208d0ab96034663329efdbc8228706056b7d71641d3209cb3fec5f631d12f2b79b80735cfcfa409d705317f8ad57fe29365e17c290524ffd4e1ff4b9f80c37a26355bfb800b034d0ea30751691844c6581bb569d61c4a89134714eb97d6322aa9ccc4",
    salt: "2025ca8aff6353bf693ed892199a6c17"
  }
])

db.createCollection("clients")
db.clients.insert([
{
    _id: ObjectId("6320f577156b47ff1082586e"),
    user: ObjectId("6320f577156b47ff1082586c"),
    name: "Daniel Silva",
    birthDate: "2000-09-09",
    cpf: "82429888467",
    phones: [
        "(11)2423-2198",
        "(11)99099-8990"
    ],
    deleted: false,
    address: {
        street: "Av. Professor Dutra",
        number: "2234",
        complement: "casa",
        district: "RIO DE JANEIRO",
        city: "CARMO",
        zipCode: "23098-782",
        state: "RJ"
    }
}
])

db.createCollection("categories")
db.categories.insert([
{
    _id: ObjectId("6320f577156b47ff1082586e"),
    name: "Placas de vídeo",
    code: "43242342342343224",
    availability: true,
    photo: "files-1668078769223.jpg"  
},
{
    _id: ObjectId("63433ba03a63723e66f5f62d"),
    name: "Processadores",
    code: "23135142342333154",
    availability: true,
    photo: "files-1668078769111.jpg"
},
{
    _id: ObjectId("638f004765f1c700b416aa02"),
    name: "Monitores",
    code: "73245148302633104",
    availability: true,
    photo: "files-1670316172965.jpg"
},
{
    _id: ObjectId("638f00c265f1c700b416aa07"),
    name: "Notebooks",
    code: "64135112342336246",
    availability: true,
    photo: "files-1670316265765.jpg"
},
{
    _id: ObjectId("638f00f265f1c700b416aa0c"),
    name: "Smartphones",
    code: "12531642142335131",
    availability: true,
    photo: "files-1670316293269.jpg"
}
])

db.createCollection("products")
db.products.insert([
{
  _id: ObjectId("63432f02a7f855351c99dc71"),
  title: "Placa de Vídeo RTX 3060",
  availability: true,
  description: "GeForce RTX 3060 12GB GDDR6; Núcleos CUDA: 3584; Engine Clock: 1807 MHz (boost)",
  photos:["files-1668078769319.jpg","files-1668079012525.jpg"],  
  price: 2399.99,
  promotion: 1199.99,
  sku: "PVNV3060RTX",
  quantity: 50,
  blockedQuantity: 0,
  dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId("6320f577156b47ff1082586e"),
  likes: [
    ObjectId("6320f577156b47ff1082586e")
  ],
  rating: []
},
{
  _id: ObjectId("63432f02a7f855351c99dc72"),
  title: "Intel Core i5-10400F",
  availability: true,
  description: "Processador Intel Core i5-10400F (Comete Lake), Hexa-Core (12 Threads)",
  photos:["files-1668078750488.jpg"],
  price: 849.99,
  promotion: 429.99,
  sku: "PCINTI510400F",
  quantity: 150,
  blockedQuantity: 0,
  dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId("63433ba03a63723e66f5f62d"),
  likes: [
    ObjectId("6320f577156b47ff1082586e")
  ],
  rating: []
},
{
  _id: ObjectId("639702b94bf6b326dbc5ae87"),
  title: "Monitor LG UltraWide 29",
  availability: true,
  description: "FHD FreeSync, HDR10, HDMI, 29WL500-B 75Hz 5ms",
  photos: ["files-1670841394582.jpg"],
  price: 2199,
  promotion: 1149,
  sku: "29WL500",
  quantity: 40,
  blockedQuantity: 0,
  dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId("638f004765f1c700b416aa02"),
  rating: []
},
{
  _id: ObjectId("639704f94bf6b326dbc5ae96"),
  title: "Smart Monitor Samsung 24",
  availability: true,
  description: "FHD Série M5 Tizen, HDMI, HDR, LS24AM506NLMZD 60Hz 14ms",
  photos: ["files-1670841622799.jpg"],
  price: 1699,
  promotion: 1340.54,
  sku: "LS24AM506",
  quantity: 40,
  blockedQuantity: 0,
  dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },  
  weight: 1,
  freeShipping: false,
  category: ObjectId("638f004765f1c700b416aa02"),
  rating: []
},
{
  _id: ObjectId("639707034bf6b326dbc5ae9e"),
  title: "Notebook Samsung Book 15.6",
  availability: true,
  description: "Intel Celeron 6305 4GB RAM 500GB NP550XDA-KP2BR",
  photos: ["files-1670842145993.jpg"],
  price: 3149,
  promotion: 2159.1,
  sku: "NP550XDA",
  quantity: 20,
  blockedQuantity: 0,
  dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId("638f00c265f1c700b416aa07"),
  rating: []
},
{
  _id: ObjectId("6397089f4bf6b326dbc5aea6"),
  title: "Smartphone Samsung Galaxy S22",
  availability: true,
  description: "5G 256 GB 6.6 Verde e Snapdragon",
  photos: ["files-1670842566230.jpg"],
  price: 7499.9,
  promotion: 4999,
  sku: "SMS906",
  quantity: 30,
  blockedQuantity: 0,
   dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId("638f00f265f1c700b416aa0c"),
  rating: []
},
{
  _id: ObjectId("63970c5915c445c9c84a9bee"),
  title: "Smartphone Samsung Galaxy XCover Pro",
  availability: true,
  description: "4G 64GB 6.3 Preto 2 Câmeras Traseiras",
  photos: ["files-1670843509386.jpg"],
  price: 1999,
  promotion: 1619.1,
  sku: "SMXCPR",
  quantity: 20,
  blockedQuantity: 0,
   dimensions: {
    height: 8,
    width: 10,
    depth: 27
  },
  weight: 1,
  freeShipping: false,
  category: ObjectId("638f00f265f1c700b416aa0c"),
  rating: []
}
])

db.createCollection("payments")
db.payments.insert([
{
    _id: ObjectId("63c59bb0107f4ce9de7fd638"),
    price: 2569.29,
    type: "BOLETO",
    installments: 3,
    status: "Aguardando pagamento",
    address: {
        street: "Av. Manuel Gomes",
        number: "1223",
        complement: "casa",
        district: "Rio de janeiro",
        city: "Rio de janeiro",
        state: "RJ",
        zipCode: "21987-200"
    },
    card: {
        fullName: "DANIEL BARBOZA DA SILVA",
        areaCode: "21",
        phone: "(21)2434-1207",
        birthDate: "2000-02-09",
        creditCardToken: "0ec7d144527b410da270e13e15666294",
        cpf: "82429888467"
    },
    addressDeliveryIgualCharging: false,
    payload: []
}
])

db.createCollection("deliveries")
db.deliveries.insert([
{
    _id: ObjectId("63c59bb0107f4ce9de7fd63a"),
    status: "not started",
    type: "4014",
    price: 79.33,
    deliveryTime: 2,
    address: {
        street: "Av. Manuel Gomes",
        number: "1223",
        complement: "casa",
        district: "Rio de janeiro",
        city: "Rio de janeiro",
        state: "RJ",
        zipCode: "21987200"
    }
}
])

db.createCollection("solicitations")
db.solicitations.insert([
  {
    _id: ObjectId("63c59bb0107f4ce9de7fd63d"),
    cart: [{
        product: ObjectId("63432f02a7f855351c99dc71"),
        title: "Placa de Vídeo RTX 3060",
        quantity: 1,
        price: 1199.99
    }, 
    {
        product: ObjectId("63432f02a7f855351c99dc72"),
        title: "Intel Core i5-10400F",
        quantity: 3,
        price: 429.99
    }],
    shipping: 79.33,
    solicitationNumber: "4777720845",
    client: ObjectId("6320f577156b47ff1082586e"),
    payment: ObjectId("63c59bb0107f4ce9de7fd638"),
    deliveries: ObjectId("63c59bb0107f4ce9de7fd63a")
  }
])

db.createCollection("orderregistrations")
db.orderregistrations.insert([
  {
      "solicitation": ObjectId("63c59bb0107f4ce9de7fd63d"),
      "type": "solicitation",
      "situation": "created",
      "date": "2023-01-16T18:47:12.928Z"
  }
])


db.createCollection("ratings")
db.ratings.insert([
  {
    _id: ObjectId("638a22b10ef44976d168711e"),
    name: "João Costa",
    text: "Gostei bastante do produto.",
    score: 5,
    product: ObjectId("63432f02a7f855351c99dc71"),
    client: ObjectId("6320f577156b47ff1082586e")
  },
   {
    _id: ObjectId("638a236a0ef44976d1687126"),
    name: "Marcos Silva",
    text: "Chegou em perfeito estado.",
    score: 4,
    product: ObjectId("63432f02a7f855351c99dc72"),
    client: ObjectId("6320f577156b47ff1082586e")
  }
])

EOF
