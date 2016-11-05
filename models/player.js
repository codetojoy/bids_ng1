
    
class Player {
    constructor(name, isHuman, strategy, hand = [], score = 0) {
        this.name = name;
        this.isHuman = isHuman;
        this.strategy = strategy;

        this.hand = hand;
        this.score = score;
    }
}
