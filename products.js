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
              return res.json() 
              } else {
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
      
  render() {
      const productsDiv = document.querySelector("#products-list")
      this.reviewsDiv =document.createElement("div")
      this.reviewsDiv.class = "product-reviews-list"
      this.reviewsDiv.id = `product-reviews-list-${this.id}`;

      //const productsName = document.querySelector("name-container")
      //const nameDiv = document.createElement('div')
      //nameDiv.className = "name-div"
      //nameDiv.id = "name-div"
      //productsName.appendChild(nameDiv)

      const productsBody = document.createElement('body')
      productsBody.className = "products-body align-center"
      productsBody.id = "products-body"
      productsDiv.appendChild(productsBody)

      //const reviewContainer = document.createElement("div")
      //reviewContainer.id = 'new-review-comment'


      this.element ||= document.createElement('div');
      this.element.classList.add(..."w-1/4 mb-4 text-align-center".split(" "));

      this.nameLink ||= document.createElement('a');
      this.nameLink.class="md:flex py-16 px-10 bg-black-800 text-black-400 text-center";
      this.nameLink.style.fontWeight="bolder";
      this.nameLink.style.fontSize="Large";
      this.nameLink.textContent = this.name;

      //this.nameLink.dataset.productId=this.id;
      //this.nameLink.innerHTML = `<i class="reviewModal" data-product-id="${this.id}">${this.name}</i>`;

      this.descriptionLink ||= document.createElement('p');
      this.descriptionLink.class="mr-2 mt-8 text-bold-right"
      this.descriptionLink.textContent = this.description;

      this.imageLink ||= document.createElement('img');
      this.imageLink.class="sm:flex py-4 px-4 bg-black-800 text-black-200 text-center"
      this.imageLink.src = this.image_url;

      this.newReviewFormLink ||= document.createElement('form');
      this.newReviewFormLink.class="";
      this.newReviewFormLink.id = `new-review-form-${this.id}`;

      this.commentLabel ||= document.createElement('label');
      this.commentLabel.setAttribute("for", `new-review-comment-${this.id}`);
      //forms appended to div but input fields appended to the form
      this.commentLabel.innerHTML = "Leave your review here ";
      this.newReviewFormLink.appendChild(this.commentLabel);

      this.newReviewComment ||= document.createElement('textarea');
      this.newReviewComment.class="new-review-comment"; 
      this.newReviewComment.style="border:solid 1px orange;";
      this.newReviewComment.style.cursor= "alias";
      this.newReviewComment.id = `new-review-comment-${this.id}`;
      this.newReviewFormLink.appendChild(this.newReviewComment);

      this.newReviewButton ||= document.createElement('button');
      this.newReviewButton.class= "new-review-button color-blue-800";
      this.newReviewButton.id = `new-review-button-${this.id}`;
      this.newReviewButton.innerHTML = "Enter Review Above";
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

        /*document.getElementById(`new-review-comment-${this.id}`).reset();
          document.getElementById('new-review-comment').addEventListener('keyup', e => {
            console.log('Caret at: ', e.target.selectionStart)
          })*/
 
      this.editLink ||= document.createElement('a');
      this.editLink.class = "my-4 text-right";
      this.editLink.innerHTML = `<i class= "fa fa pencil-alt"</i>`;

      this.deleteLink ||= document.createElement('a');
      this.deleteLink.class = "my-4 text-right";
      this.deleteLink.innerHTML = `<i class= "fa fa trash-alt"</i>`;

      this.element.append(this.nameLink, this.descriptionLink, this.imageLink, this.reviewsDiv, this.newReviewFormLink, this.editLink, this.deleteLink); 
      
      return this.element; 
  }
}