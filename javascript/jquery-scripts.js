// ~ASSIGNMENT 9 PLAN~
// implement jquery on all pages using CDN
// shift vanilla javascript link to html head
// search hover/mouse-over effect functions to fancy up dog tiles
// refactor form and console logging using jquery selectors
// create variable to store cart total
// add up cart total based on number of adopt button clicks

$(function(){
  //hover effect for dog tiles
  $('.tile').mouseenter(function() {
    $(this).css("box-shadow", "5px 5px 5px -3px #093C60, 0px 5px 10px #093C60, -5px 5px 5px -3px #093C60");
    $(this).find('h3').animate({'font-size': '160%'},'medium');
  }).mouseleave(function() {
    $(this).css("box-shadow", "5px 5px 5px -3px #E6E6E6, 0px 5px 10px #E6E6E6, -5px 5px 5px -3px #E6E6E6");
    $(this).find('h3').animate({'font-size': '120%'},'medium');
  })

  //hover effect for Adopt button
  $('.tile-link').mouseenter(function() {
    $(this).css("background-color", "#618f28");
  }).mouseleave(function() {
    $(this).css("background-color", "#81B741");
  })

  //click event for dog tiles
  $('.tile').on("click",function() {
    $(this).css("box-shadow", "5px 5px 5px -3px #81B741, 0px 5px 10px #81B741, -5px 5px 5px -3px #81B741");
  })

  //refactor form submission
  function validateEmail(email) {
    const checkFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return checkFormat.test(email);
  }

  $('.submit').on("click",function(){
    event.preventDefault();

    let formValues = $('.form-entry')
    for (i = 0; i < formValues.length; i+=1) {
      if (formValues[i].type == 'radio') {
      //   //let radioCheck = $('input.radio-style');
      //   //console.log(radioCheck.length);
        let selection = $('input[name="first-time-adopter"]').filter(":checked").val();
        if (selection === undefined) {
          alert('Please indicate if this is your first time adopting.');
          console.log(`Loop broken because user did not complete ${formValues[i].name} field`);
          return;
        }
        else {
          let logOutput = `${formValues[i].name}: ${selection}`;
          console.log(logOutput);
        }
      }
      else {
        if (formValues[i].value == "" || formValues[i].value == "{blank}") {
          alert(`Please complete the ${formValues[i].name} field`);
          console.log(`Loop broken because user did not complete ${formValues[i].name} field`);
          return;
        }
        else {
          if (formValues[i].type == 'email') {
            if (validateEmail(formValues[i].value) == true) {
              console.log('**User entered a valid email address**');
            }
            else {
              alert('The email address you entered is invalid. Please enter again.');
              return;
            }
          }
          else {
            let logOutput = `${formValues[i].name}: ${formValues[i].value}`;
            console.log(logOutput);
          }
        }
      }
    }
    alert('Thank you. The form information has been received.');
    $('form')[0].reset();
  })

  //KEEPING A RUNNING TOTAL FOR SHOPPING CART
  //set variables
  let cartTotal = 0;
  const dogPrice = 123.45;

  //set cart total to $0 on page load
  document.getElementById('cartDisplay').innerHTML = `$${cartTotal.toFixed(2)}`;

  //click handler function runs when user clicks 'Adopt' button
  $('button').on("click",function(){
    event.preventDefault();

    cartTotal += dogPrice;
    document.getElementById('cartDisplay').innerHTML = `$${cartTotal.toFixed(2)}`;
    console.log(`The current checkout total is: $${cartTotal.toFixed(2)}`);
  })
})
