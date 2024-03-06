import AcmeLogo from "../ui/acme-logo";
import LoginForm from "../ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage(){
    return(
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative flex w-full mx-auto max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex items-end w-full h-20 p-3 bg-green-500 rounded-lg md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    )
}