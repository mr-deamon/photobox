var file = "";
var resetTimer;

function initTimer() {
    resetTimer = window.setTimeout(function () {
        $("#first").show();
        $("#second").hide();
        $(".glyphicon").show();

        $(".bg").css("background-image", "url('http://" + ip + "/pics/background1.jpg')");
        $(".pagebg-container").removeClass("nobg").addClass("bg");
        /*}, 120000)*/
    }, 180000)
}

var pics = new ReconnectingWebSocket('ws://' + ip + ':80/filewatch.rb', null, {
    debug: true,
    reconnectInterval: 3000
});
pics.onmessage = function (event) {
    file = event.data.replace(/['"]+/g, '');
    display(file);
};
var comm = new ReconnectingWebSocket('ws://' + ip + ':80/comm.rb', null, {
    debug: true,
    reconnectInterval: 3000
});

function addClassDelayed(jqObj, c, to) {
    setTimeout(function () {
        jqObj.addClass(c);
    }, to);
}


display = function (image) {
    /*$("#second").show();
    $("#first").hide();*/
    $(".pagebg-container").removeClass("nobg").addClass("bg");
    $(".bg").css("background-image", "url('http://" + ip + "/tmp/" + file + "')");

}

shoot = function () {
    $(".glyphicon").hide();
    $(".countdown").show();
    var timeleft = 6;
    var downloadTimer = setInterval(function () {
        timeleft = timeleft - 1;
        $(".countdown").html(timeleft - 1);

        if (timeleft == 3) {
            comm.send("shoot");
        };
        if (timeleft <= 1) {
            addClassDelayed($(".pagebg-container"), "nobg", 500);
            $(".pagebg-container").removeClass("bg");
            clearInterval(downloadTimer);
            $(".light").addClass("light-active");
            var flash = setTimeout(function () {
                $(".light").removeClass("light-active");
                $("#second").fadeIn(300);

            }, 500);
            $(".countdown").hide();
            $(".circle").removeClass("animate");
            $("#first").hide();

        }
    }, 1000);
}

$(document).ready(function () {
    initTimer();
    $(".camera").on("click", function (a) {
        $(".circle").addClass("animate");
        shoot();
    });
    $(".print").on("click", function (b) {
        comm.send("print," + file);
        $(".print i").removeClass("el-print").addClass("el-check");
        $(".glyphicon").show();
        $("#second").fadeOut(4000, function () {
            $("#first").fadeIn(400);
            $(".print i").addClass("el-print").removeClass("el-check");
        });

    });
    $(".debug").on("click", function () {
        comm.send("resume");
        console.log("resume sent");
    });
    $(".repeat").on("click", function (a) {
        $("#second").hide();
        $("#first").show();
        $(".circle").addClass("animate");
        $(".countdown").show().html("5")
        shoot();
    });
    $("*").on("click", function (c) {
        console.log("timer reseted");
        clearTimeout(resetTimer);
        initTimer();
    })

})
