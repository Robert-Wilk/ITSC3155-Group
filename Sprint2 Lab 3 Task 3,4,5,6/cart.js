let list;
let listAdd;
let itemCount;
let totalPrice;
let itemList;

let email = sessionStorage.getItem('email');

getCart(email);

function getCart($email) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: {"email":$email},
        contentType: 'text/plain',
        success: function (data) {

            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;

            // raw items
            itemList = [];

            $.each(data['data']['List'], function (i, item) {
                listAdd = '<div class="row main align-items-center">\n' +
                    '                        <div class="col-2"><img class="img-fluid" src="' + item['image'] + '"></div>\n' +
                    '                        <div class="col">\n' +
                    '                            <div class="row text-muted">' + item['operating_system'] + '</div>\n' +
                    '                            <div class="row">' + item['title'] + '</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col"> <a class="border">1</a></div>\n' +
                    '                        <div class="col">&dollar; ' + item['money_price'] + ' <a onclick="deleteItem(' + item['id'] + ')" type="button">&#10005;</a></div>\n' +
                    '                    </div>';
                list = list + listAdd;

                // Push item onto list
                itemList.push(item);
                itemCount++;
                totalPrice += parseInt(item['money_price']);
            });

            $('#cart-list').html(list);
            $('#item-count').html(itemCount + ' items');
            $('#item-total').html(itemCount + ' items');
            $('#item-price').html('&dollar; ' + totalPrice);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function deleteItem($id) {
    //function body
    $.ajax({
        url: Url + 'Cart/' + $id,
        type: 'delete',
        dataType: 'json',
        data: {"email":email},
        contentType: 'text/plain',
        success: function (data) {
            itemCount = itemCount - 1;
            getCart(email);
            alert("Item has been deleted.");
        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });

}

function checkOut() {
    // Function body
    // Check to make sure user is buying valid amount of products
    if (itemCount > 0) {
        $.ajax({
            url: Url + 'Cart',
            type: 'put',
            dataType: 'json',
            data: {"email": email},
            contentType: 'text/plain',
            success: function (data) {
                alert('Order Successful: Order details are sent to ' +email+ '\n');

                // Delete items in cart (make it look like items were bought)
                itemList.forEach(fakeCheckOut);
                itemCount = 0;

            },
            error: function (data) {
                alert("Error while fetching data.");
            }
        });
    } else {
        alert("Error: No items in cart!");
    }
}
// Function that deletes the items from the cart without alerting the user
function fakeCheckOut(item) {
    // deleteItem function but without an alert on success
    $.ajax({
        url: Url + 'Cart/' + item.id,
        type: 'delete',
        dataType: 'json',
        data: {"email":email},
        contentType: 'text/plain',
        success: function (data) {
            getCart(email);
        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}