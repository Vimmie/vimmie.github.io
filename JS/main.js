//Check that the DOM has loaded - if statement
if(document.readyState == 'loading')
    {
        document.addEventListener('DOMContentLoaded', ready)
    }
else
   {
       ready()
   }

//Event listeners - to process defined events
//Ready function
function ready() 
{
    var removeItems = document.getElementsByClassName('btnRed')

console.log(removeItems)
 //For loop - to loop through all the buttons
 for (var i = 0; i < removeItems.length; i++)
 {
      var button = removeItems[i]  
      //"Listening" out for mouse click
      button.addEventListener('click', removeCartItem)      
 }
    
    var quantityInputs = document.getElementsByClassName('cartInput')
    for (var i = 0; i < quantityInputs.length; i++)
    {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    var addToCartButtons = document.getElementsByClassName('itemButton')
    for (var i = 0; i < addToCartButtons.length; i++)
    {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    
    document.getElementsByClassName('btnPurchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked()
{   //Alert - to inform user of their successful purchase
    alert('Thank you for your purchase')
    var cart_Items = document.getElementsByClassName('cartItems')[0]
    while (cart_Items.hasChildNodes())
    {
        cart_Items.removeChild(cart_Items.firstChild)
    }
    
//calling the updateTotal function
    updateTotal()
}

//To remove items from the shopping cart if requested by the user
function removeCartItem(event)
{
    var buttonClicked = event.target
   buttonClicked.parentElement.parentElement.remove()
   updateTotal()
}

//If statement to check whether the quantity value is valid
function quantityChanged(event)
{
    var input = event.target
    
    if (isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }
    
    //Calling the updateTotal function
    updateTotal()
}

function addToCartClicked(event)
{
    var button = event.target
    var shopItem = button.parentElement.parentElement
    
    //Title, price & image source variables
    var title = shopItem.getElementsByClassName('shopTitle')[0].innerText
    
    var price = shopItem.getElementsByClassName('shopPrice')[0].innerText
    
    var imageSource =shopItem.getElementsByClassName('shopImage')[0].src
    
    addItemToCart(title, price, imageSource)
    updateTotal()
}

//addItemToCart function - requires three parameters
function addItemToCart (title, price, imageSource)
{
    //Creating a new div element to add to cartItems
    var cartRow = document.createElement('div')
    cartRow.classList.add('cartRow')
    
    
    var cartItems = document.getElementsByClassName('cartItems')[0]
    
    var cartRowContents = `
    <div class="cartItem cartColumn"> 
       <img class="cartImage" src="${imageSource}" width="100" height="100">
       <span class="cartTitle"> ${title} </span>
    </div>
    
    <span class="cartPrice cartColumn"> ${price} </span>
    
    <div class="cartQuantity cartColumn">
     <input class="cartInput" type="number" value="1">
     <button class="btn btnRed" type="button"> Remove </button>
    </div>`
    
    cartRow.innerHTML = cartRowContents
    
    //Append cartRow to end of cartItems
    cartItems.append(cartRow)
    
    //Adding event listeners to the new document elements
    cartRow.getElementsByClassName('btnRed')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cartInput')[0].addEventListener('change', quantityChanged)
}


function updateTotal()
{
    var cartItem = document.getElementsByClassName('cartItems')[0]
    
    var cartRows = cartItem.getElementsByClassName('cartRow')
    
    var total = 0
    
    for (var i = 0; i < cartRows.length; i++)
     {
         var cartRow = cartRows[i]
         var priceElement=cartRow.getElementsByClassName('cartPrice') [0]
         
         var quantityElement = cartRow.getElementsByClassName('cartInput')[0]
         
         var price = parseFloat(priceElement.innerText.replace('£',''))
         
         var quantity = quantityElement.value
         console.log(price * quantity)
         
         //calculating the total price for the user
         total = total + (price * quantity)
     }
    
    //Display the final price
    document.getElementsByClassName('totalPrice')[0].innerText = '£' + total

}