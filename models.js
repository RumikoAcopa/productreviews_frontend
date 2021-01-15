class Product {
    constructor (attributes) {
        let whitelist = ["id", "name", "description", "image_url", "active"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#") //css selector would go here for products container where it's holding the products
    }

    static all() {
        return fetch("http://localhost:3000/products", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        .then(res => {
            if(res.ok) {
                return res.json() //rtns a promise 4 body content parsed as JSON
            } else {  //else,rtn a reject promise so skip following then & go 2 catch
                return res.text().then(error => Promise.reject(error))
            }
        })

        .then(productArray => {
            this.collection = productArray.map(attrs => new Product(attrs))
            let renderedProducts = this.collection.map(product => product.render())
            this.container().append(...renderedProducts);
            return this.collection
        })
    }

        
        //productList.render will create an li element and assign it to this.element
            //allows us to update li w/o having to 
            //<li><a href=""><img src="https://isteam.wsimg.com/ip/800fd409-b2f1-4b2a-bd7e-d17256c258a2/ols/Lavish%20Blossom%20Toner.jpg/:/rs=w:1200,h:1200" class="w-full mb-4 rounded border-solid border-2 border-black-400"></a></li>

    render() { //give you DOM node look at html/at elem for product. Fill in so it rtn one of those products. Should look like below ex.
     
        this.element ||= document.createElement("li")
        this.element.classList.add(...'mr-2 text-center'.split(" ")) 

        return this.element
    }
}
 

class Review {
    constructor(data) {
        let whitelist = ["id", "name", "product_id", "comment"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    };

    function postReview() {
        const review = {
            user_id: document.getElementById('name').value,
            product_id: document.getElementById('product_id').value,
            comment: document.getElementById('comment').value
        }
    };

    static container() {
        return this.c ||= document.querySelector("#reviews")
    };

    static all() {
        return fetch("http://localhost:3000/products", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        .then(res => {
            if(res.ok) {
                return res.json() //rtns a promise 4 body content parsed as JSON
            } else {  //else,rtn a reject promise so skip following then & go 2 catch
                return res.text().then(error => Promise.reject(error))
            }
        })

        .then(reviewArray => {
            this.collection = reviewArray.map(attrs => new Review(attrs))
            let renderedLists = this.collection.map(reviewList => reviewList.render())
            this.container().append(...renderedLists);
            return this.collection
        })
    }

    static create(formData) {
        return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({review: formData})
        })
        .then(res => {
            if(res.ok) {
                return res.json() //rtns a promise 4 body content parsedas JSON
            } else {  //else,rtn a reject promise so skip following then &go 2 catch
                return res.text().then(error => Promise.reject(error))
            }
        })
        .then(reviewAttributes => {
            let review = new Review(reviewAttributes);
            this.collection.push(review);
            this.container.appendChild(review.render())
            return review;

        });
    }   
}

class ProductReview {
    
}

