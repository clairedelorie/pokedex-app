let pokemonRepository = (function () {
  let t = [],
    e = document.querySelector("#searchIn"),
    n = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function o(e) {
    if ("object" == typeof e && "name" in e && "detailsUrl" in e)
      return t.push(e);
    document.write("Pokemon not found");
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        console.log(e),
          (t.imageUrlFront = e.sprites.front_default),
          (t.imageUrlBack = e.sprites.back_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (var n = 0; n < e.types.length; n++)
          t.types.push(e.types[n].type.name);
        t.abilities = [];
        for (n = 0; n < e.abilities.length; n++)
          t.abilities.push(e.abilities[n].ability.name);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function l(t) {
    i(t).then(function () {
      !(function (t) {
        const e = $(".modal");
        let n = $(".modal-body"),
          o = $(".modal-title");
        o.empty(), n.empty();
        let i = $("<h1>" + t.name + "</h1>"),
          l = $("<p>Type : " + t.types + "</p>"),
          a = $("<p>Height : " + t.height + "</p>"),
          s = $("<p>Weight : " + t.weight + "</p>"),
          r = $("<p>Abilities : " + t.abilities + "</p>"),
          p = $('<img class="pokemon-image" style:width="200px">');
        p.attr("src", t.imageUrlFront);
        let c = $('<img class="modal-img" style:width="200px">');
        c.attr("src", t.imageUrlBack),
          o.append(i),
          n.append(a),
          n.append(s),
          n.append(l),
          n.append(r),
          n.append(p),
          n.append(c),
          $("#pokemonModal").modal("toggle"),
          e.addClass("show");
      })(t);
    });
  }
  return (
    $("button.close").on("click", function () {
      $(".modal").removeClass("show");
    }),
    e.addEventListener("input", function () {
      let t = document.querySelectorAll(".list-group-item"),
        n = e.value.toUpperCase();
      t.forEach(function (t) {
        t.innerText.toUpperCase().indexOf(n) > -1
          ? (t.style.display = "")
          : (t.style.display = "none");
      });
    }),
    {
      add: o,
      getAll: function () {
        return t;
      },
      addListItem: function (t) {
        let e = document.querySelector(".list-group"),
          n = document.createElement("li");
        n.classList.add("list-group-item", "list-group-item-action");
        let o = document.createElement("button");
        (o.innerText = t.name),
          o.classList.add("btn", "btn-block"),
          o.setAttribute("data-toggle", "modal"),
          o.setAttribute("data-target", "#pokemonModal"),
          n.appendChild(o),
          e.appendChild(n),
          o.addEventListener("click", function () {
            l(t);
          });
      },
      loadList: function () {
        return fetch(n)
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              o({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      loadDetails: i,
      showDetails: l,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
