class Review {

  constructor(attributes) {
      let whitelist = ["id", "user_id", "product_id", "comment"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
  }

  //static container() {
  //    return this.c ||= document.querySelector("#product-reviews-list")
  //}; //append things here w/element
  
  static all(){
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
      
      .then(reviewObjects => {
        this.collection = reviewObjects.map(reviewAttributes => new Review(reviewAttributes))
        let reviews = this.collection.map(review => review.display())
        //this.reviews.map(review => review.render())
        return this.collection
      })
      //.then(reviewArray => {
      //  this.collection = reviewArray.map(attrs => new Review(attrs))
      //  let renderedLists = this.collection.map(review => review.render())
      //  this.container().append(...renderedLists);
      //  return this.collection
      //})
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
          return res.json() //rtns a promise 4 body content parsedas JSON
      } else {  //else,rtn a reject promise so skip following then &go 2 catch
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

    //static render(newReview) {
  //  const reviewContainer = document.getElementById('#reviews-container')
  //  const reviewDiv = document.createElement("div")
  //  //reviewDiv.textContent = this.comment
  //  const review = document.createElement("h3")
  //  review.innerText = newReview.comment
  //  //this.reviewDiv.id = this.id
  //  reviewDiv.append(review)
  //  document.getElementById("reviews-container").appendChild(this.reviewDiv)
  //  //document.querySelector("#reviews-container").push(this.reviewDiv)
  //}

  //static showStuff() {
  //    let img = new Image();
  //    img.src = 'http://lorempixel.com/350/350/';
  //    document.body.appendChild(img);
  //    img.onclick = function() {
  //    setTimeout(function() {
  //    window.location.href = 'http://test.com/';
  //    }, 3000);
  //};
  //    let hidden = document.getElementById('hidden');
  //    if (hidden.style.display == "none") {
  //      hidden.style.display = "block"
  //    } else {
  //      hidden.style.display = "none"
  //    }
      //need render
      //need to build form data - refer to repo utilities.js file later branches(videos)

