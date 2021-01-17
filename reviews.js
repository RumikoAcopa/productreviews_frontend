class Review {

  constructor(attributes) {
      let whitelist = ["id", "name", "user_id", "product_id", "comment"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
  }

  static container() {
      return this.c ||= document.querySelector("#product-reviews-list")
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
        
      this.reviewAttributes;
      
      });
  }

  

  render() {
    
    const reviewContainer = document.querySelector('#review-container')
    //this.reviewsDiv =document.createElement("div")
    //this.reviewsDiv.class = "product-reviews-list"
    //this.reviewsDiv.id = `product-reviews-list-${this.id}`;
  }

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

}
