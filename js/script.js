// 가로 드래그
let isDragging = false;
let startX;
let scrollLeft;

document.getElementById('scroll-container').addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - document.getElementById('scroll-container').offsetLeft;
    scrollLeft = document.getElementById('scroll-container').scrollLeft;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - document.getElementById('scroll-container').offsetLeft;
    const walk = (x - startX) * 2; // 조절 가능한 스크롤 속도
    document.getElementById('scroll-container').scrollLeft = scrollLeft - walk;
});


// 뉴스 카테고리 클릭시
var url = ["https://open.assembly.go.kr/portal/openapi/nkyhxppmamrzejhij",
    "https://open.assembly.go.kr/portal/openapi/nzsmstfjaswvtbzii",
    "https://open.assembly.go.kr/portal/openapi/nepfnxudavtvchtlu",
    "https://open.assembly.go.kr/portal/openapi/nknsekyoahvonwlll",
    "https://open.assembly.go.kr/portal/openapi/noxbiocwawvechjkc",
    "https://open.assembly.go.kr/portal/openapi/ngwksdbiacfrifqsi",
    "https://open.assembly.go.kr/portal/openapi/nyazvvwaarapcotdp",
    "https://open.assembly.go.kr/portal/openapi/nrjoiyzqaxpwfzuut"]

$("#scroll-container .scroll-content").on("click", function () {
    $("#scroll-container .scroll-content").css({ color: "#757574", "background-color": "#f0f0f2" })
    $(this).css({ color: "#fafafa", "background-color": "#000" })
    $("#title").text($(this).text())

    var categoryIndex = $(this).index()

    $(".newsBoxTitles").empty();
    $(".news").empty();
    $.ajax({
        url: url[categoryIndex],
        type: 'GET',
        dataType: 'xml',

        success: function (data) {

            // news
            $(data).find("row").each(function (index) {

                var title = $(this).find("V_TITLE").text();
                var date = "수정 " + $(this).find("DATE_LASTMODIFIED").text();
                var content = $(this).find("V_BODY").html();
                var modifiedContent = content.replace(/(<div[^>]*>.*?<\/div>|<\/div>|<p>&nbsp;<\/p>|<p>&nbsp;<\/p>\]\]>|]]>)|(<figure[^>]*>\s*.*?\s*<\/figure>|<p>\s*&nbsp;\s*<\/p>|<p>\s*<\/p>\]\]>|]]>)/gs, '');
                
                console.log(modifiedContent)
                var box = `<div id="box${index}"><h2 id="h2${index}">${title}</h2><h6 id="date">${date}</h6><p id="p${index}">${modifiedContent}</p></div>`;
                $(".news").append(box);
            })

            // title
            $(data).find("row").each(function (index) {
                var title = $(this).find("V_TITLE").text();
                var h2 = `<h2 id="h2${index}">${title}</h2>`
                $(".newsBoxTitles").append(h2);
            })
        },

        error: function (error) {
            console.log('Error: ', error);
        }
    });
})

$("#scroll-container .scroll-content").eq(0).trigger('click')

var titleIndex = 0

// 뉴스 제목 클릭시
$(".newsBoxTitles").on("click", "h2", function () {
    titleIndex = $(this).index()
    $(".newsbox").fadeIn()
    $(".newsbox .news div").css({ display: "none" })
    $(".newsbox .news div").eq(titleIndex).css({ display: "block" })
});

$(".newsbox #close").on("click", function () {
    $(".newsbox").fadeOut()
})

var fontSize = 14
$(".newsbox #minus").attr("disabled", true).children("i").css({ color : "#686868" });

$(".newsbox #minus, .newsbox #plus").on("click", function () {
    var attId = $(this).attr("id")

    if (attId == "plus") {
        fontSize = fontSize + 2
        $(".newsbox .news div p").css({ "font-size": fontSize + "px" })
    } else {
        fontSize = fontSize - 2
        $(".newsbox .news div p").css({ "font-size": fontSize + "px" })
    }

    if (fontSize < 16) {
        $(".newsbox #minus").attr("disabled", true).children("i").css({ color : "#686868" });
    } else {
        $(".newsbox #minus").attr("disabled", false).children("i").css({ color : "mediumaquamarine" });
    }

    if (fontSize > 16) {
        $(".newsbox #plus").attr("disabled", true).children("i").css({ color : "#686868" });
    } else {
        $(".newsbox #plus").attr("disabled", false).children("i").css({ color : "mediumaquamarine" });
    }
})