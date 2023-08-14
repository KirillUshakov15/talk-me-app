import React, {FC, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import {useAppSelector} from "@/hooks/redux";
import {PageSpinner} from "@/components/PageSpinner";

export const AppRouter: FC = () => {

    const {isAuth} = useAppSelector(state => state.auth)

    return (
        <Suspense fallback={<PageSpinner/>}>
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
                {isAuth && privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
            </Routes>
        </Suspense>
    );
};
