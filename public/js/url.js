var APP = (function() {

    var _init = function() {
        _bindEvents();
    };

    var _bindEvents = function() {
        $('#form_shorten').on('submit', function(e) {
            e.preventDefault();
            var url = $.trim($('.text-url').val());
            console.log(url);
            $.ajax({
                url: '/shorten',
                type: 'POST',
                data: {
                    url: url
                },
                success: function(data) {
                    console.log(data);
                    var _buildUrl = window.location.origin + data.hash;
                    $('.shortened-url').val(_buildUrl);
                    $('#shorten_area').removeClass('hide').show();
                }
            })
        });

        $('.shortened-url').on('click', function(e) {
            e.preventDefault();
            $(this).select();
            document.execCommand('copy');

            $(".inline-text").html("Text Copied to Clipboard !!");

        });

        // $("#copy_url").click(function() {
        //     let text = $('.shortened-url').text();
        //     console.log(text);
        //     var input = document.createElement('input');
        //     // input.value = text;
        //     input.setAttribute("id", "copy_url_input");
        //     /* Get the text field */
        //     var copyText = document.getElementById("copy_url_input");
        //     console.log(copyText);

        //     /* Select the text field */
        //     copyText.select();
        //     copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        //     /* Copy the text inside the text field */
        //     document.execCommand("copy");

        //     /* Alert the copied text */
        //     alert("URL Copied to clipboard");

        // })
    };

    return {
        init: _init
    };

})();

$(function() {
    APP.init();
});