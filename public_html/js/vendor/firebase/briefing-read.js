const database = firebase.database();
const auth = firebase.auth();
var pKeys = [];

var content = "";

$(document).ready(function(event){
  $("#app").empty();
  $("#app").hide();
  $("#app").html('' +
  '<div class="col s12 m6 offset-m3 l6 offset-l3">' +
    '<h5 class="sub">Você precisa estar logado!</h5>' +
    '<form id="login">' +
      '<section class="row">' +
        '<div class="input-field col s12 m12 l12">' +
          '<input type="email" placeholder="email@provedor.com" name="email" id="email">' +
          '<label for="email"><b>E-mail</b></label>' +
        '</div>' +
      '</section>' +
      '<section class="row">' +
        '<div class="input-field col s12 m12 l12">' +
          '<input type="password" placeholder="senha" name="senha" id="senha">' +
          '<label for="senha"><b>Senha</b></label>' +
        '</div>' +
        '<div class="input-field col s12 m12 l12">' +
          '<button class="btn-large btn-block" id="autenticar">Entrar</button>' +
        '</div>' +
      '</section>' +
    '</form>' +
  '</div>' +
  '');
  $("#app").show();
});

$(document).on('click', "#autenticar", function(event){
  var err = 0;
  event.preventDefault();
  var credentials = $("#login").serializeArray();
  for(var i = 0; i < credentials.length; i++){
    if(credentials[i].value == ""){
      ++err;
    }
  }

  if(err != 0){
    var $toastContent = '<p><b>Por favor, preencha todos os campos</b></p>';
    Materialize.toast($toastContent, 10000);
  }
  else{
    
    var promisse = auth.signInWithEmailAndPassword(credentials[0].value, credentials[1].value);

    promisse.catch(function(e){
      switch(e.code){
        case "auth/wrong-password":
        case "auth/user-not-found":
          var $toastContent = '<p><b>A combinação de e-mail e senha está incorreta.</b></p>';
          Materialize.toast($toastContent, 10000);
        break;
      }
    });
  }
});

auth.onAuthStateChanged(function(user){
  if(user){
    showBriefings();
  }
});

function showBriefings(){
  database.ref().child('briefing').once('value', function(snapshot){
    var snap = snapshot.val();
    var i = 0;
    for(var key in snap){
      if(snap.hasOwnProperty(key)){
        pKeys[i] = key;
        ++i; 
      }
    }

    $("#app").empty();
    $("#app").hide();
    for(i = 0; i < pKeys.length; i++){
      $("#app").append('' +
      "<h5>Ramo de atuação</h5>" +
      "<p><b>" + snap[pKeys[i]]["ramo-atuacao"] + "</b></p>" +
      "<h5>Perfil dos usuários</h5>" +
      "<p><b>" + snap[pKeys[i]]["perfil"] + "</b></p>" +
      "<h5>Concorrentes</h5>" +
      "<p><b>" + snap[pKeys[i]]["concorrentes"] + "</b></p>" +
      "<h5>Ferramentas</h5>" +
      "<p><b>" + snap[pKeys[i]]["ferramentas"] + "</b></p>" +
      "<h5>Outras ferramentas</h5>" +
      "<p><b>" + snap[pKeys[i]]["outras-ferramentas"] + "</b></p>" +
      "<h5>Possui logo?</h5>" +
      "<p><b>" + snap[pKeys[i]]["logo"] + "</b></p>" +
      "<h5>Possui conteúdo?</h5>" +
      "<p><b>" + snap[pKeys[i]]["conteudo"] + "</b></p>" +
      "<h5>Quais cores</h5>" +
      "<p><b>" + snap[pKeys[i]]["cores"] + "</b></p>" +
      "<h5>Referências</h5>" +
      "<p><b>" + snap[pKeys[i]]["referencias"] + "</b></p>" +
      "<h5>Irá vender produtos?</h5>" +
      "<p><b>" + snap[pKeys[i]]["venda-produtos"] + "</b></p>" +
      "<h5>Precisa de dados do usuário?</h5>" +
      "<p><b>" + snap[pKeys[i]]["dados"] + "</b></p>" +
      "<h5>Plataformas acessadas por usuários(PC/Mac, Smartphone, Tablet)</h5>" +
      "<p><b>" + snap[pKeys[i]]["visitas"] + "</b></p>" +
      "<h5>Orçamento disponível</h5>" +
      "<p><b>" + snap[pKeys[i]]["orcamento"] + "</b></p>" +
      "<h5>Data limite para execução</h5>" +
      "<p><b>" + snap[pKeys[i]]["data-limite"] + "</b></p>" +
      "<h5>Nome do negócio</h5>" +
      "<p><b>" + snap[pKeys[i]]["nome-empresa"] + "</b></p>" +
      "<h5>E-mail para contato</h5>" +
      "<p><b>" + snap[pKeys[i]]["email-contato"] + "</b></p>" +
      "<hr>" +
    '');
    }
    $("#app").show();
  });
}