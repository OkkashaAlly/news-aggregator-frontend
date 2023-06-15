"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

// REDUX =============================================
import { loginUser } from "@/store/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// ===================================================
// LOGIN PAGE COMPONENT (app/page.tsx) ===============
// ===================================================
export default function Login() {
  const router = useRouter();

  // redux
  const dispatch = useAppDispatch();
  const { loading, error, loggedIn } = useAppSelector(
    state => state.auth
  );

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle submit
  const onSubmit: SubmitHandler<any> = (data, event) => {
    console.log(data);
    dispatch(loginUser(data));

    // clear fields
    event?.target.reset();

    // redirect to home
    if (loggedIn) router.push("/");
  };

  // RETURN ==========================================
  return (
    <main className="container w-[75%] py-4 flex justify-center">
      <div className="w-[40%]">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : loggedIn ? (
          <h1>LoggedIn successfully</h1>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-md"
          >
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

            {/* submit */}
            <div className="mb-2 pt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

// EXTENDED COMPONENTS =================================