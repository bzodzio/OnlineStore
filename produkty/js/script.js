$(document).ready(function()
{

    $(".dropdown-toggle").click(function () {
        $("#logininput").toggle("fast");
    });

    $(".openbasketmenu").click(function () {
        $("#kontener_koszyka").toggle("fast");
    });

    $("#itembasket").click(function () {
        $("#kontener_koszyka").toggle("fast");
    });

    $(".produkt").hover(function(evt){
            $(".addtobasket", this).fadeIn();
        },
        function()
        {
            $(".addtobasket", this).fadeOut();
        })
        .dragstart(function(evt)
        {
            evt.dataTransfer.setData("text", $(this).attr("id"));
            $("#kontener_koszyka").fadeIn();
            $("#info_przeniesienie").fadeIn();
        }).dragend(function(evt)
    {
        $("#info_przeniesienie").fadeOut();
    });

    var default_color = $("#kontener_koszyka").css("background-color");
    var default_border = $("#kontener_koszyka").css("border-color");
    var default_basket = $("#itembasket").css("background-color");


    $("#kontener_koszyka").dragover(function(evt)
    {
        evt.preventDefault();
        $(this).css("background-color", "green").css("border-color", "green");
        $("#itembasket").css("background-color", "green");

    }).dragleave(function(evt){
        $(this).css("background-color", default_color);
        $(this).css("border-color", default_border);
        $("#itembasket").css("background-color", default_basket);



    }).drop(function(evt)
    {
        evt.preventDefault();
        $(this).css("background-color", default_color);
        $(this).css("border-color", default_border);
        $("#itembasket").css("background-color", default_basket);
        var suma = 0;
        var przedmiot = evt.dataTransfer.getData("text");

        var nazwa = $("#"+przedmiot+" .nazwa").text();
        var cena = $("#"+przedmiot+" .cenaprzedmiotu").text();

        var li = "<li class='produkt_w_koszyku'><b>"+nazwa+"</b> <span class='cena_w_koszyku'>"+cena+" zł</span></li>";

        $("#koszyk").append(li);

        $("#koszyk .cena_w_koszyku").each(function()
        {
            suma += parseFloat($(this).text());
        });

        $("#cena span").text(suma.toFixed(2));
    });

    $("body").on("click", ".addtobasket", function (evt) {

        $("#kontener_koszyka").fadeIn();

        var nazwa = $(this).closest('.produkt').find('.nazwa').text();
        var cena = $(this).closest('.produkt').find('.cenaprzedmiotu').text();

        var suma = 0;
        var li = "<li class='produkt_w_koszyku'><b>"+nazwa+"</b> <span class='cena_w_koszyku'>"+cena+" zł</span></li>";

        $("#koszyk").append(li);

        $("#koszyk .cena_w_koszyku").each(function()
        {
            suma += parseFloat($(this).text());
        });

        $("#cena span").text(suma.toFixed(2));
    });

    // wyszukiwarka itemow

    var $rows = $('.col-md-3'); //pobranie wierszy z tabeli

        $('.form-control').keyup(function() { //funkcja keyup jest wywolywana kiedy uzytkownik nacisnie klawisz
            var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                reg = RegExp(val, 'i'),
                text; // uzycie wyrazenia regularnego do sprawdzenia elementu

            $rows.show().filter(function() { // najpierw pokazujemy wszystkie wiersze, a potem stosujemy funkcje filter()
                text = $(this).text().replace(/\s+/g, ' ');
                $("#footer").css("position", "fixed").css("bottom", "0");

                return !reg.test(text); //sprawdzamy czy wiersz pasuje doelementu szukanego, jeśli nie to chowamy ten wiersz
            }).hide();

            if(document.getElementById("input").value.length == 0)
            {
                $("#footer").css("position", "");
            }
        });
        //wyszukiwarka itemow end
});