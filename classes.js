// Construção de tamplate ... classes // functions (métodos)


class Character{  // Personagem

    _life = 1;
    attack = 0;
    defense = 0;
    maxlife = 1;

    constructor(name){
        this.name = name;
    }

    get life(){  // tem return pois eu pego o elemento
        return this._life;

    }

    set life(newLife){ // se na hora do calculo o dano ultrapassar o 0 o set serve para setar a vida em 0 , previnindo um number negativo
        this._life = newLife < 0 ? 0 : newLife;
    }
}

        // HERANÇA ..  

class Knight extends Character {  // Cavaleiro 
        constructor(name){
            super(name)
            this.life = 100;
            this.attack = 10;
            this.defense = 8;
            this.maxLife = this.life;
        }
}

class Sorcerer extends Character{ // Feiticeiro
        constructor(name){
            super(name)
            this.life = 80;
            this.attack = 15;
            this.defense = 3;
            this.maxLife = this.life;
        }
}
class LittleMonster extends Character{ 
        constructor(){
            super('Mostro Pequeno');
            this.life = 40;
            this.attack = 4;
            this.defense = 4;
            this.maxlife = this.life;
        }
}


class BigMonster extends Character{  
        constructor(){
            super('Mostro Grande');
            this.life = 120;
            this.attack = 16;
            this.defense = 6;
            this.maxlife = this.life;
        }
}

            // CRIADO UMA CLASSE PARA O CENÁRIO DO JOGO ,E DENTRO DESSE CENARIO EU TENHO OS MÉTODOS (FUNÇOES)...

class Stage{
    constructor(fighter1,fighter2,fighterEl1,fighterEl2,logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighterEl1 = fighterEl1;
        this.fighterEl2 = fighterEl2;
        this.log = logObject;
    }
    // METODO DE 'RODAR' O GAME
    start(){
        this.update();
        this.fighterEl1.querySelector('.attackButton').addEventListener('click',() => this.doAttack(this.fighter1 ,this.fighter2))
        this.fighterEl2.querySelector('.attackButton').addEventListener('click', () =>this.doAttack(this.fighter2 , this.fighter1) )
    }

    // 1- pego a class no html passo para parametro el1. 2- altero e passo para parametro fighter1.name incluindo chave name.que esta instanciado na variavel char o obj knight
    // 2 -
    update(){

        //Fighter 1
        this.fighterEl1.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) *100;
            this.fighterEl1.querySelector('.bar').style.width = `${f1Pct}%`


        //Fighter 2
        this.fighterEl2.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP `
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) *100;
            this.fighterEl2.querySelector('.bar').style.width = `${f2Pct}%`;


    }

    doAttack(attacking, attacked){
      if(attacking.life < 0 || attacked.life < 0){
        this.log.addMenssage('Oponente sem sinal de vida')
      }

       let attackFactor = (Math.random() * 2).toFixed(2);
       let defenseFactor = (Math.random() * 2).toFixed(2);
       let actualAttack = attacking.attack * attackFactor;
       let actualDefense = attacked.defense * defenseFactor;
       
       if(actualAttack > actualDefense){
         attacked.life -= actualAttack;
         this.log.addMenssage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
       }else{
        this.log.addMenssage(`${attacked.name} Conseguiu defender`)
       }
        this.update()
    }
}

class Log {
     list = [];  // array vazio, sera renderizado elementos em ordem de lista

    constructor(listEl){   // para pegar o ul do html
        this.listEl = listEl;

    }

    addMenssage(msg){   // function parametro aberto , passamos mensagem do console nele , para chama-lo usamos this.log.addMenssage(`${}`)
        this.list.push(msg)
        this.render();
    }
    render(){
            this.listEl.innerHTML = ''; // limpa pois o i do for ja alocou a informaçao anterior se  nao limpar ele repete a info
  // toda vez que passa pela list do array a variavel i indentifica uma atividade e cria uma li
        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
}

}