export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;

            if (emSegundos) {
                unidade = 'seg';
                divisor = 1000;
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            const calculo = `${(t2 - t1)/divisor}`;
            console.log(`O método ${propertyKey} foi executado em ${calculo.substring(0,4)} ${unidade}.`)
            return retorno;
        }
        return descriptor;
    }
}