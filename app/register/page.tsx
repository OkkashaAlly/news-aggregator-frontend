"use client";
import { SubmitHandler, useForm } from "react-hook-form";

// COMPONENTS ========================================

// ===================================================
// REGISTER PAGE COMPONENT (app/page.tsx) ============
// ===================================================
export default function Register() {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = data => console.log(data);

  // RETURN ==========================================
  return (
    <main className="container w-[75%] py-4 flex justify-center">
      <div className="w-[60%]">
        <h1 className="text-3xl font-bold mb-4">Create account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          {/* password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          {/* confirm password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded-md py-1.5 px-2.5 outline-none"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">Confirm Password is required</span>
            )}
          </div>
          {/* submit */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// EXTENDED COMPONENTS =================================
