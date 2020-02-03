System.register(["../views/index", "../models/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, NegociacaoController, diaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._inputData = $('#data');
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this.verificaDiaSemana(data)) {
                        this._mensagemView.update('Negociações são efetuadas somente em dias úteis, favor selecionar outra data!');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso!');
                }
                verificaDiaSemana(data) {
                    return data.getDay() != diaSemana.SABADO && data.getDay() != diaSemana.DOMINGO;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (diaSemana) {
                diaSemana[diaSemana["DOMINGO"] = 0] = "DOMINGO";
                diaSemana[diaSemana["SEGUNDA"] = 1] = "SEGUNDA";
                diaSemana[diaSemana["TER\u00C7A"] = 2] = "TER\u00C7A";
                diaSemana[diaSemana["QUARTA"] = 3] = "QUARTA";
                diaSemana[diaSemana["QUINTA"] = 4] = "QUINTA";
                diaSemana[diaSemana["SEXTA"] = 5] = "SEXTA";
                diaSemana[diaSemana["SABADO"] = 6] = "SABADO";
            })(diaSemana || (diaSemana = {}));
        }
    };
});
