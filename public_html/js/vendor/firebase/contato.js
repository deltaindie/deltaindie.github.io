const name = $("#nome");
const email = $("#email");
const subject = $("#assunto");
const message = $("#mensagem");
const db = firebase.database();

$("form").submit(function(event){
  var n, e, s, m;
  if(name.val() == '' || (name.val()).length < 3){
    name.removeClass("validate").addClass("invalid");
    email.removeClass("invalid").addClass("validate");
    subject.removeClass("invalid").addClass("validate");
    message.removeClass("invalid").addClass("validate");
    name.focus();
	}
	else
    if(email.val() == '' && (!validEmail(email.val()))){
      name.removeClass("invalid").addClass("validate");
      email.removeClass("validate").addClass("invalid");
      subject.removeClass("invalid").addClass("validate");
      message.removeClass("invalid").addClass("validate");
      email.focus();
    }
    else
      if(subject.val() == ''){
        name.removeClass("invalid").addClass("validate");
        email.removeClass("invalid").addClass("validate");
        subject.removeClass("validate").addClass("invalid");
        message.removeClass("invalid").addClass("validate");
        subject.focus();
      }
      else
        if(message.val() == ''){
          name.removeClass("invalid").addClass("validate");
          email.removeClass("invalid").addClass("validate");
          subject.removeClass("invalid").addClass("validate");
          message.removeClass("validate").addClass("invalid");
          message.focus();
        }
        else{
          name.removeClass("invalid").addClass("validate");
          email.removeClass("invalid").addClass("validate");
          subject.removeClass("invalid").addClass("validate");
          message.removeClass("invalid").addClass("validate");

          n = name.val();
          e = email.val();
          s = subject.val();
          m = message.val();

          saveContact(n, e, s, m);
        }
  event.preventDefault();
});

function validEmail(email){
	if(email.indexOf('@') ==-1 || email.indexOf('.') ==-1)
	   return false;

	return true;
}

function saveContact(nome, email, assunto, mensagem){
  var newKey = db.ref().child('contato').push().key;
  db.ref('contato/' + newKey).set({
    name: nome,
    email: email,
    assunto: assunto,
    mensagem: mensagem
  });
  
  var $toastContent = $('<span class="center-align">Obrigado pelo contato, '+ nome + '!<br>Responderei o mais breve possível.</span>');
  Materialize.toast($toastContent, 10000);

  resetForm();
}

function resetForm(){
  $('form')[0].reset();
  name.focus();
}