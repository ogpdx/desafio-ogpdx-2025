class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
  }

  encontraPessoas(brinquedos1, brinquedos2, ordemAnimais) {
    try {
      const lista = [];
      const pessoaCount = { 1: 0, 2: 0 };

      const p1 = brinquedos1.split(',').map(s => s.trim());
      const p2 = brinquedos2.split(',').map(s => s.trim());
      const animaisOrdem = ordemAnimais.split(',').map(s => s.trim());

      
      if (new Set(p1).size !== p1.length || new Set(p2).size !== p2.length) {
        return { erro: 'Brinquedo inválido' };
      }

      for (let nome of animaisOrdem) {
        const animal = this.animais[nome];
        if (!animal) return { erro: 'Animal inválido' };

        let dono = 'abrigo';

        // Cães e jabutis
        if (animal.tipo === 'cão' || animal.tipo === 'jabuti') {
          const checaP1 = this.verificaBrinquedos(animal, p1);
          const checaP2 = this.verificaBrinquedos(animal, p2);

          if (checaP1 && !checaP2 && pessoaCount[1] < 3) dono = 'pessoa 1';
          if (!checaP1 && checaP2 && pessoaCount[2] < 3) dono = 'pessoa 2';
          if (checaP1 && checaP2) dono = 'abrigo';

          if (dono === 'pessoa 1') pessoaCount[1]++;
          if (dono === 'pessoa 2') pessoaCount[2]++;
        }

        // Gatos
        if (animal.tipo === 'gato') {
          const checaP1 = this.verificaBrinquedosGato(animal, p1);
          const checaP2 = this.verificaBrinquedosGato(animal, p2);

          if (checaP1 && !checaP2 && pessoaCount[1] < 3) dono = 'pessoa 1';
          if (!checaP1 && checaP2 && pessoaCount[2] < 3) dono = 'pessoa 2';
          if (checaP1 && checaP2) dono = 'abrigo';

          if (dono === 'pessoa 1') pessoaCount[1]++;
          if (dono === 'pessoa 2') pessoaCount[2]++;
        }

        lista.push(`${nome} - ${dono}`);
      }

      return { lista: lista.sort(), erro: false };
    } catch (e) {
      return { erro: 'Erro inesperado' };
    }
  }

  verificaBrinquedos(animal, brinquedosPessoa) {
    
    if (animal.tipo === 'jabuti') {
      return animal.brinquedos.every(b => brinquedosPessoa.includes(b));
    }
    
    let index = 0;
    for (let b of brinquedosPessoa) {
      if (b === animal.brinquedos[index]) index++;
    }
    return index === animal.brinquedos.length;
  }

  verificaBrinquedosGato(animal, brinquedosPessoa) {
    
    if (brinquedosPessoa.length < animal.brinquedos.length) return false;
    let i = 0;
    for (let b of brinquedosPessoa) {
      if (b === animal.brinquedos[i]) i++;
    }
    return i === animal.brinquedos.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
