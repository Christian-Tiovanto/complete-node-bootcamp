class Tes {
  constructor(coba) {
    this.coba = coba;
  }

  nyobak() {
    this.coba = 'ea';
    return this;
  }

  ciba() {
    this.coba = 'coba';
    return this;
  }
}

const coba = new Tes('masa si');
console.log(coba.nyobak().ciba().nyobak().coba);
