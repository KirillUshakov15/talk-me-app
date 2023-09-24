import React, {useEffect} from 'react';
import {AppRouter, } from "@/components/AppRouter";
import {Layout} from "@/components/Layout";
import {useRefreshAccessMutation} from "@/services/auth-service";
import {useNavigate} from "react-router-dom";
import {LOGIN_PAGE_ROUTE} from "@/contants/routes";

const App = () => {

    const [refreshAccess, {isError}] = useRefreshAccessMutation()
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            refreshAccess('')
        }
    }, [])

    useEffect(() => {
        if(isError) navigate(LOGIN_PAGE_ROUTE)
    }, [isError])

    return (
        <Layout>
            <AppRouter/>
        </Layout>
    );
};

export default App;