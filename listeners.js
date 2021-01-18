document.addEventListener('DOMContentLoaded', function(e) {
    Product.all();
    Review.all();
});





//document.addEventListener('click', function(e) {
//    let target = e.target;
//    if(target.matches('#BP')) {
//        e.preventDefault
//
//    } else if(target.matches(".reviewModal")) {
//        let review = Review.findById(target.dataset.reviewId);
//        Modal.populate({title: `${product.name}`, content: product.modalContent()})
//        Modal.toggle()    
//    } else if(target.matches(".modal-close") || target.matches(".modal-overlay")) {
//        e.preventDefault();
//        Modal.toggle();
//    } 
//});
//
//document.addEventListener('keydown', function(evt) {
//    evt = evt || window.event
//    var isEscape = false
//    if ("key" in evt) {
//      isEscape = (evt.key === "Escape" || evt.key === "Esc")
//    } else {
//      isEscape = (evt.keyCode === 27)
//    }
//    if (isEscape && document.body.classList.contains('modal-active')) {
//      Modal.toggle()
//    }
//});

//document.addEventListener('submit', function(e){
//    let target = e.target;
//    if (target.matches('#submit_review')) {
//        e.preventDefault();
//        let formData = {}
//        target.querySelectorAll('input').forEach(function(input){
//        formData[input.comment] = input.value;
//        })
//        debugger
//        Review.create(formData);
//    }
//})

//let element = document.getElementById("review-button")
///* document.querySelectorAll(".review")
//returns multiple elements. Pick with [0] where 0 can be higher for multiple els */ 
//element.addEventListener('click', function(e) {
//    window.scrollTo(0,document.body.scrollHeight);
//
//   // document.getElementById("review").scrollIntoView(true)
////
//});




// let element = document.getElementById("submit_review_form").onsubmit = function() //{myFunction()};
//    function myFunction() {
//  alert("The form was submitted");
//}

// let myModal = document.getElementById('myModal')
// let myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })