$(function() {
    var Mouth,myDate,FullYear;
    myDate = new Date();
    Mouth=myDate.getMonth();
    FullYear=myDate.getFullYear();

    var signFun = function() {
        //alert(Mouth);

        var dateArray = [1, 2, 4, 6]; // 假设已经签到的

        var $dateBox = $("#js-qiandao-list"),
            $currentDate = $(".current-date"),
            $qiandaoBnt = $("#js-just-qiandao"),
            _html = '',
            _handle = true;

        $currentDate.text(FullYear + '年' + parseInt(Mouth + 1) + '月' + myDate.getDate() + '日');

        var monthFirst = new Date(FullYear, parseInt(Mouth), 1).getDay();

        var d = new Date(FullYear, parseInt(Mouth + 1), 0);
        var totalDay = d.getDate(); //获取当前月的天数

        for (var i = 0; i < 42; i++) {
            _html += ' <li><div class="qiandao-icon"></div></li>'
        }
        $dateBox.html(_html);//生成日历网格

        var $dateLi = $dateBox.find("li");
        for (var i = 0; i < totalDay; i++) {
            $dateLi.eq(i + monthFirst).addClass("date" + parseInt(i + 1));
            $dateLi.eq(i + monthFirst).text(parseInt(i + 1));
            for (var j = 0; j < dateArray.length; j++) {
                if (i == dateArray[j]) {
                    $dateLi.eq(i + monthFirst).addClass("qiandao");
                }
            }
        } //生成当月的日历且含已签到

        $(".date" + myDate.getDate()).addClass('able-qiandao');

        $dateBox.on("click", "li", function() {
            if ($(this).hasClass('able-qiandao') && _handle) {
                $(this).addClass('qiandao');
                qiandaoFun();
            }
        }) ;//签到

        $qiandaoBnt.on("click", function() {
            if (_handle) {
                qiandaoFun();
            }
        }); //签到


        function qiandaoFun() {
            $qiandaoBnt.addClass('actived');
            openLayer("qiandao-active", qianDao);
            _handle = false;
        }

        function qianDao() {
            $(".date" + myDate.getDate()).addClass('qiandao');
        }
    };
    signFun();
    $("#next").on("click",function(){
        nextMouth();
    });
    $("#prev").on("click",function(){
        prevMouth();
    });
    function nextMouth(){
        //alert(Mouth);
        Mouth++;
        if(Mouth>=12){
            FullYear++;
            Mouth=0;
        }
        signFun();
    }
    function prevMouth(){

        Mouth--;
        console.log(Mouth);
        if(Mouth<0){
            FullYear--;
            Mouth=11;
        }
        signFun();
    }

    function openLayer(a, Fun) {
        $('.' + a).fadeIn(Fun)
    } //打开弹窗

    var closeLayer = function() {
        $("body").on("click", ".close-qiandao-layer", function() {
            $(this).parents(".qiandao-layer").fadeOut()
        })
    }(); //关闭弹窗

    $("#js-qiandao-history").on("click", function() {
        openLayer("qiandao-history-layer", myFun);

        function myFun() {
            console.log(1)
        } //打开弹窗返回函数
    })

});
