class Review {

  constructor(attributes) {
    let whitelist = ["id", "user_id", "product_id", "comment"]
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

  static all(){
    return fetch("http://localhost:3000/reviews", {
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
      
    .then(reviewObjects => {
        reviewObjects.forEach(reviewAttributes => {
        const newReview = new Review(reviewAttributes)
        Product.findById(newReview.product_id).reviews.push(newReview)
        newReview.display();
      })
    })
  }
  
  static create(review) {
    return fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
    })
    .then(res => {
      if(res.ok) {
        return res.json() 
      } else {  
        return res.text().then(error => Promise.reject(error))
      }
    })

    .then(reviewAttributes => { 
 
      const newReview = new Review(reviewAttributes);
      this.collection.push(newReview);
      newReview.display();
    });
    
  }

  
  display(){
    this.reviewDiv = document.getElementById(`product-reviews-list-${this.product_id}`)
    this.title = document.createElement("p")
    this.title.textContent = this.comment
    this.title.id = this.id
    this.reviewDiv.appendChild(this.title)
  }

}



