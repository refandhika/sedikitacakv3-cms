"use client"

import SideNav from "../ui/dashboard/sidenav";
import { useEffect } from "react";
import { getCookie } from "../lib/cookies";

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const cms_token = getCookie('cmsToken');
        const current_id = getCookie('currentId');

        console.log

        if(!cms_token || !current_id) {
            window.location.href = '/login';
        }
    });

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}