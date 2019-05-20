$("#button-find").click(function() {
    $('html, body').animate({
        scrollTop: $("#restaurants").offset().top
    }, 1500);
});

$('#total').val(0)

if($('#total').val() == 0) {
    $('#lanjut').attr("disabled", true);
} else {
    $('#lanjut').attr("disabled", false);
}

let orderMenuId = []

function pilihRestaurant(id){
    $('#restaurant_id').val(id);
}

function pilihMenu(id, harga){

    var nama = $("#namamenu_"+String(id)).text()

    if(orderMenuId.find(e => e == id) !== undefined){
        $('#menuId_'+id).val( parseInt($('#menuId_'+id).val()) + 1);
        $('#hargaMenuId_'+id).val( parseInt($('#menuId_'+id).val()) * harga)
        $('#total').val( parseInt($('#total').val()) + harga )

        $('.preview-total-price').text($('#total').val())

    } else {
        $('#tambah_'+id).css("display","none");
        $('#tambah_kurang_'+id).css("display","inline-block");
        orderMenuId.push(id);
        $('#dynamicField').append(
            "<br><input type='hidden' name='menu_restaurant_id[]' value='"+id+"' id='menuRestaurantId_"+id+"'/>"+ 
            "<input type='hidden' name='amount[]' value=1 id='menuId_"+id+"'/>"+
            "<input type='hidden' name='sub_total[]' value="+harga+" id='hargaMenuId_"+id+"'/>"+
            "<br>"
        )

        $('#dynamicTable').append(
            "<tr id='tabletr_" +id + "'>"+
                "<td style='vertical-align: middle'>"+
                    "<h5 style='font-size: 15px !important;'>"+nama+"</h5>"+
                "</td>"+
                "<td style='vertical-align: middle'>"+
                    "<div class='input-group' style='width: 120px;'>"+
                        "<span class='input-group-btn'>"+
                            "<button type='button' class='btn btn-default btn-number btn-number"+id+"' data-type='minus' data-field='popupjumlah_"+id+"'>"+
                                "-"+
                            "</button>"+
                        "</span>"+
                        "<input type='text' name='popupjumlah_"+id+"' class='form-control input-number' value='1' min='1' max='10' id='asd"+id+"'>"+
                        "<span class='input-group-btn'>"+
                            "<button type='button' class='btn btn-default btn-number"+id+"' data-type='plus'  data-field='popupjumlah_"+id+"'>"+
                                "+"+
                            "</button>"+
                        "</span>"+
                    "</div>"+
                "</td>"+
                "<td style='vertical-align: middle'>"+
                    "<div id='hargaMenu_"+id+"' style='margin: auto'>" + harga + "</div>"+
                "</td>"+
                "<td style='vertical-align: middle'>"+
                    "<button type='button' onclick='hapusMenu("+id+","+harga+")' class='close' style=''>"+
                        "&times;"+
                    "</button>"+
                "</td>"+
            "</tr>"
        )
        test(".btn-number"+id, "#asd"+id);

        $('#total').val( parseInt($('#total').val()) + harga )

        $('.preview-total-price').text($('#total').val());

        if($('#total').val() == 0) {
            $('#lanjut').attr("disabled", true);
        } else {
            $('#lanjut').attr("disabled", false);
        }
    }
}

function hapusMenu(id, harga){
    orderMenuId.splice( orderMenuId.indexOf('id'), 1 );

    $('#menuRestaurantId_'+id).remove()
    $('#menuId_'+id).remove()
    $('#hargaMenuId_'+id).remove()
    $('#tabletr_'+id).remove()
    $('#total').val( parseInt($('#total').val()) - harga * parseInt($("input[name=jumlah_"+id+"]").val() - 1) )
    $('.preview-total-price').text($('#total').val());

    $("input[name=jumlah_"+id+"]").val(1);
    document.getElementById('__'+id).click();

}


//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$(document).on('click', '.btn-number', function(e) {
    
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            if(currentVal == 1){
                let id = fieldName.substr(fieldName.indexOf('_')+1);
                let harga = parseInt($('#harga_'+id).attr('data-harga'));
                
                orderMenuId.splice( orderMenuId.indexOf('id'), 1 );

                $('#menuRestaurantId_'+id).remove()
                $('#menuId_'+id).remove()
                $('#hargaMenuId_'+id).remove()
                $('#tabletr_'+id).remove()

                $('#total').val( parseInt($('#total').val()) - harga )
                $('.preview-total-price').text($('#total').val());

                $('#tambah_'+id).css("display","block");
                $('#tambah_kurang_'+id).css("display","none");
            }
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
                let id = fieldName.substr(fieldName.indexOf('_')+1);
                let harga = parseInt($('#harga_'+id).attr('data-harga'));

                $('#menuId_'+id).val( parseInt($('#menuId_'+id).val()) - 1);
                $('#hargaMenuId_'+id).val( parseInt($('#menuId_'+id).val()) * harga)
                $('#hargaMenu_'+id).html( parseInt($('#menuId_'+id).val()) * harga)
                $('#total').val( parseInt($('#total').val()) - harga )
                $("input[name=jumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))
                $("input[name=popupjumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))

                $('.preview-total-price').text($('#total').val())

                // $('#tabletr_'+id+' > td:nth-child(2)').text($('#menuId_'+id).val())
                // $('#tabletr_'+id+' > td:nth-child(3)').text(parseInt($('#menuId_'+id).val()) * harga)
            }
            // if(parseInt(input.val()) == input.attr('min')) {
            //     $(this).attr('disabled', true);
            // }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                let id = fieldName.substr(fieldName.indexOf('_')+1);
                let harga = parseInt($('#harga_'+id).attr('data-harga'));
                

                $('#menuId_'+id).val( parseInt($('#menuId_'+id).val()) + 1);
                $('#hargaMenuId_'+id).val( parseInt($('#menuId_'+id).val()) * harga)
                $('#hargaMenu_'+id).html( parseInt($('#menuId_'+id).val()) * harga)
                $('#total').val( parseInt($('#total').val()) + harga )

                $("input[name=jumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))
                $("input[name=popupjumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))

                $('.preview-total-price').text($('#total').val())

                // $('#tabletr_'+id+' > td:nth-child(2)').text($('#menuId_'+id).val())
                // $('#tabletr_'+id+' > td:nth-child(3)').text(parseInt($('#menuId_'+id).val()) * harga)
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});


$('.input-number').focusin(function(){
    $(this).data('oldValue', $(this).val());
    });
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue -1) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
            // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});



function test(id,id2){
    $(id).click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");

    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            if(currentVal == 1){
                let id = fieldName.substr(fieldName.indexOf('_')+1);
                let harga = parseInt($('#harga_'+id).attr('data-harga'));
                
                orderMenuId.splice( orderMenuId.indexOf('id'), 1 );

                $('#menuRestaurantId_'+id).remove()
                $('#menuId_'+id).remove()
                $('#hargaMenuId_'+id).remove()
                $('#tabletr_'+id).remove()

                $('#total').val( parseInt($('#total').val()) - harga )
                $('.preview-total-price').text($('#total').val());

                $('#tambah_'+id).css("display","block");
                $('#tambah_kurang_'+id).css("display","none");
            }
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
                let id = fieldName.substr(fieldName.indexOf('_')+1);
                let harga = parseInt($('#harga_'+id).attr('data-harga'));

                $('#menuId_'+id).val( parseInt($('#menuId_'+id).val()) - 1);
                $('#hargaMenuId_'+id).val( parseInt($('#menuId_'+id).val()) * harga)
                $('#hargaMenu_'+id).html( parseInt($('#menuId_'+id).val()) * harga)
                $('#total').val( parseInt($('#total').val()) - harga )
                $("input[name=jumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))
                $("input[name=popupjumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))

                $('.preview-total-price').text($('#total').val())

                // $('#tabletr_'+id+' > td:nth-child(2)').text($('#menuId_'+id).val())
                // $('#tabletr_'+id+' > td:nth-child(3)').text(parseInt($('#menuId_'+id).val()) * harga)
            }
            // if(parseInt(input.val()) == input.attr('min')) {
            //     $(this).attr('disabled', true);
            // }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                let id = fieldName.substr(fieldName.indexOf('_')+1);
                let harga = parseInt($('#harga_'+id).attr('data-harga'));

                $('#menuId_'+id).val( parseInt($('#menuId_'+id).val()) + 1);
                $('#hargaMenuId_'+id).val( parseInt($('#menuId_'+id).val()) * harga)
                $('#hargaMenu_'+id).html( parseInt($('#menuId_'+id).val()) * harga)
                $('#total').val( parseInt($('#total').val()) + harga )
                
                $("input[name=jumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))
                $("input[name=popupjumlah_"+id+"]").val(parseInt($('#menuId_'+id).val()))

                $('.preview-total-price').text($('#total').val())

                // $('#tabletr_'+id+' > td:nth-child(2)').text($('#menuId_'+id).val())
                // $('#tabletr_'+id+' > td:nth-child(3)').text(parseInt($('#menuId_'+id).val()) * harga)
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$(id2).focusin(function(){
    $(this).data('oldValue', $(this).val());
    });
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue -1) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(id2).keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
            // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
}

