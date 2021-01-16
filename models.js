class Product {
    constructor (attributes) {
        let whitelist = ["id", "name", "description", "image_url", "active"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#") 
        //css selector would go here for products container where it's holding the products
    }

    static all() {
        console.log(this);
        return fetch("http://localhost:3000/products", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        
        .then(res => {
            if(res.ok) {
                return res.json() // if things are ok, returns a promise for body content parsed as json. next promise callback will be able to consume that.
                } else {
                return res.text().then(error => Promise.reject(error)) // if not ok, this returns a promise so we can chain on a then and say there's an error. return a rejected promise. parse it as text; error message from API and then return that error as a rejected promise. so we skip the following then, and go to catch. 
                }
            }) /* .then will handle the promise we get back from fetch. fetch always returns 
            a promise for a response object. */
            .then(productArray => { /* when you're in a situation where you need to have access to the same context as before or later on, use an arrow function. When you're defining a function, and you know when the function gets called you want a reference to the same context you're in when you define it, use arrow function. */
            this.collection = productArraymap(attrs => new Product(attrs))/* storing the product list we're getting back from the API in a class variable (thiscollection) */
            let renderedProducts = thiscollection.map(product =>product.render()) /* array ofproduct items */
            this.container().append(...renderedProducts);
            return this.collection
            })
    }
        
    //productList.render will create an lielement and assign it to this.element
    //allows us to update li w/o havingto 
    //<li><a href=""><img src="https:/isteamwsimg.comip800fd409-b2f1-4b2a-bd7e-d17256c258a2ol/Lavish%20Blossom%20Toner.jpg/:rs=w:1200h:1200" class="w-full mb-4roundedborder-solid border-2border-black-400"><a></li>
    render() {
        this.element ||= document.createElement('section');
        this.element.classList.add(..."sm:grid grid-cols-1 gap-2 px-4 bg-white sm:min-h-screen col-span-2 rounded-md shadow".split(" "));
        this.firstDiv ||= document.createElement('div');
        this.firstDiv.classList.add(..."md:flex py-16 px-10bg-black-800text-black-200text-center".split(" ")); /*turns into array ofseparateclasses */
        this.nextDiv ||= document.createElement('div'); 
        this.nextDiv.classList.add(..."mr-2text-center".split(" "));
        this.imgList ||= document.createElement('ul'); 
        this.imgList.classList.add(..."img-list".split(" "));
        this.image ||= document.createElement ('a'); 
        this.image.classList.add(..."w-fullmb-4 roundedborder-solidborder-2border-black-400".split(" "));
        this.nameLink ||= document.createElement('p');
        this.nameLink.classList.add(..."no-underlinehover:underlinetext-blackselectProduct".split(" ")); 
        this.nameLink.textContent = this.name;
        this.nameLink.dataset.productId=this.id;
        this.nameLink.innerHTML = `<i class="reviewModal" data-product-id="${this.id}">${this.name}</i>`;
        this.element.append(this.firstDiv, this.nextDiv, this.imgList, this.image, this.nameLink); /* whatdoes this mean???HELP */
        return this.element; 
    }

    modalContent() {
        this.modal ||= document.createElement('div');
        this.productDescription ||= document.createElement('a');
        this.productDescription.classList.add(..."flex items-center no-underline hover:underline text-black".split(" "));
        this.productDescription.textContent = this.description;
        this.modal.append(this.productDescription);
        return this.modal
    }
}
 

class Review {
    constructor(attributes) {
        let whitelist = ["id", "user_id", "product_id", "comment"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#reviews")
    }; //append things here w/element
    
    static all() {
        return fetch("http://localhost:3000/reviews", {
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

    static showStuff() {
        let img = new Image();
        img.src = 'http://lorempixel.com/350/350/';
        document.body.appendChild(img);
        img.onclick = function() {
        setTimeout(function() {
        window.location.href = 'http://test.com/';
        }, 3000);
    };
        let hidden = document.getElementById('hidden');
        if (hidden.style.display == "none") {
          hidden.style.display = "block"
        } else {
          hidden.style.display = "none"
        }
    }
    render() {
        this.element ||= document.createElement('div');
        this.element.classList.add(..."md:flex py-16 px-10 bg-black-800 text-black-200 text-center".split(" ")); /* turns into array of separate classes */
        this.nextDiv ||= document.createElement('div'); 
        this.nextDiv.classList.add(..."mr-2 text-center".split(" "));
        this.imgList ||= document.createElement('ul'); 
        this.imgList.classList.add(..."img-list".split(" "));
        this.image ||= document.createElement ('a'); 
        this.image.classList.add(..."w-full mb-4 rounded border-solid border-2 border-black-400".split(" "));
        this.nameLink ||= document.createElement('p');
        this.nameLink.classList.add(..."no-underline hover:underline text-black selectProduct".split(" ")); 
        this.nameLink.textContent = this.name;
        this.nameLink.dataset.productId = this.id;
        this.element.append(this.nextDiv, this.imgList, this.image, this.nameLink); /* what does this mean??? HELP */
        return this.element; 
    }
        //need render
        //need to build form data - refer to repo utilities.js file later branches(videos)
  
}

class Modal {
    static init() {
        this.body ||= document.body;
        this.modal ||= document.querySelector('.modal');
        this.title ||= document.querySelector('#modal-title');
        this.content ||= document.querySelector('#modal-content');
    }

    static populate({title, content}) {
      this.title.innerText = title;
      this.content.innerHTML = ""; 
      this.content.append(content);
    }

    static toggle() {
      this.modal.classList.toggle('opacity-0');
      this.modal.classList.toggle('pointer-events-none');
      this.body.classList.toggle('modal-active');
    }
}
