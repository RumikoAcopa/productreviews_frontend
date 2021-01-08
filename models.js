class Product {
    constructor (attributes) {
        let whitelist = ["id", "name", "description", "active"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#productsContainer")
    }

    static list() {
        return this.l ||= document.querySelector("#lists")
    }

    static all() {
        console.log('.all()')
    }
} 

class Review {
    constructor(attributes) {
        let whitelist = ["id", "name", "product_id", "comment"]
        whitelist.forEach(attr => this[attr] = attribute[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#reviews")
    }

    static all() {

    }
}
