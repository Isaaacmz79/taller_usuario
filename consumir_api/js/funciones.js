const url = 'http://localhost:8091/api/usuario'
const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.usuarios //Capturar el array devuelto por la api
        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta += `<tr><td>${usuario.nro_identificacion}</td>`+
            `<td>${usuario.email}</td>`+
            `<td>${usuario.nombre}</td>`+
            `<td>${usuario.estado}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red"  onclick='eliminar(${JSON.stringify(usuario)})'>Eliminar</a></td>`+
            `</tr>`
            body.innerHTML = respuesta
        })
    })

}


const registrar = async () => {
    let _nro_identificacion = document.getElementById('nro_identificacion').value;
    let _nombre = document.getElementById('nombre').value;
    let _pass = document.getElementById('pass').value;
    let _email = document.getElementById('email').value;
    let _confirmPass = document.getElementById('confirmPass').value;
    let _estado = document.getElementById('estado').value;
  
    const expresionNombre = /^[A-Za-z\s]+$/;
    const expresionNroIdentificacion = /^\d{1,10}$/;
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const errores = [];
  
    if (!expresionNombre.test(_nombre)) {
      errores.push('El nombre solo debe contener letras');
    }
  
    if (!expresionNroIdentificacion.test(_nro_identificacion)) {
      errores.push('El número de identificación debe contener como máximo 10 dígitos');
    }
  
    if (!expresionEmail.test(_email)) {
      errores.push('Correo inválido');
    }
  
    if (_pass.length === 0 || _confirmPass.length === 0) {
      errores.push('El password y la confirmación del password son requeridos');
    } else if (_pass !== _confirmPass) {
      errores.push('El password y la confirmación del password no coinciden');
    }
  
    if (errores.length > 0) {
      const erroresHTML = errores.map(error => `<li style="color: red;">${error}</li>`).join('');
      document.getElementById('error').innerHTML = erroresHTML;
      return;
    }
  
    let usuario = {
      nro_identificacion: _nro_identificacion,
      nombre: _nombre,
      password: _pass,
      email: _email,
      estado: _estado
    };
  
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(usuario),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        if (json.msg) {
          Swal.fire(
            json.msg,
            '',
            'success'
          );
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire(
          'Se presentaron problemas en el registro',
          '',
          'error'
        );
      });
  };
  

const editar= (usuario)=>{
    document.getElementById('nro_identificacion').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('pass').value = ''
    document.getElementById('estado').value = ''

    document.getElementById('nro_identificacion').value = usuario.nro_identificacion
    document.getElementById('nombre').value = usuario.nombre
    document.getElementById('pass').value = usuario.password
    document.getElementById('estado').value = usuario.estado
}


const eliminar= (id)=>{
    if(confirm('¿esta seguro que desea realizar la eliminacion ')== true){
    
        let usuario = {
            _id : id        }

        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
}

const actualizar = async()=>{
    let _nro_identificacion = document.getElementById('nro_identificacion').value 
    let _nombre = document.getElementById('nombre').value
    let _pass = document.getElementById('pass').value
    let _confirmPass = document.getElementById('confirmPass').value
    let _estado = document.getElementById('estado').value
     if((_pass.length>0 && _confirmPass.length>0) && (_pass == _confirmPass)){
        let usuario = {
            nro_identificacion: _nro_identificacion,
            nombre:_nombre,
            password:_pass,
            estado:_estado
        }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
    else{
        alert('El password y la confirmación del password no coinciden. Favor corregir.')
    }
    
}


if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}


if(document.querySelector('#btnAEliminar')){
    document.querySelector('#btnAEliminar')
.addEventListener('click',eliminar)
}
