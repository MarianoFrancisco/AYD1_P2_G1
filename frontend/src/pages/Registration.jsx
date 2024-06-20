import React, { useState } from 'react';

export function Registration() {
    const [userRole, setUserRole] = useState("1"); // Default to patient
    const [specialty, setSpecialty] = useState("");
    const [clinicAddress, setClinicAddress] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);
        if (formData.get('password') !== formData.get('confirm_password')) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // En el registro de usuarios, se establece el rol según la selección del usuario
        formData.append("role_id", userRole);
        formData.delete("confirm_password");

        if (userRole === "2") { // Si es médico
            formData.append("specialty_id", specialty);
            formData.append("clinic_address", clinicAddress);
        }

        let response = await fetch("http://localhost:5000/api/user", {
            method: "POST",
            body: formData,
        });

        let data = await response.text();
        console.log(data);
    }

    const specialties = [
        { id: 1, name: 'Cardiología' },
        { id: 20, name: 'Cirugía General' },
        { id: 2, name: 'Dermatología' },
        { id: 10, name: 'Endocrinología' },
        { id: 3, name: 'Gastroenterología' },
        { id: 19, name: 'Geriatría' },
        { id: 14, name: 'Hematología' },
        { id: 16, name: 'Infectología' },
        { id: 11, name: 'Medicina Interna' },
        { id: 12, name: 'Nefrología' },
        { id: 18, name: 'Neumología' },
        { id: 4, name: 'Neurología' },
        { id: 5, name: 'Oftalmología' },
        { id: 6, name: 'Oncología' },
        { id: 13, name: 'Otorrrinolaringología' },
        { id: 7, name: 'Pediatría' },
        { id: 8, name: 'Psiquiatría' },
        { id: 15, name: 'Reumatología' },
        { id: 9, name: 'Traumatología' },
        { id: 17, name: 'Urología' }
    ];

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
                            <input id="last_name" name="last_name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                    <div>
                        <label htmlFor="role_id" className="block text-sm font-medium leading-6 text-gray-900 text-left">Rol</label>
                        <div className="mt-2">
                            <select id="role_id" name="role_id" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setUserRole(e.target.value)}>
                                <option value="1">Paciente</option>
                                <option value="2">Médico</option>
                            </select>
                        </div>
                    </div>
                    {userRole === "2" && (
                        <>
                            <div>
                                <label htmlFor="specialty_id" className="block text-sm font-medium leading-6 text-gray-900 text-left">Especialidad</label>
                                <div className="mt-2">
                                    <select id="specialty_id" name="specialty_id" required={userRole === "2"} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                                        <option value="">Seleccione una especialidad</option>
                                        {specialties.map(specialty => (
                                            <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="clinic_address" className="block text-sm font-medium leading-6 text-gray-900 text-left">Dirección de la clínica</label>
                                <div className="mt-2">
                                    <input id="clinic_address" name="clinic_address" type="text" required={userRole === "2"} className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} />
                                </div>
                            </div>
                        </>
                    )}
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
                    <a href="./login" className="font-semibold leading-6 text-black hover:text-gray-700 ml-1">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    )
}
