const moduleAcademicSources = {
    namespaced: true, 
    state: () => ({
      repository:[
        {
          key: 'gus2020',
          data: 'Gustavo, A. (2020). La condición de la maldad. Arkadia: Buenos Aires.'
        },
        {
          key: 'mar2019',
          data: 'Marambio, R. (2019). La tiranía de la democracia. Benchinon: México D.F..'
        }
      ],
      document: new Map()
    }),
    mutations: {
      save (state, source) {
        state.repository.push({
          key: source.key,
          data: source.data
        })
      },
      put (state, source) {
        state.document.set(source.key, source);
      }
    },
    actions: {
      put (context, payload) {
        context.commit('put', context.state.repository.find(source => source.key == payload.key));
        payload.controller.put(payload.key)
      }
    }
  };

  export default moduleAcademicSources;