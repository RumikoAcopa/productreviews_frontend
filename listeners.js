document.addEventListener('DOMContentLoaded', function(e) {
    Product.all().then(() => Review.all());
});

const allProducts = [];

document.addEventListener('submit', function(e){
    let target = e.target;
    if(target.matches('.new-review-form')){
     e.preventDefault();
     let formData = {}
     target.querySelectorAll('input').forEach(function(input){
       formData[input.name] = input.value;
     })
     target.querySelectorAll('textarea').forEach(function(textarea){
        formData[textarea.name] = textarea.value;
      })
     Review.create(formData);
     target.reset();
    }
})







