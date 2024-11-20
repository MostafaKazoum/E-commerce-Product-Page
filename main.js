const list = document.querySelector(".list");
    const overlay = document.querySelector(".overlay");
    const sliderBtnsImg = document.querySelectorAll(".thumbnail img")
    const orderCount = document.getElementById("order")
    const minusBtn = document.querySelector(".minus")
    const plusBtn = document.querySelector(".plus")
    const addToCart = document.getElementById("Add-to-cart")
    const cartBtn = document.querySelector('.cart')
    const cartContainer = document.querySelector('.cart-container .content')
    const CheckoutBtn = document.querySelector('.checkout');
    const cartAmountIcon = document.querySelector(".amount");
    const nextImageBtn = document.querySelector(".next")
    const PrevImageBtn = document.querySelector(".prev")
    const previewImage = document.querySelector(".preview-img")
    const scaledSlider = document.querySelector(".slider-scaled")
    const scaledImg = document.querySelector(".slider-scaled .scaledImg")
    const closeScaledImg = document.querySelector(".slider-scaled .close")
    const prevScaledBtn = document.querySelector(".prevImg")
    const nextScaledBtn = document.querySelector(".nextImg")
    const scaledImgList = document.querySelectorAll(".scaled-thumbnail")
    const products = [
      {
      id: 0,
      title: "Autumn Limited Edition Sneakers",
      img: "./images/image-product-1-thumbnail.jpg",
      price: 125.00,
      amount: 0,
      
    }
  ]
  const Images = [{
    id: 0,
    image: "images/image-product-1.jpg" 
  },
  {
    id: 1,
    image: "images/image-product-2.jpg" 
  },
  {
    id: 2,
    image: "images/image-product-3.jpg" 
  },
  {
    id: 3,
    image: "images/image-product-4.jpg" 
  }


  ]
    let cartList = []

    addToCart.onclick = ()=>{
      const orderAmount = orderCount.value
      if(orderAmount.value == 0){
        return
      }
      const Item = {
      id: cartList.length,
      productId: 0,
      title: "Autumn Limited Edition Sneakers",
      img: "./images/image-product-1-thumbnail.jpg",
      price: 125.00,
      amount: orderAmount,
      }
      if(cartList.length != 0){
        for (const element of cartList) {
        if(element.productId == Item.productId){
          element.amount = parseInt(element.amount)+parseInt(Item.amount);
        }
        }
        DisplayItems();
      }else{
        cartList.push(Item);
        DisplayItems()
      }

    }
    CheckoutBtn.onclick = ()=>{
      cartList = [];
      DisplayItems()
      setTimeout(()=>{
        alert("Your Order Has Been Sent!")
      })
    }
    orderCount.onchange = ()=>{
      if(orderCount.value <= 0){
        orderCount.value = 0
        addToCart.classList.add("disable")
      }else if(orderCount.value >=99){
        orderCount.value = 99
      }else{
        addToCart.classList.remove("disable")

      }
    }
    
    previewImage.onclick = ()=>{
      scaledSlider.classList.toggle("hide")
    }
    closeScaledImg.onclick = ()=>{
      scaledSlider.classList.toggle("hide")
    }
    nextScaledBtn.onclick = ()=>{
      NextImage(scaledImg);
      console.log("click");
      
    }
    prevScaledBtn.onclick = ()=>{
      PrevImage(scaledImg)
      console.log("click");
      
    }
    scaledImgList.forEach(btn => {
      btn.onclick = (e)=>{
        e.target.classList.add("select");
        transition(scaledImg,`./images/image-product-${e.target.id}.jpg`)
        deslect(e.target);
      }
    });

    function deslect(target){
      for (const element of scaledImgList) {
        if(element.querySelector("img").id != target.id){
          element.querySelector("img").classList.remove("select")
        }
      }
    }
    function deleteItem(id){
      cartList.pop(cartList[id])
      DisplayItems()
    }

    function DisplayItems(){

      if(cartList.length == 0) {
        cartAmountIcon.classList.add("hide")
      }else{
        console.log(cartAmountIcon);
        
        cartAmountIcon.classList.remove("hide")
        if(cartList[0].amount >= 99){
          cartAmountIcon.innerHTML = 99
        }else{
          cartAmountIcon.innerHTML = cartList[0].amount
        }

      }
      

      if(cartList.length == 0){
      

        CheckoutBtn.classList.add("hide")
        cartContainer.innerHTML = `<h4 class="empthy-lable" >Your Cart Is Empthy</h4>`
        return
      }else{
        CheckoutBtn.classList.remove("hide")
      }

      const Items = cartList.map((item)=>{
        return  `<div id="${item.id}" class="item">
          <img src=${item.img} alt="" class="banner" />
          <div class="info">
            <h4 class="item-name">
              ${item.title}
            </h4>
            <div class="price-calc">
              <span class="old-price">
                $<span class="value">${item.price}</span>
              </span>
              <span>x</span>
              <span class="amount">${(item.amount >= 99) ? 99 : item.amount}</span>
              <span class="final-price">
                $<span class="final-value">${item.price * ((item.amount >= 99) ? 99 : item.amount)}</span>
              </span>
  
            </div>
          </div>
          <div onClick="deleteItem(${item.id})" class="remove">
            <img src="./images/icon-delete.svg" alt="" class="icon" />
          </div>
        </div>`
    }).join("")
    cartContainer.innerHTML = Items
    }


    function NextImage(img){
      for (const el of Images) {
        if(img.src.includes(el.image)){
          console.log(el.id + 1);
          
          if(el.id == 3){
            transition(img, Images[0].image)
            selectThaimbnail(1)
          }else{
            transition(img,Images[parseInt(el.id) + 1].image)
              selectThaimbnail(parseInt(el.id) + 2)
          }
          return
        }
      }
    }
    function PrevImage(img){
      for (const el of Images) {
        if(img.src.includes(el.image)){
          if(el.id == 0){
            
            transition(img, Images[3].image)
            selectThaimbnail(4)
          }else{
            
            transition(img,Images[parseInt(el.id) - 1].image)
            selectThaimbnail(parseInt(el.id))
          }
          return
        }
      }
    }
    function selectThaimbnail(id){
      for (const thambnail of scaledImgList) {
        if(thambnail.querySelector("img").id == id){          
          thambnail.querySelector("img").classList.add("select")
          deslect(thambnail.querySelector("img"))
        }
      }
    }
    function transition(img,src){
      img.style.opacity = "0"
        setTimeout(()=>{
          img.src = src
        img.style.opacity = "1"

        },250)
    }
    nextImageBtn.onclick = ()=>{
      NextImage(previewImage)
      console.log("click");
      
    }
    PrevImageBtn.onclick = ()=>{
      PrevImage(previewImage)
      console.log("click");
      
    }

    plusBtn.onclick = ()=>{
      orderCount.value++;
      addToCart.classList.remove("disable")
      if(orderCount.value >= 99){
        orderCount.value =99
        return
      }
    }

    cartBtn.onclick = (e)=>{
      cartContainer.parentElement.classList.toggle("hide")
      if(cartContainer.parentElement.classList.contains('hide')){
        cartBtn.querySelector("img").style.opacity = 0.5
      }else{
        cartBtn.querySelector("img").style.opacity = 1

      }
    }

    minusBtn.onclick = ()=>{
      orderCount.value -= 1;
      if(orderCount.value <= 0){
        addToCart.classList.add("disable")
        orderCount.value =0
        return
      }
    }




    sliderBtnsImg.forEach(btn => {
      btn.onclick = (e)=>{
        e.target.classList.add("select");
        transition(document.querySelector(".preview-img"),`./images/image-product-${e.target.id}.jpg`)
        sliderBtnsImg.forEach(el =>{
          if(el != e.target){
            el.classList.remove("select")
          }
        })
      }
    });
    

    const handleOpenList = () => {
      overlay.classList.toggle("hide");
      list.style.left = "0%";
    };

    const handleCloseList = () => {
      overlay.classList.toggle("hide");
      list.style.left = "-100%";
    };

    // Assign event listeners
    const listOpenButton = document.querySelector(".list-open");
    const closeListButton = document.querySelector(".close-list");

    if (listOpenButton) {
      listOpenButton.addEventListener("click", handleOpenList);
    }

    if (closeListButton) {
      closeListButton.addEventListener("click", handleCloseList);
    }