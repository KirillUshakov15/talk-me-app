import React, {FC} from "react";
import {
    EDIT_PROFILE_PAGE_ROUTE,
    LOGIN_PAGE_ROUTE, MESSENGER_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    REGISTRATION_PAGE_ROUTE
} from "@/contants/routes";

interface IRoute {
    path: string,
    Component: FC,
}

const LoginPage = React.lazy(() => import('@/pages/Login'))
const RegistrationPage = React.lazy(() => import('@/pages/Registration'))
const NotFoundPage = React.lazy(() => import('@/pages/NotFound'))
const ProfilePage = React.lazy(() => import('@/pages/Profile'))
const EditProfilePage = React.lazy(() => import('@/pages/ProfileEdit'))
const MessengerPage = React.lazy(() => import('@/pages/Messenger'))

export const publicRoutes: IRoute[] = [
    {path: LOGIN_PAGE_ROUTE, Component: LoginPage},
    {path: REGISTRATION_PAGE_ROUTE, Component: RegistrationPage},
    {path: '*', Component: NotFoundPage},
]

export const privateRoutes: IRoute[] = [
    {path: PROFILE_PAGE_ROUTE, Component: ProfilePage},
    {path: EDIT_PROFILE_PAGE_ROUTE, Component: EditProfilePage},
    {path: MESSENGER_PAGE_ROUTE, Component: MessengerPage},
]