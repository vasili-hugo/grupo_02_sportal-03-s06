window.addEventListener ('load', function () {
    const form = document.querySelector('.register-form');

    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]$/, // Letras, numeros, guion y guion_bajo.
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{8,30}$/, // 8 a 30 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{10,20}$/, // 10 a 20 numeros.
        dni: /^\d{6,8}$/, // 6 a 8 numeros.
        cp: /^[a-zA-Z0-9À-ÿ\s]{1,8}$/, // Letras y numeros de 1 a 8 digitos.
        direccion: /^[a-zA-Z0-9À-ÿ\s]{1,50}$/ // Letras y numeros.
    }
    const validExt = ["jpeg", "jpg", "png", "gif", 'JPEG', 'JPG', 'PNG', 'GIF'];

    form.addEventListener('submit', function (e) {
        let errores = false;
        
        //Validando el input de usuario para que no este el campo en blanco y que sea formato email.
        let email = document.getElementById('usuario');
        let errmsgUsuario = document.querySelector(".error-msg-usuario");
        if(email.value.length > 0 ) {
            let inputValue = email.value;
            if (expresiones.correo.test(inputValue)) {
                errmsgUsuario.innerHTML = ' ';
                email.classList.remove('invalid');
            } else {
                errores = true;
                errmsgUsuario.innerHTML = 'Debes ingresar un correo electrónico válido.';
                email.classList.add('invalid');
            }

        } else {
            errores = true;
            errmsgUsuario.innerHTML = "Debes ingresar el correo electrónico.";
            email.classList.add('invalid');
        }

        //Validando el input de contraseña para que no este el campo en blanco.
        let pass = document.getElementById('password');
        let errmsgPass = document.querySelector(".error-msg-password");
        if(pass.value.length > 0 ) {
            let inputPass = pass.value;
            if (expresiones.password.test(inputPass)) {
                errmsgPass.innerHTML = ' ';
                pass.classList.remove('invalid');
            } else {
                errores = true;
                errmsgPass.innerHTML = "La contraseña debe tener al menos 8 caracteres.";
                pass.classList.add('invalid');
            }
            
        } else {
            errores = true;
            errmsgPass.innerHTML = "Debes ingresar tu contraseña.";
            pass.classList.add('invalid');
        }

        //Validando el input de repetir contraseña para que no este el campo en blanco.
        let pass2 = document.getElementById('password2');
        let errmsgPass2 = document.querySelector(".error-msg-password2");
        if(pass2.value.length > 0 ) {
            let inputPass = pass2.value;
            if (expresiones.password.test(inputPass)) {
                errmsgPass2.innerHTML = ' ';
                pass2.classList.remove('invalid');
            } else {
                errores = true;
                errmsgPass2.innerHTML = "La contraseña debe tener al menos 8 caracteres.";
                pass2.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgPass2.innerHTML = "Debes repetir tu contraseña.";
            pass2.classList.add('invalid');
        }

        //Validando el input de nombre para que no este en blanco y que sean solo letras con acentos y espacios.
        let nombre = document.getElementById('nombre');
        let errmsgNombre = document.querySelector(".error-msg-nombre");
        if(nombre.value.length > 0){
            let inputValue = nombre.value;
            if (expresiones.nombre.test(inputValue)){
                errmsgNombre.innerHTML = ' ';
                nombre.classList.remove('invalid');
            } else {
                errores = true;
                errmsgNombre.innerHTML = 'Debes ingresar un nombre válido.';
                nombre.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgNombre.innerHTML = 'Debes ingresar tu nombre.';
            nombre.classList.add('invalid');
        }

        //Validando el input de apellido para que no este en blanco y que sean solo letras con acentos y espacios.
        let apellido = document.getElementById('apellido');
        let errmsgApellido = document.querySelector(".error-msg-apellido");
        if(apellido.value.length > 0){
            let inputValue = apellido.value;
            if (expresiones.nombre.test(inputValue)){
                errmsgApellido.innerHTML = ' ';
                apellido.classList.remove('invalid');
            } else {
                errores = true;
                errmsgApellido.innerHTML = 'Debes ingresar un apellido válido.';
                apellido.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgApellido.innerHTML = 'Debes ingresar tu apellido.';
            apellido.classList.add('invalid');
        }

        //Validando el input de dni para que sean numeros de 6 a 8 digitos.
        let dni = document.getElementById('dni');
        let errmsgDni = document.querySelector(".error-msg-dni");
        if(dni.value.length > 0){
            let inputValue = dni.value;
            if (expresiones.dni.test(inputValue)){
                errmsgDni.innerHTML = ' ';
                dni.classList.remove('invalid');
            } else {
                errores = true;
                errmsgDni.innerHTML = 'Debes ingresar un dni válido.';
                dni.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgDni.innerHTML = 'Debes ingresar tu dni.';
            dni.classList.add('invalid');
        }

        //Validando el input de celular para que sean numeros de 10 a 20 digitos.
        let celular = document.getElementById('celular');
        let errmsgCelular = document.querySelector(".error-msg-celular");
        if(celular.value.length > 0){
            let inputValue = celular.value;
            if (expresiones.telefono.test(inputValue)){
                errmsgCelular.innerHTML = ' ';
                celular.classList.remove('invalid');
            } else {
                errores = true;
                errmsgCelular.innerHTML = 'Debes ingresar un celular válido.';
                celular.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgCelular.innerHTML = 'Debes ingresar tu celular.';
            celular.classList.add('invalid');
        }

        //Validando el input de direccion para que no este en blanco y que sean solo letras con acentos, numeros y espacios.
        let direccion = document.getElementById('direccion');
        let errmsgDireccion = document.querySelector(".error-msg-direccion");
        if(direccion.value.length > 0){
            let inputValue = direccion.value;
            if (expresiones.direccion.test(inputValue)){
                errmsgDireccion.innerHTML = ' ';
                direccion.classList.remove('invalid');
            } else {
                errores = true;
                errmsgDireccion.innerHTML = 'Debes ingresar una dirección válido.';
                direccion.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgDireccion.innerHTML = 'Debes ingresar tu dirección.';
            direccion.classList.add('invalid');
        }

        //Validando el input de localidad para que no este en blanco y que sean solo letras con acentos y espacios.
        let localidad = document.getElementById('localidad');
        let errmsgLocalidad = document.querySelector(".error-msg-localidad");
        if(localidad.value.length > 0){
            let inputValue = localidad.value;
            if (expresiones.direccion.test(inputValue)){
                errmsgLocalidad.innerHTML = ' ';
                localidad.classList.remove('invalid');
            } else {
                errores = true;
                errmsgLocalidad.innerHTML = 'Debes ingresar una localidad válido.';
                localidad.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgLocalidad.innerHTML = 'Debes ingresar tu localidad.';
            localidad.classList.add('invalid');
        }

        //Validando el input de direccion para que no este en blanco y que sean solo letras con acentos, numeros y espacios.
        let cp = document.getElementById('cp');
        let errmsgCp = document.querySelector(".error-msg-cp");
        if(cp.value.length > 0){
            let inputValue = cp.value;
            if (expresiones.cp.test(inputValue)){
                errmsgCp.innerHTML = ' ';
                cp.classList.remove('invalid');
            } else {
                errores = true;
                errmsgCp.innerHTML = 'Debes ingresar una dirección válido.';
                cp.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgCp.innerHTML = 'Debes ingresar tu dirección.';
            cp.classList.add('invalid');
        }

        //Validando el input de avatar para que no este en blanco y que tenga las extensiones permitidas.
        let avatar = document.getElementById('avatar');
        let errmsgAvatar = document.querySelector(".error-msg-avatar");
        if (avatar.value.length > 0) {
            if (okImage(avatar.value, validExt)) {
                errmsgAvatar.innerHTML = " ";
                avatar.classList.remove('invalid');
            } else {
                errores = true;
                errmsgAvatar.innerHTML = "Las extensiones permitidas son '" + validExt.toString() + "'.";
                avatar.classList.add('invalid');
            }
        } else {
            errores = true;
            errmsgAvatar.innerHTML = "Tenes que subir una imagen de perfil.";
            avatar.classList.add('invalid');
        }
        
        if(errores){ e.preventDefault() };
    })
    
})

function okImage (valor, extentions) {
    let ext = "";
    for (let i = 0 ; i < valor.length ; i++) {
      let idx = valor.length - i - 1
      if (valor[idx] == ".") {
        return (extentions.includes(ext));
      } else {
        ext = valor[idx].toLowerCase() + ext;
      }
    }
    return false;
}