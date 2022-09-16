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
    _id: ObjectId("631e0278ec9f46c1da4d933a"),
    name: "Daniel Barboza",
    email: "danielbarboza56@hotmail.com",
    store: ObjectId("631e00f5190d800a90c6fa4d"),
    permissions: ["administrator"],
    hash: "6537db89072e21b7835298f908c713635700729ba487004b16bec537ea974233004458dedbfb7fbbb7f988bdb996c220855342ed7ff13db0300888b770b939bc296ec4dea725f54e826f40aae56f4d8ed10b205521ca37a57aa429103787f6a860b83f489844da29e6792e7eba1aab8ccf5eeb8c71356fa7e730ff0f6ddb47f73cad6374a62dd80f7ef9975da6535d14a57ec4a2e8ccc461a3cab7728cc4c50b71f3c06e9d889663c079722300673840a712a389614a2ea12078fe6432279fc6d5351decadc758331a8f22ca753f66e20400ba9168a31351bc6a35cb27ff37358b3b9b35dbdb23c28bb4f3e3bfdea9feb87145a82cfab4f58995e05c40f56b72524432013047eaeb3841d34c52263754d9655ce6c8e260259c0123ca4710a9bf1314b5f6ee9f9b2ad869524230a86a77f82c2758328f9a3661512283c68ece42072b1b713c2f05658d1b15365a1d8bb74108ddcd694edee555df3542b412164366b8093c32648c047a1d9cedd94d1c6d9ec84c7af6fd82c064bc3de2af498bf34650fdc891f4e6a116f4ad245e85da0505b3518a3c499168948647448937263f5b1c5d1e977f2a0c80c5d9cbef522f2138f7650923127ca8c74286ddba267f7bf8e533d55a3b5a2286ab9ce15eed015ed3115bb426b4db19b3ce592c3118338154ae3ea1354f7a7e21338033e4dd613b875023d8c40cb5679524b160f8ea8947",
    salt: "588758caa04a2620948482a3172380c1"
  },
  {
    _id: ObjectId("6320f577156b47ff1082586c"),
    name: "Daniel Silva",
    email: "daniel95barboza@gmail.com",
    store: ObjectId("631e00f5190d800a90c6fa4d"),
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
    cpf: "111.231.455-81",
    phones: [
        "(11)2423-2198",
        "(11)99099-8990"
    ],
    deleted: false,
    store: ObjectId("631e00f5190d800a90c6fa4d"),
    address: {
        location: "Rio de janeiro",
        number: "2234",
        complement: "casa",
        district: "Rio de janeiro",
        city: "Rio de janeiro",
        zipCode: "23098-782",
        state: "Rio de janeiro"
    }
}

db.createCollection("category")
db.category.insert([
{
    _id: ObjectId("6320f577156b47ff1082586e"),
    name: "Placa de vídeo",
    code: "43242342342343224",
    store: ObjectId("631e00f5190d800a90c6fa4d"),
    availability: true
},
{
    _id: ObjectId("6320f577156b47ff1082586e"),
    name: "Processadores",
    code: "21341342342343551",
    store: ObjectId("631e00f5190d800a90c6fa4d"),
    availability: false
}
])

EOF
