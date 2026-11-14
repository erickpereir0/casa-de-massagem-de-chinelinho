export function registrarDiretivas(app) {
  app.directive('acordeao', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: { itens: '<' },
      controllerAs: 'acordeao',
      controller: function () {
        this.aberto = null
        this.alternar = (indice) => {
          this.aberto = this.aberto === indice ? null : indice
        }
      },
      template: `
        <div class="acordeao">
          <article class="acordeao-item" ng-repeat="item in acordeao.itens track by $index"
            ng-class="{ aberto: acordeao.aberto === $index }">
            <h3>
              <button type="button" class="acordeao-botao" id="faq-botao-{{ $index }}"
                aria-controls="faq-painel-{{ $index }}"
                ng-attr-aria-expanded="{{ acordeao.aberto === $index }}"
                ng-click="acordeao.alternar($index)">
                {{ item.titulo }} <span aria-hidden="true">{{ acordeao.aberto === $index ? '−' : '+' }}</span>
              </button>
            </h3>
            <div class="acordeao-painel" id="faq-painel-{{ $index }}" role="region"
              aria-labelledby="faq-botao-{{ $index }}"
              ng-attr-aria-hidden="{{ acordeao.aberto !== $index }}">
              <div><p>{{ item.conteudo }}</p></div>
            </div>
          </article>
        </div>
      `,
    }
  })

  app.directive('paginacao', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: { atual: '<', total: '<', aoSelecionar: '&' },
      controllerAs: 'paginacao',
      controller: function () {
        this.$onChanges = () => {
          this.paginas = Array.from({ length: this.total ?? 0 }, (_, indice) => indice + 1)
        }
        this.selecionar = (pagina) => {
          if (pagina >= 1 && pagina <= this.total && pagina !== this.atual) {
            this.aoSelecionar({ pagina })
          }
        }
      },
      template: `
        <nav class="paginacao" aria-label="Paginação">
          <button type="button" ng-click="paginacao.selecionar(paginacao.atual - 1)"
            ng-disabled="paginacao.atual <= 1">Anterior</button>
          <button type="button" ng-repeat="pagina in paginacao.paginas track by pagina"
            ng-class="{ ativo: pagina === paginacao.atual }"
            ng-attr-aria-current="{{ pagina === paginacao.atual ? 'page' : undefined }}"
            ng-attr-aria-label="Página {{ pagina }}" ng-click="paginacao.selecionar(pagina)">{{ pagina }}</button>
          <button type="button" ng-click="paginacao.selecionar(paginacao.atual + 1)"
            ng-disabled="paginacao.atual >= paginacao.total">Próxima</button>
        </nav>
      `,
    }
  })

  app.directive('progresso', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: { valor: '<' },
      controllerAs: 'progresso',
      controller: function () {
        this.$onChanges = () => {
          this.percentual = Math.min(100, Math.max(0, Number(this.valor) || 0))
        }
      },
      template: `
        <div class="progresso">
          <p class="progresso-legenda">
            <span>Preenchimento do formulário</span> <strong>{{ progresso.percentual }}%</strong>
          </p>
          <div class="progresso-trilho" role="progressbar" aria-label="Preenchimento do formulário"
            aria-valuemin="0" aria-valuemax="100" ng-attr-aria-valuenow="{{ progresso.percentual }}">
            <div class="progresso-barra" ng-style="{ width: progresso.percentual + '%' }"></div>
          </div>
        </div>
      `,
    }
  })

  app.directive('abas', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: { itens: '<' },
      controllerAs: 'abas',
      controller: ['$element', function ($element) {
        this.atual = 0
        this.selecionar = (indice) => {
          this.atual = indice
        }
        this.navegar = (evento) => {
          const ultima = this.itens.length - 1
          const destinos = {
            ArrowLeft: this.atual === 0 ? ultima : this.atual - 1,
            ArrowRight: this.atual === ultima ? 0 : this.atual + 1,
            Home: 0,
            End: ultima,
          }
          if (!Object.hasOwn(destinos, evento.key)) return

          evento.preventDefault()
          this.selecionar(destinos[evento.key])
          $element[0].querySelector('#sobre-aba-' + this.atual).focus()
        }
      }],
      template: `
        <div class="abas">
          <div class="abas-lista" role="tablist" aria-label="Cuidados para sua visita" ng-keydown="abas.navegar($event)">
            <button type="button" class="abas-botao" role="tab" id="sobre-aba-{{ $index }}"
              ng-repeat="item in abas.itens track by $index"
              aria-controls="sobre-painel-{{ $index }}" ng-class="{ ativo: abas.atual === $index }"
              ng-attr-aria-selected="{{ abas.atual === $index }}"
              ng-attr-tabindex="{{ abas.atual === $index ? 0 : -1 }}" ng-click="abas.selecionar($index)">
              {{ item.titulo }}
            </button>
          </div>
          <div class="abas-painel" role="tabpanel" id="sobre-painel-{{ $index }}"
            ng-repeat="item in abas.itens track by $index" aria-labelledby="sobre-aba-{{ $index }}"
            ng-show="abas.atual === $index" tabindex="0">
            <p>{{ item.conteudo }}</p>
          </div>
        </div>
      `,
    }
  })

  app.directive('dropdownCategoria', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: { itens: '<', atual: '<', aoSelecionar: '&' },
      controllerAs: 'dropdown',
      controller: ['$document', '$element', '$scope', function ($document, $element, $scope) {
        this.aberto = false
        this.alternar = () => {
          this.aberto = !this.aberto
        }
        this.selecionar = (categoria) => {
          this.aoSelecionar({ categoria })
          this.fecharEFocar()
        }
        this.fecharEFocar = () => {
          this.aberto = false
          $element[0].querySelector('.dropdown-botao').focus()
        }
        this.tecla = (evento) => {
          if (evento.key !== 'Escape' || !this.aberto) return

          evento.stopPropagation()
          this.fecharEFocar()
        }

        const fecharFora = (evento) => {
          if (!this.aberto || $element[0].contains(evento.target)) return

          $scope.$evalAsync(() => {
            this.aberto = false
          })
        }

        $document.on('click focusin', fecharFora)
        this.$onDestroy = () => $document.off('click focusin', fecharFora)
      }],
      template: `
        <div class="dropdown" ng-keydown="dropdown.tecla($event)">
          <button type="button" class="dropdown-botao" aria-controls="categorias-menu"
            ng-attr-aria-expanded="{{ dropdown.aberto }}" ng-click="dropdown.alternar()">
            {{ dropdown.atual }} <span aria-hidden="true">⌄</span>
          </button>
          <ul id="categorias-menu" class="dropdown-menu" aria-label="Categorias" ng-show="dropdown.aberto">
            <li ng-repeat="categoria in dropdown.itens track by categoria">
              <button type="button" class="dropdown-opcao" ng-class="{ ativo: categoria === dropdown.atual }"
                ng-attr-aria-pressed="{{ categoria === dropdown.atual }}"
                ng-click="dropdown.selecionar(categoria)">{{ categoria }}</button>
            </li>
          </ul>
        </div>
      `,
    }
  })

  app.directive('toast', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: { mensagem: '<', aoFechar: '&' },
      controllerAs: 'toast',
      controller: ['$timeout', function ($timeout) {
        let temporizador

        this.fechar = () => {
          this.aoFechar()
        }
        this.$onChanges = () => {
          $timeout.cancel(temporizador)
          if (this.mensagem) temporizador = $timeout(this.fechar, 4200)
        }
        this.$onDestroy = () => $timeout.cancel(temporizador)
      }],
      template: `
        <div class="toast-regiao" role="status" aria-live="polite" aria-atomic="true">
          <div class="toast" ng-if="toast.mensagem" ng-class="'toast-' + toast.mensagem.tipo">
            <p>{{ toast.mensagem.texto }}</p>
            <button type="button" aria-label="Fechar notificação" ng-click="toast.fechar()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      `,
    }
  })
}
