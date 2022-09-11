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
    _id: ObjectId('631e00f5190d800a90c6fa4d'),
    name: 'Loja 01',
    cnpj: '01.302.654/0001-81',
    email: 'store@gmail.com',
    phones: ['(21)2435-8906', '(21)99099-8990'],
      address: {
        location: "Rio de janeiro",
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
    _id: ObjectId('631e0278ec9f46c1da4d933a'),
    name: 'Daniel Barboza',
    email: 'danielbarboza56@hotmail.com',
    store: ObjectId('631e00f5190d800a90c6fa4d'),
    permissions: ['administrator'],
    hash: '6537db89072e21b7835298f908c713635700729ba487004b16bec537ea974233004458dedbfb7fbbb7f988bdb996c220855342ed7ff13db0300888b770b939bc296ec4dea725f54e826f40aae56f4d8ed10b205521ca37a57aa429103787f6a860b83f489844da29e6792e7eba1aab8ccf5eeb8c71356fa7e730ff0f6ddb47f73cad6374a62dd80f7ef9975da6535d14a57ec4a2e8ccc461a3cab7728cc4c50b71f3c06e9d889663c079722300673840a712a389614a2ea12078fe6432279fc6d5351decadc758331a8f22ca753f66e20400ba9168a31351bc6a35cb27ff37358b3b9b35dbdb23c28bb4f3e3bfdea9feb87145a82cfab4f58995e05c40f56b72524432013047eaeb3841d34c52263754d9655ce6c8e260259c0123ca4710a9bf1314b5f6ee9f9b2ad869524230a86a77f82c2758328f9a3661512283c68ece42072b1b713c2f05658d1b15365a1d8bb74108ddcd694edee555df3542b412164366b8093c32648c047a1d9cedd94d1c6d9ec84c7af6fd82c064bc3de2af498bf34650fdc891f4e6a116f4ad245e85da0505b3518a3c499168948647448937263f5b1c5d1e977f2a0c80c5d9cbef522f2138f7650923127ca8c74286ddba267f7bf8e533d55a3b5a2286ab9ce15eed015ed3115bb426b4db19b3ce592c3118338154ae3ea1354f7a7e21338033e4dd613b875023d8c40cb5679524b160f8ea8947',
    salt: '588758caa04a2620948482a3172380c1'
  }
])

EOF
