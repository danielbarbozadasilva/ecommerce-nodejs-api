module.exports= {
    secret: process.env.NODE_ENV === "production"? process.env.SECRET : "DSFSFDF343CDFSDFSDFDF34RT34GF43GFVFREFDF",
    api: process.env.NODE_ENV === "production"? "https://api.linkproducao.com" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production"? "https://linkproducao.com" : "http://localhost:8000"
}