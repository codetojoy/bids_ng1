
/*
const _name = Symbol('name');
const _hand = Symbol('hand');
const _score = Symbol('score');
const _isHuman = Symbol('isHuman');
const _strategy = Symbol('strategy');
*/
    
class Player {
    constructor(name, isHuman, strategy, hand = [], score = 0) {
        this.name = name;
        this.isHuman = isHuman;
        this.strategy = strategy;

        this.hand = hand;
        this.score = score;
    }
}
