"use strict";

describe('alt.ng-paginacao', function() {
    beforeEach(module('alt.ng-paginacao'));

    describe('constant', function() {
        var ALT_CLASSE_PAGINAS;

        beforeEach(inject(function($injector) {
            ALT_CLASSE_PAGINAS = $injector.get('ALT_CLASSE_PAGINAS');
        }))

        describe('criação', function()
        {
            it('deve ter a constante criada com o valor correto', function() {
                expect(ALT_CLASSE_PAGINAS).toEqual('.alt-paginacao-numero-pagina');
            })
        })
    })

    describe('service: AltPaginacao', function() {
        var _rootScope, _httpBackend, AltPaginacao;

        var _objetoAltPaginacaoCompleto = {
            url: '/api/alguma-coisa',
            pagina: 10,
            maximoPaginasExibidas: 100,
            itensPorPagina: 10,
            dados: [{id: 1, nome: 'a'}, {id: 2, nome: 'b'}, {id: 3, nome: 'c'}]
        }

        beforeEach(inject(function($injector) {
            _rootScope = $injector.get('$rootScope');
            _httpBackend = $injector.get('$httpBackend');
            AltPaginacao = $injector.get('AltPaginacao');
        }));

        describe('criação', function() {
            it('deve ter a factory criada e disponível', function() {
                expect(AltPaginacao).toBeDefined();
            })
        })

        describe('instância', function() {
            it('deve ter os valores default', function() {
                var _pag = new AltPaginacao();

                expect(_pag.url).toBeUndefined();
                expect(_pag.ordenacao).toBeUndefined();
                expect(_pag.pagina).toBe(1);
                expect(_pag.maximoPaginasExibidas).toBe(10);
                expect(_pag.itensPorPagina).toBe(10);
            })

            it('deve ter os valores passados por parâmetro', function() {
                var _pag = new AltPaginacao(_objetoAltPaginacaoCompleto);

                expect(angular.equals(_pag, _objetoAltPaginacaoCompleto)).toBeTruthy();
            })
        })

        describe('buscar', function() {
            describe('instância', function() {
                it('deve buscar as informacoes com a url passada por parâmetro - apenas página', function () {
                    var _url = '/api/info';
                    var _resposta = [{nome: 'a', id: 0}];

                    _httpBackend.expectGET(_url + '?pagina=1').respond(200, _resposta);

                    var _pag = new AltPaginacao({url: _url});

                    _pag
                        .buscar()
                        .then(function (info) {
                            expect(angular.equals(info, _resposta)).toBeTruthy();
                        })
                        .catch(function () {
                            expect(true).toBeFalsy();
                        })

                    _httpBackend.flush();
                })

                it('deve buscar as informacoes com a url passada por parâmetro - apenas página', function () {
                    var _url = '/api/info';
                    var _resposta = [{nome: 'a', id: 0}];

                    _httpBackend.expectGET(_url + '?pagina=1').respond(200, _resposta);

                    var _pag = new AltPaginacao({url: _url, pagina: undefined});

                    _pag
                        .buscar()
                        .then(function (info) {
                            expect(angular.equals(info, _resposta)).toBeTruthy();
                        })
                        .catch(function () {
                            expect(true).toBeFalsy();
                        })

                    _httpBackend.flush();
                })

                it('deve buscar as informacoes com a url passada por parâmetro - página + ordenacao', function () {
                    var _url = '/api/info';
                    var _ordenacao = '-x';
                    var _resposta = [{nome: 'a', id: 0}];

                    _httpBackend.expectGET(_url + '?pagina=1&ordenacao=-x').respond(200, _resposta);

                    var _pag = new AltPaginacao({url: _url, ordenacao: _ordenacao});

                    _pag
                        .buscar()
                        .then(function (info) {
                            expect(angular.equals(info, _resposta)).toBeTruthy();
                        })
                        .catch(function () {
                            expect(true).toBeFalsy();
                        })

                    _httpBackend.flush();
                })
            })

            describe('parâmetro método', function()
            {
                it('deve tentar buscar as informacoes, mas servidor retorna erro - sem pagina passada por parametro', function() {
                    var _url = '/api/info';

                    _httpBackend.expectGET(_url + '?pagina=1').respond(400);

                    var _pag = new AltPaginacao({url: _url});

                    _pag
                        .buscar()
                        .then(function() {
                            expect(true).toBeFalsy();
                        })
                        .catch(function() {
                            expect(true).toBeTruthy();
                        })

                    _httpBackend.flush();
                })

                it('deve tentar buscar as informacoes, mas servidor retorna erro - sem pagina passada por parametro', function() {
                    var _url = '/api/info';

                    _httpBackend.expectGET(_url + '?pagina=1').respond(400);

                    var _pag = new AltPaginacao({url: _url});

                    _pag
                        .buscar()
                        .then(function() {
                            expect(true).toBeFalsy();
                        })
                        .catch(function() {
                            expect(true).toBeTruthy();
                        })

                    _httpBackend.flush();
                })

                it('deve tentar buscar as informacoes, mas servidor retorna erro - sem pagina', function() {
                    var _url = '/api/info';

                    _httpBackend.expectGET(_url + '?pagina=1').respond(400);

                    var _pag = new AltPaginacao({url: _url});

                    _pag
                        .buscar({pagina: undefined})
                        .then(function() {
                            expect(true).toBeFalsy();
                        })
                        .catch(function() {
                            expect(true).toBeTruthy();
                        })

                    _httpBackend.flush();
                })

                it('deve buscar as informacoes com a url passada por parâmetro - apenas página', function() {
                    var _url = '/api/info';
                    var _resposta = [{nome: 'a', id: 0}];

                    _httpBackend.expectGET(_url + '?pagina=2').respond(200, _resposta);

                    var _pag = new AltPaginacao({url: _url});

                    _pag
                        .buscar({pagina: 2})
                        .then(function(info) {
                            expect(angular.equals(info, _resposta)).toBeTruthy();
                        })
                        .catch(function() {
                            expect(true).toBeFalsy();
                        })

                    _httpBackend.flush();
                })

                it('deve buscar as informacoes com a url passada por parâmetro - página + ordenacao', function() {
                    var _url = '/api/info';
                    var _ordenacao = '-x';
                    var _resposta = [{nome: 'a', id: 0}];

                    _httpBackend.expectGET(_url + '?pagina=2&ordenacao=-x').respond(200, _resposta);

                    var _pag = new AltPaginacao({url: _url});

                    _pag
                        .buscar({pagina: 2, ordenacao: _ordenacao})
                        .then(function(info) {
                            expect(angular.equals(info, _resposta)).toBeTruthy();
                        })
                        .catch(function() {
                            expect(true).toBeFalsy();
                        })

                    _httpBackend.flush();
                })
            })
        })

    })

    describe('diretiva: alt-ativa', function() {
        var _scope, _element, _compile;

        beforeEach(inject(function($injector) {
            _scope = $injector.get('$rootScope').$new();
            _compile = $injector.get('$compile');

            var _html = '<div alt-ativa class="alt-paginacao-numero-pagina"></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();
        }))

        describe('criação', function() {
            it('deve estar criado e acessível', function()
            {
                expect(_element).toBeDefined();
            });
        })

        describe('onClick', function()
        {
            it('deve adicionar classe de ativa', function()
            {
                _element.triggerHandler('click');

                expect(_element.hasClass('ativa')).toBeTruthy();
            })

            it('deve remover classe de ativa dos demais elementos', function() {
                var _html = '<div>\
                                <div alt-ativa class="alt-paginacao-numero-pagina"></div>\
                                <div alt-ativa class="alt-paginacao-numero-pagina"></div>\
                                <div alt-ativa class="alt-paginacao-numero-pagina"></div>\
                                <div alt-ativa class="alt-paginacao-numero-pagina"></div>\
                            <div>';

                _element = angular.element(_html);
                _compile(_element)(_scope);

                _scope.$digest();

                _element.find('div').eq(0).triggerHandler('click');

                expect(_element.find('div').eq(0).hasClass('ativa')).toBeTruthy();
                expect(_element.find('div').eq(1).hasClass('ativa')).toBeFalsy();
                expect(_element.find('div').eq(2).hasClass('ativa')).toBeFalsy();
                expect(_element.find('div').eq(3).hasClass('ativa')).toBeFalsy();

                _element.find('div').eq(1).triggerHandler('click');

                expect(_element.find('div').eq(0).hasClass('ativa')).toBeFalsy();
                expect(_element.find('div').eq(1).hasClass('ativa')).toBeTruthy();
                expect(_element.find('div').eq(2).hasClass('ativa')).toBeFalsy();
                expect(_element.find('div').eq(3).hasClass('ativa')).toBeFalsy();
            })
        })
    })

    describe('diretiva: alt-paginacao', function() {
        var _scope, _element, _compile;

        beforeEach(inject(function($injector) {
            _scope = $injector.get('$rootScope').$new();
            _compile = $injector.get('$compile');

            _scope.algumaCoisa = angular.noop;
            _scope.opt = {};
            _scope.ord = {ordenacao: 'a'};

            var _html = '<alt-paginacao atualiza-paginacao="algumaCoisa(obj)" opcoes={{opt}} ordem="ord"></alt-paginacao>';

            _element = angular.element(_html);

            _compile(_element)(_scope);
            _scope.$digest();
        }))

        describe('criação', function() {
            it('deve ter a diretiva criada e acessível', function() {
                expect(_element).toBeDefined();
            })

            it('deve ter opcoes como um objeto vazio', function() {
                expect(_element.isolateScope().opcoes).toBeDefined();
            })
        })

        describe('onClick', function() {
            it('deve reagir com clique', function() {
                spyOn(_scope, 'algumaCoisa').and.callFake(angular.noop);

                _element.triggerHandler('click');

                expect(_scope.algumaCoisa).toHaveBeenCalled();
            })
        })

        describe('$observe', function() {
            it('deve reagir a troca de opt - 1 página', function() {
                _scope.opt = {totalElementos: 100, itensPorPagina: 100};
                _scope.algumaCoisa = angular.noop;

                var _html = '<alt-paginacao atualiza-paginacao="algumaCoisa(obj)" opcoes={{opt}} ></alt-paginacao>';

                _element = angular.element(_html);

                _compile(_element)(_scope);
                _scope.$digest();

                expect(_element.isolateScope().numeroPaginas.length).toEqual(1);
                expect(_element.isolateScope().maisDeUmaPagina).toBeFalsy();
            })

            it('deve reagir a troca de opt - 11 páginas', function() {
                _scope.opt = {totalElementos: 101, itensPorPagina: 10};
                _scope.algumaCoisa = angular.noop;

                var _html = '<alt-paginacao atualiza-paginacao="algumaCoisa(obj)" opcoes={{opt}} ></alt-paginacao>';

                _element = angular.element(_html);

                _compile(_element)(_scope);
                _scope.$digest();

                expect(_element.isolateScope().numeroPaginas.length).toEqual(11);
                expect(_element.isolateScope().maisDeUmaPagina).toBeTruthy();
            })

            it('deve reagir a troca de opt - 10 páginas', function() {
                _scope.opt = {totalElementos: 100, itensPorPagina: 10};
                _scope.algumaCoisa = angular.noop;

                var _html = '<alt-paginacao atualiza-paginacao="algumaCoisa(obj)" opcoes={{opt}} ></alt-paginacao>';

                _element = angular.element(_html);

                _compile(_element)(_scope);
                _scope.$digest();

                expect(_element.isolateScope().numeroPaginas.length).toEqual(10);
                expect(_element.isolateScope().maisDeUmaPagina).toBeTruthy();
            })
        })
    });

    describe('diretiva: alt-ordenacao', function() {
        var _scope, _element, _compile;

        beforeEach(inject(function($injector) {
            _scope = $injector.get('$rootScope').$new();
            _compile = $injector.get('$compile');

            _scope.algumaCoisa = angular.noop;
            _scope.pag = {pagina: 11};

            var _html = '<div alt-ordenacao asc="a" desc="-a" atualiza-ordenacao="algumaCoisa(obj)" paginacao="pag"></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();
        }));

        describe('criação', function() {
           it('deve ter sido criado e disponível', function() {
               expect(_element).toBeDefined();
           })
        });

        describe('onClick', function() {

            it('deve fazer a busca como asc - sem página', function() {
                spyOn(_scope, 'algumaCoisa').and.callFake(angular.noop);

                _scope.pag = {};
                _scope.$digest();

                _element.triggerHandler('click');

                expect(_scope.algumaCoisa).toHaveBeenCalledWith({ordenacao: 'a', pagina: undefined});
            })

            it('deve fazer a busca como asc', function() {
                spyOn(_scope, 'algumaCoisa').and.callFake(angular.noop);

                _element.triggerHandler('click');

                expect(_scope.algumaCoisa).toHaveBeenCalledWith({ordenacao: 'a', pagina: 11});
            })

            it('deve fazer a segunda busca como desc', function() {
                spyOn(_scope, 'algumaCoisa').and.callFake(angular.noop);

                _element.triggerHandler('click');
                _element.triggerHandler('click');

                expect(_scope.algumaCoisa).toHaveBeenCalledWith({ordenacao: '-a', pagina: 11})
            })

            it('deve fazer a terceira busca como asc', function() {
                spyOn(_scope, 'algumaCoisa').and.callFake(angular.noop);

                _element.triggerHandler('click');
                _element.triggerHandler('click');
                _element.triggerHandler('click');

                expect(_scope.algumaCoisa).toHaveBeenCalledWith({ordenacao: 'a', pagina: 11});
            })
        })
    });
})