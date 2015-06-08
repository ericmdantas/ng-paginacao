"use strict";

describe('alt.ng-paginacao', function() {
    beforeEach(module('alt.ng-paginacao'));

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
                expect(_pag.pagina).toBe(1);
                expect(_pag.maximoPaginasExibidas).toBe(10);
                expect(_pag.itensPorPagina).toBe(10);
                expect(_pag.dados).toEqual([]);
            })

            it('deve ter os valores passados por parâmetro', function() {
                var _pag = new AltPaginacao(_objetoAltPaginacaoCompleto);

                expect(angular.equals(_pag, _objetoAltPaginacaoCompleto)).toBeTruthy();
            })
        })

    })
    describe('diretiva: alt-paginacao', function() {

    });


})