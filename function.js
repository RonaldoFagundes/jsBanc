

var btnCad = document.querySelector("#btn-cad-logar");
var btnMov = document.querySelector("#btn-mov");

var type_name = document.getElementById("type-name");

const email = "";
const senha = "";

const saldo = 800;

validar = () => {

  if (document.forms[0].email.value == ""
    || document.forms[0].email.value.indexOf('@') == -1
    || document.forms[0].email.value.indexOf('.') == -1) {

    alert("Por favor, informe um E-MAIL válido!");
    document.forms[0].email.focus();
    return false;

  } else if (document.forms[0].senha.value == "" || document.forms[0].senha.value.length < 8) {

    alert("Por favor, digite no minimo 8 caracteres para senha!");
    document.forms[0].senha.focus();
    return false;

  } else

    return true;
}



btnCad.addEventListener("click",
  () => {

    if (btnCad.value === "Cadastrar") {

      if (validar() == true) {

        btnCad.value = 'Logar';

        const emailCad = document.forms[0].email.value;
        const passwordCad = document.forms[0].senha.value;

        setEmail(emailCad);
        setSenha(passwordCad);

        alert(" user " + emailCad + " cadastrado com sucesso , faça login! ");

        document.forms[0].senha.value = "";
        document.forms[0].email.value = "";

        type_name.innerHTML = 'Tela de Login ';
        type_name.style.cssText = 'color: orange';
      }

    } else if (btnCad.value === "Logar") {

      var emailLog = document.forms[0].email.value;
      var passwordLog = document.forms[0].senha.value;

      if (emailLog === getEmail() && passwordLog === getSenha()) {
        alert(" logado com sucesso com email : " + getEmail() + "  seja bem vindo(a)! ");
        document.forms[0].senha.value = "";
        document.forms[0].email.value = "";

        var div_mov = document.getElementById("div-mov");
        var div_log = document.getElementById("div-log");

        div_mov.classList.add('show-div');
        div_log.classList.add('hidden-div');

        var body = document.getElementsByTagName("BODY")[0];

        body.style.cssText = 'background-color: rgba(45, 64, 148, 1);' +
          'background-image: linear-gradient(to top, transparent, rgba(45, 64, 148, 0.8))';

        type_name.innerHTML = 'Tela de Movimentação Bancária ';
        type_name.style.cssText = 'color: white';

        var formatSaldo = saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        document.querySelector("[name='saldo']").value = formatSaldo;

      } else {
        alert(" email ou senha incorretos tente novamente! ");
        document.forms[0].email.value = "";
        document.forms[0].senha.value = "";
        document.forms[0].email.focus();
      }

    }

  });




setEmail = (pEmail) => {
  this.email = pEmail;
}

getEmail = () => {
  return this.email;
}

setSenha = (pSenha) => {
  this.senha = pSenha;
}

getSenha = () => {
  return this.senha;
}


btnMov.addEventListener("click",
  () => {

    var op = document.querySelector('input[name="operacao"]:checked').value;
    var valor = document.getElementById("valor").value;
    var sld = document.querySelector("[name='saldo']").value;

    valor = valor.replace(",", ".");

    sld = sld.replace("R$", "");
    sld = sld.replace(",", ".");

    sld = parseFloat(sld);
    valor = parseFloat(valor);

    if (op === "saque") {

      if (valor <= sld) {

        sld -= valor;

        var formatSaldo = sld.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        var formatValor = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        document.querySelector("[name='saldo']").value = formatSaldo;
        document.querySelector("[name='valor']").value = "";

        alert(" operação de " + op + " no valor de " + formatValor + " realizado com sucesso, novo saldo " + formatSaldo);

      } else {

        var formatSaldo = sld.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        var formatValor = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        document.querySelector("[name='valor']").value = "";
        alert(" seu saldo é de  " + formatSaldo + " insuficiente para operação de " + op + " no valor de " + formatValor);
        return false;
      }

    } else if (op === "pix") {

      sld += valor;

      var formatSaldo = sld.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      var formatValor = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      document.querySelector("[name='saldo']").value = formatSaldo;
      document.querySelector("[name='valor']").value = "";
      alert(" operação de " + op + " no valor de " + formatValor + " realizado com sucesso, novo saldo " + formatSaldo);

    }
  });











