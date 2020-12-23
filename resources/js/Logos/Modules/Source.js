const moduleSource = {
    namespaced: true, 
    state: () => ([
      {
        key: 'gus2020',
        data: 'Gustavo, A. (2020). La condición de la maldad. Arkadia: Buenos Aires.'
      },
      {
        key: 'mar2019',
        data: 'Marambio, R. (2019). La tiranía de la democracia. Benchinon: México D.F..'
      }
    ]),
    mutations: {
      put (state, source) {
        state.push({
          key: source.key,
          data: source.data
        })
      }
    }
  };

  export default moduleSource;