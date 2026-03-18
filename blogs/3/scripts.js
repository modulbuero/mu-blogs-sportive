(($) => {

/** ************************************
	Init the Functions
*/
$(document).ready(()=>{
    closeWerbebannerClose()
    closeWerbebannerClose('.werbebanner-fluss')
    //closeWerbebannerPopup()
})

function closeWerbebannerClose(selector = ".werbebanner-fixed"){
    
    $(selector + ' p').on('click', function(){
        $(selector).fadeOut()
    })
}

function closeWerbebannerPopup(){
    let banner = ".werbebanner-popup"
    $(banner).on('click', function(){
        $(banner).fadeOut()
    })

    setTimeout(function(){
        $(banner).fadeIn({
            duration: 400,
            start: function() {
                $(this).css('display', 'flex');
            }
        })
    },4000)
    
    
}

})(jQuery)