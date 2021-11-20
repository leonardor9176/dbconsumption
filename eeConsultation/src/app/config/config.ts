export const config = {
    backend: {
        url: 'http://localhost:5000',
        urlSocket: '' //not used 
    },
    formComponent: {
        title: 'registro de empleados',
        btnAdd: 'agregar',
        btnEdit: 'editar',
        btnDelete: 'eliminar',

        form: {
            field: {
                f1: 'name',
                f2: 'document',
                f3: 'dob',
                f4: 'gender',
                f5: 'phone',
                f6: 'email',
                f7: 'salary',
            },
            text: {
                f1: 'nombre',
                f2: 'documento',
                f3: 'fecha de nacimiento',
                f4: 'genero',
                f5: 'telefono',
                f6: 'email',
                f7: 'salario',
            },
        },

        // messages: {
        //     addSuccess: 'Usuario agregado satisfactoriamente',
        //     addError: 'El nombre ingresado no es válido',
        //     editedSuccess: 'El usuario ha sido actualizado',
        //     deleteSuccess: 'El usuario ha sido eliminado'
        // }
    },

}