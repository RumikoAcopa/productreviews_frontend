document.addEventListener('DOMContentLoaded', function(e) {
    Product.all();
});

document.addEventListener('click', function(e) {
    console.dir(e.target)
});

document.addEventListener('submit', function(e){
    let target = e.target;
    if (target.matches('#submit_review')) {
        e.preventDefault();
        let formData = {}
        target.querySelectorAll('input').forEach(function(input){
        formData[input.comment] = input.value;
        })
        debugger
        Review.create(formData);
    }
})

let element = document.getElementById("review-button")
/* document.querySelectorAll(".review")
returns multiple elements. Pick with [0] where 0 can be higher for multiple els */ 
element.addEventListener('click', function(e) {
    window.scrollTo(0,document.body.scrollHeight);

   // document.getElementById("review").scrollIntoView(true)
//
});


// let element = document.getElementById("submit_review_form").onsubmit = function() //{myFunction()};
//    function myFunction() {
//  alert("The form was submitted");
//}

// let myModal = document.getElementById('myModal')
// let myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

