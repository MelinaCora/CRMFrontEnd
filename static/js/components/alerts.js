//alerts.js

//modificar para adaptar a proyectos

export async function showProjectAddSuccesAlert(){
    
    if(Swal.isVisible()){
        Swal.close();
    };
    
    await Swal.fire({
        title: '¡El proyecto ha sido agregado!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'custom-confirm-button',
            popup: 'custom-swal'
        },
        allowOutsideClick: true, 
        allowEscapeKey: true
    })
}

export async function showTaskAddSuccesAlert(){
    
    if(Swal.isVisible()){
        Swal.close();
    };
    
    await Swal.fire({
        title: '¡La tarea ha sido agregada!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'custom-confirm-button',
            popup: 'custom-swal'
        },
        allowOutsideClick: true, 
        allowEscapeKey: true
    })
}

export async function showInteractionAddSuccesAlert(){
    
    if(Swal.isVisible()){
        Swal.close();
    };
    
    await Swal.fire({
        title: '¡La interaccion ha sido agregada!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'custom-confirm-button',
            popup: 'custom-swal'
        },
        allowOutsideClick: true, 
        allowEscapeKey: true
    })
}

export async function showTaskUpdateSuccesAlert(){
    
    if(Swal.isVisible()){
        Swal.close();
    };
    
    await Swal.fire({
        title: '¡La tarea ha sido actualizada con exito!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'custom-confirm-button',
            popup: 'custom-swal'
        },
        allowOutsideClick: true, 
        allowEscapeKey: true
    })
}

export async function showErrorAlert(){
    
    if(Swal.isVisible()){
        Swal.close();
    };
    
    await Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al procesar la solicitud! Intente nuevamente!",
        customClass: {
            confirmButton: 'custom-confirm-button',
            popup: 'custom-swal'
        },
      });
}
