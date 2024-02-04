const coba = (tes, index) => {
  tes[index] = 'eaaa'
}

const aaaa = () => {
  const tes = []
  coba(tes, 5)
  coba(tes, 1)
  coba(tes, 2)
  console.log(tes)
}

aaaa()