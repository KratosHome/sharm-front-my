import { auth, signIn, signOut } from "@/server/auth/auth";
import { redirect } from "next/navigation";
import "./login.scss";
import LoginForm from "@/components/client/auth/LoginPage";
import { Footer } from "@/components/client/Footer/Footer";

export default async function LoginPage({ params: { locale } }: any) {
  const session = await auth();
  console.log("first", locale);
  console.log("session", session);

  //   if (session?.user) {
  //     redirect(`//profile`);
  //     return null;
  //   }

  return (
    <div className="loginWrapper ">
      <LoginForm locale={locale} />
      <Footer />
    </div>
  );
}
