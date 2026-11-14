import { abas, categorias, dataMinima, horarios, imagemEspaco, massagens, perguntas } from '../compartilhado/dados.js'

export function registrarControladores(app) {
  app.controller('PaginaController', ['$scope', function ($scope) {
    $scope.perguntas = perguntas
    $scope.abas = abas
    $scope.imagemEspaco = imagemEspaco
    $scope.aviso = { mensagem: null }

    $scope.mostrarAviso = (tipo, texto) => {
      $scope.aviso.mensagem = { tipo, texto }
    }

    $scope.fecharAviso = () => {
      $scope.aviso.mensagem = null
    }
  }])

  app.controller('CatalogoController', ['$scope', 'catalogoMassagens', 'reservaLocal',
    function ($scope, catalogoMassagens, reservaLocal) {
      $scope.categorias = categorias
      $scope.catalogo = { categoria: categorias[0], pagina: 1 }

      function atualizarCatalogo() {
        const { categoria, pagina } = $scope.catalogo
        Object.assign($scope.catalogo, catalogoMassagens.listar(categoria, pagina))
      }

      $scope.escolherCategoria = (categoria) => {
        $scope.catalogo.categoria = categoria
        $scope.catalogo.pagina = 1
        atualizarCatalogo()
      }

      $scope.escolherPagina = (pagina) => {
        $scope.catalogo.pagina = pagina
        atualizarCatalogo()
      }

      $scope.selecionarMassagem = (id) => {
        reservaLocal.selecionarMassagem(id)
        $scope.mostrarAviso('info', 'Massagem selecionada. Complete os dados da reserva.')
      }

      atualizarCatalogo()
    },
  ])

  app.controller('ReservaController', ['$scope', '$element', 'reservaLocal',
    function ($scope, $element, reservaLocal) {
      $scope.reserva = reservaLocal
      $scope.massagens = massagens
      $scope.horarios = horarios
      $scope.hoje = dataMinima()

      $scope.simularReserva = (formulario) => {
        if (formulario.$invalid) {
          $scope.mostrarAviso('erro', 'Confira os campos destacados para simular a reserva.')
          $element[0].querySelector('input.ng-invalid, select.ng-invalid')?.focus()
          return
        }

        reservaLocal.limpar()
        formulario.$setPristine()
        formulario.$setUntouched()
        $scope.mostrarAviso('sucesso', 'Reserva simulada com sucesso!')
      }
    },
  ])
}
