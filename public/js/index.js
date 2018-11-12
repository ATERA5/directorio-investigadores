
$(document).ready(() => {    
    $('#logInButton').click(function(event){
        event.preventDefault();
        var form = $('#logInForm');
        sendFormData(form);
    });
});

function sendFormData(form){
    var url = form.attr("action");
    var formData = {};
    $(form).find("input[name]").each(function (index, node) {
        formData[node.name] = node.value;
    });
    $.post(url, formData).done(function (data) {
        alert(data);
    });
}