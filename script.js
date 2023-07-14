let log = new Log(document.querySelector('.log'))

let char1 = new Knight ('Cavaleiro');
let char2 = new Sorcerer('Feiticeiro');


// Area
const stage = new Stage(
    char1,
    char2,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)
// chama a função
stage.start();
