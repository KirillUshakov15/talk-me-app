import React, {useEffect} from 'react';
import {AppRouter, } from "@/components/AppRouter";
import {Layout} from "@/components/Layout";
import {useRefreshAccessMutation} from "@/services/auth-service";

const App = () => {

    const [refreshAccess] = useRefreshAccessMutation()

    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            refreshAccess('')
        }
    }, [])

    return (
        <Layout>
            <AppRouter/>
        </Layout>
    );
};

export default App;