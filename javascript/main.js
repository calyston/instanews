$(function () {

  $("select").on("change", function () {
    console.log($(this).val());

    const section = $(this).val();

    $.ajax({
      method: "GET",
      url:
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=JvGVjNPTLqSfGf9DvJdEuMjajYqM5ha4`
    })

      .done(function (data) {
        console.log(data.results[0].multimedia) //2


        $.each(data.results, function (index, value) {
          console.log(`${index}: ${value.abstract}`)
          $(".grid").append(`${index}: ${value.abstract}`)
          $(".grid").append(value.multimedia && value.multimedia[4])
          // $(".grid").append(`<p>Article</p>`)
        })

      })
  })
})