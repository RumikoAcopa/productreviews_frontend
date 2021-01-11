class Product {
    constructor (attributes) {
        let whitelist = ["id", "name", "description", "active"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#lists")
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
            let renderedLists = this.collection.map(productList => productList.render())
            this.container().append(...renderedLists);
            return this.collection
        })

        static create(formData) {
            return fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productList: formData})
            })

            .then(res => {
                if(res.ok) {
                    return res.json() //rtns a promise 4 body content parsed as JSON
                } else {  //else,rtn a reject promise so skip following then & go 2 catch
                    return res.text().then(error => Promise.reject(error))
                }
            })

            .then(productListAttributes => {
                let productList = new Product(productListAttributes);
                this.collection.push(productList);
                this.container.appendChild(product.render())
            });


        //productList.render will create an li element and assign it to this.element
            //allows us to update li w/o having to 
            //<li><a href=""><img src="https://isteam.wsimg.com/ip/800fd409-b2f1-4b2a-bd7e-d17256c258a2/ols/Lavish%20Blossom%20Toner.jpg/:/rs=w:1200,h:1200" class="w-full mb-4 rounded border-solid border-2 border-black-400"></a></li>
        .render() {
            this.element ||= document.createElement(li)
            this.element.classList.add(...'mr-2 text-center.split') 

            this.nameLnk ||= document.createElement('a');
            this.nameLink.classList.add(..."w-full mb-4 rounded border-solid border-2 border-black-400".split) 
            this.nameLink.textContent = this.name;

            //this.editLink ||= document.createElement(a);
            //this.editLink.classList.add(...''.split)
            //this.editLink.innerHTML = '?'

            //this.deleteLink ||= document.createElement('a');
            //this.deleteLink.classList.add(..."".split)
            //deleteLink.innerHTML = '?'
            this.element.append(this.nameLink) //need to add , this.editLink, this.deleteLink but I may just need this whole render code for reviews b/c im not editing or deleting the products.
        }
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
