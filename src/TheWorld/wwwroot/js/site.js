(function () {

    var $sidebarAndWrapper = $("#sidebar, #wrapper");
    var $icon = $("#sidebarToggle i.fa");
    $("#sidebarToggle").on("click", function() {
        $sidebarAndWrapper.toggleClass("hide-sidebar");
        if($sidebarAndWrapper.hasClass("hide-sidebar")) {
            $icon.addClass("fa-angle-right");
            $icon.removeClass("fa-angle-left");
        } else {
            $icon.removeClass("fa-angle-right");
            $icon.addClass("fa-angle-left");
        }
    });

})();