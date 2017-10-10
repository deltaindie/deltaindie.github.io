const nome = $("#nome");
const email = $("#email");
const comentario = $("#comentario");
const dataAtual = new Date();
const db = firebase.database();
const namePost = $("#postname").val();

$("form").submit(function(event){
  var n, c, d, e;
  if(nome.val() == '' || (nome.val()).length < 3){
    nome.removeClass("validate").addClass("invalid");
    email.removeClass("invalid").addClass("validate");
    comentario.removeClass("invalid").addClass("validate");
    nome.focus();
  }
  else
    if(email.val() == '' && (!validEmail(email.val()))){
      nome.removeClass("invalid").addClass("validate");
      email.removeClass("validate").addClass("invalid");
      comentario.removeClass("invalid").addClass("validate");
      email.focus();
    }
    else
      if(comentario.val() == ''){
        nome.removeClass("invalid").addClass("validate");
        email.removeClass("invalid").addClass("validate");
        comentario.removeClass("validate").addClass("invalid");
        comentario.focus();
      }
      else{
        n = nome.val();
        c = comentario.val();
        d = new Date();
        e = email.val();

        comentario.removeClass("invalid").addClass("valid");
        nome.removeClass("invalid").addClass("valid");
        email.removeClass("invalid").addClass("valid");

        saveComment(n, c, d, e);
      }
  event.preventDefault();
});

function validEmail(email){
	if(email.indexOf('@') ==-1 || email.indexOf('.') ==-1)
	   return false;

	return true;
}

function saveComment(nome, coment, dta, email){
  var newKey = db.ref().child('comentarios').push().key;
  
  var dia = dta.getDate() < 10 ? "0" + dta.getDate() : dta.getDate();
  var mes = (dta.getMonth()+1) < 10 ? "0" + (dta.getMonth()+1) : (dta.getMonth()+1);

  var hora = dta.getHours() < 10 ? "0" + dta.getHours() : dta.getHours();
  var minuto = dta.getMinutes() < 10 ? "0" + dta.getMinutes() : dta.getMinutes();

  var data_string = dia + "/" + mes + "/" + dta.getFullYear();
  var hora_string = hora + ":" + minuto;

  db.ref('comentarios/' + namePost + "/" + newKey).set({
    nome: nome,
    email: email,
    comentario: coment,
    data: data_string + " " + hora_string
  });
  
  var $toastContent = $('<span class="center-align">Comentário registrado!<br>Obrigado.</span>');
  Materialize.toast($toastContent, 7000);

  resetForm();
}

function resetForm(){
  $('form')[0].reset();
}

var commentsRef = db.ref('comentarios/' + namePost).on('value', function(snap){
  $('.loading').hide();
  var pKeys = [];
  var i = 0;
  for(var prop in snap.val()) {
    pKeys[i] = prop;
    i++;
  }

  $("#comentarios").empty();

  if(snap.val() == null){
    $("#comentarios").append('<h5 class="center-align">Seja o primeiro a comentar esta publicação.</h5>');
  }
  else{
    var cond = pKeys.length - 1;
    for(i = cond; i >= 0; i--){
      var commentsIn = db.ref('comentarios/' + namePost + "/" + pKeys[i]).on('value', function(data){
        $("#comentarios").append('<div class="card">' + 
        '<div class="card-content">' +
        '<span class="card-title"><b>' + data.val().nome + '</b> <span class="info">disse:</span></span>' +
        '<span class="info">' + data.val().data + '</span>' +
        '<p class="flow-text">' + data.val().comentario + '</p>' +
        '</div>' + 
        '</div>');
      });
    }
  }
});