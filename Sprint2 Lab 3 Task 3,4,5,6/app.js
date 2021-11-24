const Url = "http://18.220.85.60/api/";


function fetchProductList() {
    jsonObj = [];
    item = {};
    var productList;
    var productListAdd;

    !($.trim($('#title').val()) == '') ? item ["title"] = $('#title').val(): '';
    !($.trim($('#operating_system').val()) == '') ? item ["operating_system"] = $('#operating_system').val(): '';
    !($.trim($('#min_price').val()) == '') ? item ["price_from"] = $('#min_price').val(): '';
    !($.trim($('#max_price').val()) == '') ? item ["price_to"] = $('#max_price').val(): '';

    jsonObj.push(item);

    $.ajax({
        url: Url+'GetProduct',
        type: 'get',
        dataType: 'json',
        contentType: 'text/plain',
        data: jsonObj[0],

        success: function (data) {
            productList='';

            $.each(data['data']['List'], function(i, item) {

                productListAdd = '<div class="col-sm-6 col-md-4 col-lg-3 mt-4" id="product'+item['id']+'">\n' +
                    '            <div class="card card-inverse card-info">\n' +
                    '                <img class="card-img-top" src="'+item['image']+'">\n' +
                    '                <div class="card-block">\n' +
                    '                    <h4><span class="badge badge-danger">'+item['price']+'</span></h4>\n' +
                    '                    <div class="meta card-text">\n' +
                    '                        <a style="color: deepskyblue">Category - Cell Phones</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-text">\n' +
                    '                        '+item['title'].substring(0,50)+'... more\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <small>More information ...</small>\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="fetchOneProduct('+item['id']+')">Detail</button>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="addToCart('+item['id']+')">Add to Cart</button>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>';
                productList=productList+productListAdd;

            });
            $('#items').html(productList);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }

    });
}

function fetchOneProduct($id) {

    // Make Variables for item and product
    var item;
    var product;

    // Create ajax request to API
    $.ajax({
        url: Url + 'GetOneProduct',    // http://18.220.85.60/api/GetOneProduct
        type: 'GET',                 // GET request
        dataType: 'json',            // JSON data type
        data: {"product_id" : $id},    // input = {"product_id":$id}
        contentType: 'text/plain',   // Output type = plain text

        // On success do this
        success: function (data) {

            // Get data from request
            $.each(data['data']['List'], function(i, item) {

                // Get product details and add HTML to it to be rendered (HTML from fetchProductList() function)
                product = '<div class="col-sm-6 col-md-4 col-lg-3 mt-4" id="product' + item['id'] + '">\n' +
                    '            <div class="card card-inverse card-info">\n' +
                    '                <img class="card-img-top" src="' + item['image'] + '">\n' +
                    '                <div class="card-block">\n' +
                    '                    <h4><span class="badge badge-danger">' + item['price'] + '</span></h4>\n' +
                    '                    <div class="meta card-text">\n' +
                    '                        <a style="color: deepskyblue">Category - Cell Phones</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-text">\n' +
                    '                        ' + item['title'] + '\n'
                    '                    </div>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <small>More information ...</small>\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="fetchOneProduct(' + item['id'] + ')">Detail</button>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="addToCart(' + item['id'] + ')">Add to Cart</button>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>';
            });  // End Function

            // Put Product on website
            $('#items').html(product);

        },

        // On fail alert user
        error: function (data) {
            alert("Error while fetching data.");
        }

    });
}

function fetchComments($id) {
    var comment;
    var commentAdd;

    $.ajax({
        url: Url+'GetProductComment',
        type: 'get',
        dataType: 'json',
        data: {"product_id":$id},
        contentType: 'text/plain',
        success: function (data) {
            comment='';
            comment='<div class="panel panel-default" style="width:800px">\n' +
                '            <div class="panel-heading">\n' +
                '                <span class="glyphicon glyphicon-comment"></span>\n' +
                '                <h3 class="panel-title">\n' +
                '                    Comments</h3>\n' +
                '            </div>\n' +
                '            <div class="panel-body">\n' +
                '                <ul class="list-group">\n';
            $.each(data['data']['List'], function(i, item) {
                commentAdd ='                    <li class="list-group-item">\n' +
                    '                        <div class="row">\n' +
                    '                            <div class="col-xs-2 col-md-2">\n' +
                    '                                <img src="img/comment.png" class="img-circle img-responsive" alt="" /></div>\n' +
                    '                            <div class="col-xs-10 col-md-10">\n' +
                    '                                <div><p>'+item['comment']+'</p></div>\n' +
                    '                                <br/>\n' +
                    '                                <div><h5 style="color: red"> Score: '+item['score']+'</h5></div>\n' +
                    ' <div class="progress">\n' +
                    '  <div class="progress-bar" role="progressbar" aria-valuenow="'+item['score']+'"\n' +
                    '  aria-valuemin="0" aria-valuemax="5" style="width:'+(item['score']/5)*100+'%">\n' +
                    '  </div>\n' +
                    '</div>\n' +
                    '                            </br>\n' +
                    '                        </div>\n' +
                    '                    </li>';
                comment=comment+commentAdd;
            });
            comment=comment+'</ul></div></div>'
            $('#comment-list').html(comment);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

// THIS FUNCTION USES OUR FUNCTION
function setComment($id) {

    var message =$('#message-text').val();
    var score =$('#score').val();

    $.ajax({
        url: Url+'SetComment',
        type: 'post',
        dataType: 'json',
        cache: true,
        async: true,
        global: false,
        data: JSON.stringify({"product_id": $id,"comment": message,"score": score}),
        contentType: 'text/plain',
        success: function (data) {
            $('#exampleModal').modal('hide');
            fetchOneProduct($id);
        },
        error: function (data) {
            alert("Outlet Creation Failed, please try again.");
        }

    });

}
function addToCart($id) {
    // Validation function (toShoppingCart)
    let email =$.trim($('#email').val());
    console.log(email);
    if( email !='' ) {
        sessionStorage.setItem('email', email);
        window.location.href = './cart.html';

        // Create ajax request to API
        $.ajax({
            url: Url+'AddToCart',    // http://18.220.85.60/api/AddToCart
            type: 'POST',            // GET request
            dataType: 'json',        // JSON data type
            cache: true,
            async: true,
            global: false,           // input = product id and email
            data: JSON.stringify({"product_id": $id,"email": email}),
            contentType: 'text/plain',   // Output type = plain text
        });
    } else {
        alert("Please enter your email at top of page.");
    }
}

// function addToCart($id) {
//     // function body
//     var product_id;
//     var email = $.trim($('#email').val());
//     if( email !='' ) {
//         sessionStorage.setItem('email', email);
//         window.location.href = './cart.html';
//         $.ajax({
//             url: Url + 'AddToCart',
//             type: 'POST',
//             dataType: 'json',
//             data: {'product_id': $id, 'email' : email},
//             contentType: 'text/plain',
    
//             success: function (data) {
//                 fetchOneProduct($id);
//             },
//             error: function (data) {
//                 alert("Error while fetching data.");
//             }
//         });
    
//     } else {
//         alert("Please enter your email at top of page.");
//     }
    
// }

    


function toShoppingCart(){
    let email =$.trim($('#email').val());
    if( email !='' ) {
        sessionStorage.setItem('email', email);
        window.location.href = './cart.html';
    } else {
        alert("Please enter your email at top of page.");
    }
}

$('#exampleModal').on('show.bs.modal', function (event) {
    $('#ajaxForm').trigger("reset");
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('#btnSave').off().click(function () {
        setComment(recipient);
    });
});