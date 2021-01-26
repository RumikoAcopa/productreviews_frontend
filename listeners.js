document.addEventListener('DOMContentLoaded', function(e) {
    Product.all();
    Review.all();
      
});

document.addEventListener('click', function(e) {
    console.dir(e.target)
});

document.addEventListener('submit', function(e){
    let target = e.target;
    if(target.matches('#newItem')){
     e.preventDefault();
     let formData = {}
     target.querySelectorAll('input').forEach(function(input){
       formData[input.name] = input.value;
     })
     Item.create(formData);
     target.reset();
    }
})





