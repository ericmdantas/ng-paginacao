"use strict";

;(function(angular)
{
    angular
        .module('alt.ng-paginacao', [])
        .constant('ALT_CLASSE_PAGINAS', '.alt-paginacao-numero-pagina')
        .provider('AltPaginacao', function() {
            this.$get = ['$http', '$q', function($http, $q) {

                var PAGINA_DEFAULT = 1;
                var MAX_PAGINAS_EXIBIDAS_DEFAULT = 10;
                var MAX_ITENS_POR_PAGINA_DEFAULT = 10;

                var AltPaginacao = function(opt) {
                    this.url = undefined;
                    this.pagina = PAGINA_DEFAULT;
                    this.ordenacao = undefined;
                    this.maximoPaginasExibidas = MAX_PAGINAS_EXIBIDAS_DEFAULT;
                    this.itensPorPagina = MAX_ITENS_POR_PAGINA_DEFAULT;

                    angular.extend(this, opt);
                };

                AltPaginacao.prototype.buscar = function(opts) {
                    angular.extend(this, opts);

                    var _pagina = '?pagina=' + (this.pagina || PAGINA_DEFAULT);
                    var _ordenacao = this.ordenacao ? '&ordenacao=' + this.ordenacao : '';

                    return $http
                            .get(this.url + _pagina + _ordenacao)
                            .then(function(info) {
                               return info.data;
                            })
                            .catch(function(erro) {
                                return $q.reject(erro);
                            });
                };

                return AltPaginacao;
            }];
        })
        .directive('altAtiva', [function() {
            return function(scope, element, attrs) {
              element.on('click', function() {
                  element.parent().children().removeClass('ativa');
                  element.addClass('ativa');
              })
            };
        }])
        .directive('altPaginacao', ['ALT_CLASSE_PAGINAS', function(ALT_CLASSE_PAGINAS) {
            var _template = '<div>\
                                <div ng-if="numeroPaginas.length">\
                                    <span ng-if="maisDeUmaPagina"><<</span>\
                                    <span ng-repeat="nPagina in numeroPaginas" class=' + ALT_CLASSE_PAGINAS + ' ng-bind="nPagina" alt-ativa></span>\
                                    <span ng-if="maisDeUmaPagina">>></span>\
                                </div>\
                            </div>';

            var _link = function(scope, element, attrs) {
                element.on('click', function(ev) {
                    var _obj = {obj: {pagina: ev.target.innerText, ordenacao: scope.ordem.ordenacao}};
                    scope.atualizaPaginacao(_obj);
                });

                scope.opcoes = {};

                attrs.$observe('opcoes', function(obj) {
                    scope.numeroPaginas = [];

                    var _obj = angular.fromJson(obj);

                    var _numeroPaginas = Math.ceil(_obj.totalElementos / _obj.itensPorPagina);
                    scope.maisDeUmaPagina = _numeroPaginas > 1;

                    for (var i = 1; i <= _numeroPaginas; i ++) {
                        scope.numeroPaginas.push(i);
                    }
                });
            };

            var _scope = {atualizaPaginacao: '&', opcoes: '@', ordem: '='};

            var _restrict = 'AE';

            return {
                restrict: _restrict,
                template: _template,
                scope: _scope,
                link: _link
            };
        }])
        .directive('altOrdenacao', [function() {
            var _restrict = 'A';

            var _link = function(scope, element, attrs) {

                var _buscaPor = undefined;

                element.on('click', function() {
                    _buscaPor = _buscaPor === scope.asc ? scope.desc : scope.asc;

                    scope.atualizaOrdenacao({obj: {pagina: scope.paginacao.pagina, ordenacao: _buscaPor}});
                });
            };

            var _scope = {asc: '@', desc: '@', atualizaOrdenacao: '&', paginacao: '='};

            return {
                restrict: _restrict,
                link: _link,
                scope: _scope
            };
        }]);
}(window.angular));