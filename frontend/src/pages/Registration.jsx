

export function Registration() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);
        if(formData.get('password') !== formData.get('confirm_password')) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // En el registro de usuarios, solo se permite que el usuario tenga un rol de 2 (paciente)
        formData.append("role_id", "1");
        // Para que no se envie el confirm_password
        formData.delete("confirm_password");

        let response = await fetch("http://localhost:5000/api/user", {
            method: "POST",
            body: formData,
        });

        let data = await response.text();
        console.log(data);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="sm:w-full sm:max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=black" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registro en MediCare</h2>

                <form className="mt-10 space-y-6 col-span-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Dirección de correo electrónico</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Nombre</label>
                        <div className="mt-2">
                            <input id="first_name" name="first_name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Apellido</label>
                        <div className="mt-2">
                            <input id="last_name" name="last_name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gender_id" className="block text-sm font-medium leading-6 text-gray-900 text-left">Género</label>
                        <div className="mt-2">
                            <select id="gender_id" name="gender_id" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="1">Hombre</option>
                                <option value="2">Mujer</option>
                                <option value="3">Otro</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="birth_date" className="block text-sm font-medium leading-6 text-gray-900 text-left">Fecha de nacimiento</label>
                        <div className="mt-2">
                            <input id="birth_date" name="birth_date" type="date" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <input id="photo" name="photo" type="file" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">Confirmar contraseña</label>
                        <div className="mt-2">
                            <input id="confirm_password" name="confirm_password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">Registrarse</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?
                    <a href="#" className="font-semibold leading-6 text-black hover:text-gray-700 ml-1">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    )
}
