//const axios = require("axios");
jQuery(document).ready(function() {
  "use strict";

  Number.prototype.format = function() {
    return this.toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  $(".dropdown-item").click(function() {
    let currency = $(this);
    $("#t-gif").css({ display: "block" });
    let currencyChoosed = $("#currency-choosed");
    const currencyText = currency.text();
    const currencyChoosedText = currencyChoosed.text();
    getCriptoCurrency(currencyText);
    currency.text(currencyChoosedText);
    currencyChoosed.text(currencyText);
  });

  getCriptoCurrency("USD");

  function getCriptoCurrency(currency) {
    const tbody = $("#tbody");
    tbody.html("");

    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XRP,ETH,BTC,IOT,BCH,DASH&tsyms=${currency}`
      )
      .then(response => {
        $("#t-gif").css({ display: "none" });
        const object = response.data;
        const raw = response.data.RAW;

        const array = Object.keys(response.data.RAW);

        array.forEach((item, idx) => {
          var obj = {};
          obj[item] = item;

          tbody.append(
            `<tr>
                <td>${idx}</td>
                <td>${raw[item][currency].FROMSYMBOL}</td>
                <td>${raw[item][currency].PRICE.format()}</td>
                <td>${raw[item][currency].MKTCAP.format()}</td> 
                <td>${raw[item][currency].VOLUME24HOUR.format()}</td>
                <td>${raw[item][currency].SUPPLY.format()}</td>
                <td>${raw[item][currency].CHANGE24HOUR.toFixed(3)}%</td>

            </tr>`
          );
        });
      })
      .catch(error => {
        console.log("error => ", error);
      });
  }
});

function formatMoney(number, decPlaces, decSep, thouSep) {
  (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
    (decSep = typeof decSep === "undefined" ? "." : decSep);
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(
    parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
  );
  var j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces
      ? decSep +
        Math.abs(number - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
}
