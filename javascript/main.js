$(function () {

  $("select").on("change", function () {
    console.log($(this).val());

    const section = $(this).val();
    $(".grid").empty()

    $.ajax({
      method: "GET",
      url:
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=JvGVjNPTLqSfGf9DvJdEuMjajYqM5ha4`
    })

      .done(function (data) {
        console.log(data.results[0].multimedia)

        let i = 0;
        $.each(data.results, function (index, value) {
          //console.log(`${index}: ${value}`)

          let articleUrl = value.url
          let abstract = value.abstract
          let articleImage = value.multimedia[0].url

          if (value.multimedia.length !== 0 && i < 12) {
            i++;
            $(".grid").append(`<a href="${articleUrl}"><figure><img src="${articleImage}"><p>${abstract}</p></figure></a>`);
            return i !== 12;
          }
        })
      })
  })
})