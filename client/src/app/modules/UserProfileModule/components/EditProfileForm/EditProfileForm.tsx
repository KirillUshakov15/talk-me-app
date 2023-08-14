import React, {FC, useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Spinner, Uploader} from "@/ui";
import {useEditProfileMutation, useGetUserQuery} from "@/services/user-service";
import {useAppSelector} from "@/hooks/redux";
import {IUser} from "@/models/IUserData";
import useInput from "@/hooks/useInput";
import style from '@/modules/UserProfileModule/styles/Style.module.scss'
import {API_SERVER_IMAGES_PATH} from "@/contants/api";
import {Avatar} from "@/modules/UserProfileModule/components";
import icons from "@/assets/icons";

interface IEditUserData{
    firstName: string,
    secondName: string,
}

const initialState = {
    firstName: '',
    secondName: '',
}

export const EditProfileForm: FC = () => {
    const {userData} = useAppSelector(state => state.auth)
    const [editData, setEditData] = useState<IEditUserData>(initialState);
    const [avatar, setAvatar] = useState(null)
    const handleChange = useInput(setEditData);

    const {data: user = {} as IUser, isFetching} = useGetUserQuery(userData.id);
    const [editProfile, {isLoading}] = useEditProfileMutation()

    useEffect(() => {
        if(user){
            setDataForEdit();
        }
    }, [user])

    const setDataForEdit = () => {
        setEditData({
            ...editData,
            firstName: user.firstName || '',
            secondName: user.secondName || '',
        })
    }

    if(isFetching){
        return (
            <div className={style.spinnerContainer}>
                <Spinner title='Идет загрузка пользовательских данных...'/>
            </div>
        )
    }

    const submit = () => {
        const formData = new FormData();
        formData.append('firstName', editData.firstName)
        formData.append('secondName', editData.secondName)
        if(avatar) formData.append('avatar', avatar)

        editProfile(formData)
    }

    return (
        <div className={style.formWrapper}>
            <Form onSubmit={submit}>

                <h2>Редактирование профиля</h2>

                <Uploader
                    file={avatar}
                    setFile={setAvatar}
                    fileType={'image/*'}
                    title={user.avatarUrl ? "Изменить аватар" : "Загрузить аватар"}
                />

                <h3>Электронная почта: {user.email}</h3>

                <Input
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange} placeholder="Имя"
                />
                <Input
                    name="secondName"
                    value={editData.secondName}
                    onChange={handleChange} placeholder="Фамилия"
                />

                <Divider/>

                <Button type="submit" loading={isLoading}>Редактировать профиль</Button>
            </Form>
        </div>
    );
};
