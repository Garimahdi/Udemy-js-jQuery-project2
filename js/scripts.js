
var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: at least 1.000 units - 20% discount
    // 2: at least 500 units - 12% discount
    // 3: at least 100 units - 5% discount


// Solution:

$(function(){

    function search_param_updater(){
        // 1) Fill the quantity value in search_params dict
        search_params['quantity'] = parseInt($('#quantity').val());

        // 2) Fill the color value in search_params dict
        search_params['color'] = $('#color .option-button.selected').attr('id');

        // 3) Fill the quality value in search_params dict
        search_params['quality'] = $('#quality .option-button.selected').attr('id');

        // 4) Fill the style value in search_params dict
        search_params['style'] = $('#style').val();

        order_details();
    }

    function order_details(){

        // Loading after a change
        let refreshLoader = $('.refresh-loader').show();

        // Fill the detail on tshirt style
        let styleParams = '#style option[value = "'+search_params['style']+'"]';
        $('#result-style').html($(styleParams).text());

        // Fill the detail on tshirt quality
        let qualityParams = '#'+search_params['quality'];
        $('#result-quality').html($(qualityParams).text());

        // Fill the detail on tshirt color
        let colourParams = '#'+search_params['color'];
        $('#result-color').html($(colourParams).text());

        // Fill the detail on tshirt quantity
        $('#result-quantity').html(String(search_params['quantity']));

        // Fill the tshirt price
        $('#total-price').html(price_calc());

        // Put the picture on it
        let productImg = products[search_params['color']][search_params['style']]['photo'];
        $('#photo-product').attr('src','./img/'+productImg);

        // Loading timeout after change
        window.setTimeout(function(){
            $('.refresh-loader').css('display','none')
        },500);
    }

    // Make formula for price calculation
    function price_calc(){
        let productPrice = products[search_params['color']][search_params['style']]['unit_price'];
        let total = productPrice*search_params['quantity'];

        if(search_params['quality'] == 'q190'){
            total *= 1.12;
        }

        if(search_params['quantity'] >= 1000){
            total *= 0.8;
        }else if(search_params['quantity'] >= 500){
            total *= 0.88;
        }else if(search_params['quantity'] >= 100){
            total *= 0.95;
        }

        return (' '+total.toLocaleString('en-US',{style:'currency',currency:'USD'}).slice(1,));
    }

    // Default setting
    search_param_updater();

    // Modifying the setting
    $('#quantity').change(function(){
        // Overwrite the variable value
        search_params['quantity'] = $('#quantity').val();
        search_param_updater();
        console.log(search_params);
    })

    $('#color .option-button').click(function(){
        $('#color .option-button').toggleClass('selected');
        search_params['color'] = $('#color .option-button.selected').attr('id');
        //console.log(search_params['color']);
        search_param_updater();
        console.log(search_params);
    })

    $('#quality .option-button').click(function(){
        $('#quality .option-button').toggleClass('selected');
        search_params['quality'] = $('#quality .option-button.selected').attr('id');
        search_param_updater();
        console.log(search_params);
    })

    $('#style').change(function(){
        //console.log($('#style').val());
        search_params['style'] = $('#style').val();
        search_param_updater();
        console.log(search_params);
    })
});

// Project sidenote: Never delay the process on the front-end. This is just a simulation