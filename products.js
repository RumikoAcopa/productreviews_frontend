class Product {
  constructor(attributes) {
    let whitelist = ["id", "name", "description", "image_url"];
    whitelist.forEach((attr) => (this[attr] = attributes[attr]));
    allProducts.push(this);
    this.reviews = [];
  }

  static container() {
    return (this.c ||= document.querySelector("#products-list"));
  }

  static findById(id) {
    return allProducts.find((product) => product.id === id);
  }

  static all() {
    return fetch("http://localhost:3000/products", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((error) => Promise.reject(error));
        }
      })

      .then((productArray) => {
        this.collection = productArray.map((attrs) => new Product(attrs));
        this.sortedProducts = this.collection.sort(function (a, b) {
          //return a - b;
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        //console.log(this.sortedProducts)
        let renderedProducts = this.collection.map((product) =>
          product.render()
        );
        this.container().append(...renderedProducts);
        return this.collection;
      });
  }

  render() {
    const productsDiv = document.querySelector("#products-list");
    const reviewsDiv = document.createElement("div");

    reviewsDiv.class = "product-reviews-list";
    reviewsDiv.id = `product-reviews-list-${this.id}`;

    const reviewsHeader = document.createElement("h3");
    reviewsHeader.innerText = "Reviews";
    reviewsHeader.style.fontWeight = "bolder";
    reviewsHeader.style.fontSize = "Large";
    reviewsDiv.appendChild(reviewsHeader);

    this.element ||= document.createElement("div");
    this.element.classList.add(..."mb-4 text-align-center".split(" "));

    this.nameLink ||= document.createElement("a");
    this.nameLink.class =
      "md:flex py-16 px-10 bg-black-800 text-black-400text-center";
    this.nameLink.style.fontWeight = "bolder";
    this.nameLink.style.fontSize = "XX-Large";
    this.nameLink.textContent = this.name;

    this.descriptionLink ||= document.createElement("p");
    this.descriptionLink.class = "mr-2 mt-8 text-bold-right";
    this.descriptionLink.style.textAlign = "list-style-position: outside;";
    this.descriptionLink.textContent = this.description;

    this.imageLink ||= document.createElement("img");
    this.imageLink.class =
      "sm:flex py-4 px-4 bg-black-800 text-black-200 text-center";
    // this.imageLink.src = this.image_url;

    this.newReviewForm ||= document.createElement("form");
    this.newReviewForm.className = "new-review-form";

    this.productIdInput ||= document.createElement("input");
    this.productIdInput.type = "hidden";
    this.productIdInput.name = "product_id";
    this.productIdInput.value = this.id;
    this.newReviewForm.appendChild(this.productIdInput);

    this.commentLabel ||= document.createElement("label");
    this.commentLabel.setAttribute("for", `new-review-comment-${this.id}`);
    //this.commentLabel.innerHTML = "Leave your review here ";
    this.newReviewForm.appendChild(this.commentLabel);

    this.newReviewComment ||= document.createElement("textarea");
    this.newReviewComment.class = "new-review-comment";
    this.newReviewComment.style = "border:solid 1px orange;";
    this.newReviewComment.focus();
    this.newReviewComment.name = "comment";
    this.newReviewForm.appendChild(this.newReviewComment);

    this.newReviewButton ||= document.createElement("button");
    this.newReviewButton.class = "new-review-button color-blue-800";
    this.newReviewButton.id = `new-review-button-${this.id}`;
    this.newReviewButton.innerHTML = "Start typing Review Above";
    this.newReviewForm.appendChild(this.newReviewButton);

    this.element.append(
      this.nameLink,
      this.imageLink,
      this.descriptionLink,
      this.newReviewForm,
      reviewsDiv
    );

    return this.element;
  }
}
