"use strict";

;(function(angular)
{
    angular
        .module('alt.ng-paginacao', [])
        .provider('AltPaginacao', function() {
            this.$get = ['$http', '$q', function($http, $q) {
                var FernandaPaginacao = function(pag) {
                    this.url = undefined;
                    this.pagina = 1;
                    this.maximoPaginasExibidas = 10;
                    this.itensPorPagina = 10;
                    this.dados = [];

                    angular.extend(this, pag);
                };

                FernandaPaginacao.prototype.buscar = function(opts) {
                    var _onSuccess = function(informacoes) {
                        return informacoes.data;
                    };

                    var _onError = function(erro) {
                        return $q.reject(erro);
                    };

                    var _pagina = '?pagina=' + opts.pagina || this.pagina;
                    var _ordenacao = opts.ordenacao ? '?ordenacao=' + opts.ordenacao : '';
                    var _filtro = opts.filtro ? '?filtro=' + opts.filtro : '';

                    return $http
                            .get(this.url + _pagina + _ordenacao + _filtro)
                            .then(_onSuccess)
                            .catch(_onError);
                };

                return FernandaPaginacao;
            }];
        })
        .directive('altPaginacao', [function() {
            var _template = '<div>\
                                <span ng-repeat="nPagina in numeroPaginas" ng-bind="nPagina"></span>\
                            </div>';

            var _link = function(scope, element, attrs) {
                element.on('click', function(ev) {
                    scope.atualizaPaginacao({pagina: ev.target.innerText});
                });

                scope.opcoes = {};

                attrs.$observe('opcoes', function(obj) {
                    scope.numeroPaginas = [];

                    var _obj = angular.fromJson(obj);

                    var _numeroPaginas = Math.ceil(_obj.totalElementos / _obj.itensPorPagina);

                    for (var i = 1; i <= _numeroPaginas; i ++) {
                        scope.numeroPaginas.push(i);
                    }
                });
            };

            var _scope = {atualizaPaginacao: '&', opcoes: '@'};

            var _restrict = 'AE';

            return {
                restrict: _restrict,
                template: _template,
                scope: _scope,
                link: _link
            };
        }]);
}(window.angular));