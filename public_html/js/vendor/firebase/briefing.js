const database = firebase.database();
const loadPannel = $(".loading");
var sendData = {
  "nome-empresa": "",
  "email-contato": "",
  "ramo-atuacao": "",
  "perfil" : "",
  "concorrentes": "",
  "ferramentas": "",
  "outras-ferramentas": "",
  "logo": "",
  "cores": "",
  "referencias": "",
  "dados": "",
  "visitas": "",
  "orcamento": "",
  "data-limite": ""
};

$("#enviar-info").click(function(event){
  event.preventDefault();
  
  loadPannel[0].style.visibility = "visible";
  
  var dados = $("#briefing").serializeArray();
  for(var i = 0; i < dados.length; i++){
    sendData[dados[i].name] = dados[i].value;
  }

  var newBriefing = database.ref().child('briefing').push().key;
  firebase.database().ref('briefing/' + newBriefing).set(sendData);
  
  var $toastContent = '<p>Seu briefing foi salvo com sucesos!<br>Em breve entraremos em contato com uma proposta.</p>';
  Materialize.toast($toastContent, 15000);
  
  loadPannel[0].style.visibility = "hidden";
  
  $('#briefing')[0].reset();
});