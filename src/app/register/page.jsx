import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Register() {
  const session = await getServerSession(options);

  if (session) redirect("/dashboard");

  return (
    <>
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <RegisterForm />
          </div>
        </div>
   
    </>
  );
}