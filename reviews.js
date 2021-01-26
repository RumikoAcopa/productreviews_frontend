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
      this.collection = reviewObjects.map(reviewAttributes => new Review(reviewAttributes))
      let reviews = this.collection.map(review => review.display())
      return this.collection
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
      this.all().push(newReview);
      newReview.display();
    });
    
  }

  
  display(){
    this.title = document.createElement("p")
    this.title.textContent = this.comment
    this.title.id = this.id
    document.getElementById("reviews-container").appendChild(this.title)
  }

}



