function addEvaluation() {
  var card = document.createElement("div");
  card.id = "evaluationCard";
  card.className = "card text-center";

  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.innerHTML = "Featured";
  card.append(cardHeader);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  var h5 = document.createElement("h5");
  h5.className = "card-title";
  cardBody.append(h5);

  var h5Text = document.createTextNode("Special title treatment");
  h5.append(h5Text);

  var p = document.createElement("p");
  p.className = "card-text";
  cardBody.append(p);

  var pText = document.createTextNode("With supporting text below as a natural lead-in to additional content.");
  p.append(pText);

  var a = document.createElement("a");
  a.href = "#";
  cardBody.append(a);

  var button = document.createElement("button");
  button.id = "cardButton"
  button.className = "btn btn-primary";
  button.type = "submit";
  button.innerHTML = "See evaluation";
  a.append(button);

  var a = document.createElement("a");
  a.href = "#";
  cardBody.append(a);

  var button = document.createElement("button");
  button.id = "cardButton"
  button.className = "btn btn-primary";
  button.type = "submit";
  button.innerHTML = "Result";
  a.append(button);

  var a = document.createElement("a");
  a.href = "#";
  cardBody.append(a);

  var button = document.createElement("button");
  button.id = "cardButton"
  button.className = "btn btn-primary";
  button.type = "submit";
  button.innerHTML = "Remove";
  a.append(button);

  var cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-muted";
  cardFooter.innerHTML = "2 days ago (TIMESTAMP DATE)";
  card.append(cardFooter);

  document.getElementById("cardArea").appendChild(card);
}
