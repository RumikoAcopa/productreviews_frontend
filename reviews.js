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
  
  static create(formData) {
    return fetch("http://localhost:3000/reviews", {
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

  function setToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime())
  }

  function getToken() {
    let now = new Date(Date.now()).getTime();
    let thirtyMinutes = 1000 * 60 * 30;
    let timeSinceLastLogin = now - localStorage.getItem('lastLoginTime');
    if (timeSinceLastLogin < thirtyMinutes) {
      return localStorage.getItem('token');
    }
  }

  fetch('http://localhost:3000/login', {
    method: 'post', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"user": {
    "email" : "test@test.com",
    "password" : "password"
    }})
  })

  .then(res => {
    if(res.ok) {
      setToken(res.headers.get('Authorization'))
      return res.json()
    } else {
      return res.text().then(text => Promise.reject(text));
    }
  })
  .then(json => console.dir(json))
  .catch(err => console.error(err))

  //Then wait 30 minutes and do this:

  fetch('http://localhost:3000/private/test', {
    headers: {
      'Content-Type': 'application/json', 
    }
  })
    .then(res => {
      if(res.ok) {
        return res.json() //rtns a promise 4 body content
      } else if (res.status == "401") {
        return res.text().then(text => Promise.reject(text))
      }
    })
    .then(json => console.dir(json))
    .catch(err => console.error(err))


  render() {
    
    const reviewContainer = document.querySelector('#review-container')
    //render reviews in reviewContainer
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
