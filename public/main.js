

document.querySelector('#email-checkbox').addEventListener( 'change', e => {
        document.querySelector('#email-div').style.display = e.target.checked ? 'block':'none'
})




document.querySelector('#whatsapp-checkbox').addEventListener( 'change', e => {
        document.querySelector('#whatsapp-div').style.display = e.target.checked ? 'block':'none'
})


document.querySelector('#price-range').addEventListener('change', e => {
    document.querySelector('#price-display').innerHTML = "Rs. " + e.target.value;
    document.querySelector('#price-display').style.visibility = 'visible';
})




document.querySelector('#submit-button').addEventListener('click', e=> {
    e.preventDefault();

    let message = "";
    let notChecked = 0;

    if (!document.querySelector('#email-checkbox').checked){
        notChecked++;
        document.querySelector('#email').value =""
    }

    if (!document.querySelector('#whatsapp-checkbox').checked){
        notChecked++;
        document.querySelector('#whatsapp').value =""

    }



    let email = document.querySelector('#email').value.trim();
    let url = document.querySelector('#url').value.trim();
    let whatsapp = document.querySelector('#whatsapp').value.trim();


    if(!url){
        message = '* Enter valid url'
    }

   

    else if(notChecked == 2 ){
        message = '* Enter atleast one notification method'
    }

    else if(email && !(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
        message = '* Enter valid email'
    }


    else if(whatsapp && !(/^[0-9]{10,13}$/.test(whatsapp))){
        message = '* Enter valid phone whatsapp number'
    }


    
    else{
        console.log("submitting")
        document.getElementById("form").submit()
    }

    document.getElementById('submit-warning').innerHTML = message
})