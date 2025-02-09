class seedBag {
    constructor(plant, quantity) {
        this.plant = plant
        this.quantity = quantity
    }

    use(tile) {
        if (this.quantity >= 1) {
            tile.plant = this.plant
            this.quantity -= 1
        }
    }
}