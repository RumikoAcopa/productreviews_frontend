class Product {
    constructor (attributes) {
        let whitelist = ["id", "name", "description", "image_url"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#products-list") 
        //css selector would go here for products container where it's holding the products
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
                return res.json() // if things are ok, returns a promise for body content parsed as json. next promise callback will be able to consume that.
                } else {
                return res.text().then(error => Promise.reject(error)) // if not ok, this returns a promise so we can chain on a then and say there's an error. return a rejected promise. parse it as text; error message from API and then return that error as a rejected promise. so we skip the following then, and go to catch. 
                }
            }) /* .then will handle the promise we get back from fetch. fetch always returns 
            a promise for a response object. */
            .then(productArray => { /* when you're in a situation where you need to have access to the same context as before or later on, use an arrow function. When you're defining a function, and you know when the function gets called you want a reference to the same context you're in when you define it, use arrow function. */
            this.collection = productArray.map(attrs => new Product(attrs))/* storing the product list we're getting back from the API in a class variable (thiscollection) */
            let renderedProducts = this.collection.map(product => product.render()) /* array ofproduct items */
            this.container().append(...renderedProducts);
            return this.collection
            })
    }
        
    //productList.render will create an lielement and assign it to this.element
    //allows us to update li w/o havingto 
    //<li><a href=""><img src="https:/isteamwsimg.comip800fd409-b2f1-4b2a-bd7e-d17256c258a2ol/Lavish%20Blossom%20Toner.jpg/:rs=w:1200h:1200" class="w-full mb-4roundedborder-solid border-2border-black-400"><a></li>
    render() {
        const productsDiv = document.querySelector("#products-list")
        this.reviewsDiv =document.createElement("div")
        this.reviewsDiv.class = "product-reviews-list"
        this.reviewsDiv.id = `product-reviews-list-${this.id}`;

        const productsUl = document.createElement('ul')
        productsUl.className = "products-ul"
        productsUl.id = "products-ul"
        productsDiv.appendChild(productsUl)

        this.element ||= document.createElement('li');
        this.element.classList.add(..."bg-white-700 p-4 flex justify-between items-center".split(" "));

        this.nameLink ||= document.createElement('a');
        this.nameLink.class="md:flex py-16 px-10 bg-black-800 text-black-200 text-center"
        this.nameLink.textContent = this.name;
        //this.nameLink.dataset.productId=this.id;
        //this.nameLink.innerHTML = `<i class="reviewModal" data-product-id="${this.id}">${this.name}</i>`;

        this.descriptionLink ||= document.createElement('a');
        this.descriptionLink.class="md:flex py-8 px-8 bg-black-800 text-black-200 text-bottom"
        this.descriptionLink.textContent = this.description;

        this.imageLink ||= document.createElement('img');
        this.imageLink.class="md:flex py-8 px-8 bg-black-800 text-black-200 text-center"
        this.imageLink.src = this.image_url;

        this.newReviewFormLink ||= document.createElement('form');
        this.newReviewFormLink.class="";
        this.newReviewFormLink.id = `new-review-form-${this.id}`;

        this.commentLabel ||= document.createElement('label');
        this.commentLabel.setAttribute("for", `new-review-comment-${this.id}`);
        //forms appended to div but input fields appended to the form
        this.commentLabel.innerHTML = "Leave your review here";
        this.newReviewFormLink.appendChild(this.commentLabel);

        this.newReviewComment ||= document.createElement('textarea');
        this.newReviewComment.class="new-review-comment";
        this.newReviewComment.id = `new-review-comment-${this.id}`;
        this.newReviewFormLink.appendChild(this.newReviewComment);

        this.newReviewButton ||= document.createElement('button');
        this.newReviewButton.class= "new-review-button";
        this.newReviewButton.id = `new-review-button-${this.id}`;
        this.newReviewButton.innerHTML = "Submit";
        this.newReviewFormLink.appendChild(this.newReviewButton);

        this.newReviewButton.addEventListener('click', (event) => {
            event.preventDefault();
            const reviewCommentValue = document.getElementById(`new-review-comment-${this.id}`).value;
            const review = {
                comment: reviewCommentValue,
                product_id: this.id
            }
            
            Review.create(review) 
        }); 

        this.editLink ||= document.createElement('a');
        this.editLink.class = "my-4 text-right";
        this.editLink.innerHTML = `<i class= "fa fa pencil-alt"</i>`;

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.class = "my-4 text-right";
        this.deleteLink.innerHTML = `<i class= "fa fa trash-alt"</i>`;

        this.element.append(this.nameLink, this.descriptionLink, this.imageLink, this.reviewsDiv, this.newReviewFormLink, this.editLink, this.deleteLink); /* whatdoes this mean???HELP */
        return this.element; 
    }




    
     //fetch("http://localhost:3000/reviews", {
            //method: "POST",
            //headers: {
            //    "Accept": "application/json",
            //    "Content-Type": "application/json",  
            //},
            //body: JSON.stringify(review)
            //})
            //.then(res => (res.json()))
            //.then(review => (console.log(review)))
            //.catch(error => console.log("Error: " + error))   
    //modalContent() {
    //    this.modal ||= document.createElement('div');
    //    this.productDescription ||= document.createElement('a');
    //    this.productDescription.classList.add(..."flex items-center no-underline //hover:underline text-black".split(" "));
    //    this.productDescription.textContent = this.description;
    //    this.modal.append(this.productDescription);
    //    return this.modal
    //}
}
 



