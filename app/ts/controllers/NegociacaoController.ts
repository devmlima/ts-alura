import { NegociacoesView, MensagemView } from '../views/index'
import { Negociacoes, Negociacao } from '../models/index';
import { domInject } from '../helpers/decoratos/index';
import { NegociacaoParcial } from '../models/NegociacaoParcial';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
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

    importaDados() {
        function isOk(res: Response) {
            if(res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }
        fetch('http://localhost:8080/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))
                this._negociacoesView.update(this._negociacoes);
                })
            .catch(err => console.log(err));
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