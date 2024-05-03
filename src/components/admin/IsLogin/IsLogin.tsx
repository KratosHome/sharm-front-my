import React, {ReactNode} from 'react';
import LoginPage from "@/components/admin/Login/login";
import {auth} from "@/server/auth/auth";

interface IsLoginProps {
    children: ReactNode;
}

const IsLogin: React.FC<IsLoginProps> = async ({children}) => {
    const session: any = await auth();
    const hasAccess = session?.user?.roles?.some((role: string) => role === 'admin' || role === 'manager') ?? false;

    return (
        <div>
            {hasAccess ?
                <>
                    {children}
                </>
                :
                <>
                    <LoginPage/>
                </>
            }
        </div>
    );
};
export default IsLogin;
