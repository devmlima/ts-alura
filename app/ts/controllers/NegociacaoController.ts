import { NegociacoesView, MensagemView } from '../views/index'
import { Negociacoes, Negociacao } from '../models/index';

export class NegociacaoController {
    
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._inputData = $('#data');
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor")
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this.verificaDiaSemana(data)) {
            this._mensagemView.update('Negociações são efetuadas somente em dias úteis, favor selecionar outra data!');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
            this._negociacoes.adiciona(negociacao);
            this._negociacoesView.update(this._negociacoes);
            this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private verificaDiaSemana(data: Date) {
        return data.getDay() != diaSemana.SABADO && data.getDay() != diaSemana.DOMINGO
    }
}

enum diaSemana {
    DOMINGO = 0,
    SEGUNDA, 
    TERÇA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO
}