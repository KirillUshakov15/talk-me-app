import React, {FC, useEffect, useState} from 'react';
import {Button, Divider, Form, ImageUploader, Input, Spinner} from "@/ui";
import {useEditProfileMutation, useGetUserQuery} from "@/services/user-service";
import useAction, {useAppSelector} from "@/hooks/redux";
import {IUser} from "@/models/IUserData";
import useInput from "@/hooks/useInput";
import style from '@/modules/UserProfileModule/styles/Style.module.scss'
import {Avatar} from "@/modules/UserProfileModule/components";
import {ConfirmModal} from "@/components";
import {DELETE_AVATAR_MODAL} from "@/contants/modal-names";

interface IEditUserData{
    firstName: string,
    secondName: string,
}

const initialState = {
    firstName: '',
    secondName: '',
}

export const EditProfileForm: FC = () => {
    const formData = new FormData();
    const {userData} = useAppSelector(state => state.auth)
    const {openModal} = useAction()

    const [editData, setEditData] = useState<IEditUserData>(initialState);
    const [avatar, setAvatar] = useState(null)
    const handleChange = useInput(setEditData);

    const {data: user = {} as IUser, isFetching} = useGetUserQuery(userData.id);
    const [editProfile, {isLoading}] = useEditProfileMutation()

    useEffect(() => {
        if(user && !isFetching){
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

    const openDeleteAvatarModal = () => {
        openModal(DELETE_AVATAR_MODAL)
    }

    const submit = () => {
        formData.append('firstName', editData.firstName)
        formData.append('secondName', editData.secondName)
        if(avatar) formData.append('avatar', avatar)
        editProfile(formData)
        setAvatar(null)
    }

    const deleteAvatar = () => {
        if(user.avatarUrl) formData.append('deletableAvatar', user.avatarUrl)
        formData.append('firstName', user.firstName)
        formData.append('secondName', user.secondName)
        editProfile(formData)
    }

    return (
        <div className={style.formWrapper}>
            <Form onSubmit={submit}>

                <h2>Редактирование профиля</h2>

                <div className={style.avatarContainer}>
                    <ImageUploader existingImage={user.avatarUrl} file={avatar} setFile={setAvatar} onDelete={openDeleteAvatarModal}>
                        <Avatar uploadedImage={avatar && URL.createObjectURL(avatar)} image={user.avatarUrl}/>
                    </ImageUploader>
                </div>

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

                <Button.Primary type="submit" loading={isLoading}>
                    <i className='bx bx-pencil'></i>
                    Сохранить изменения
                </Button.Primary>
            </Form>
            <ConfirmModal
                modalName={DELETE_AVATAR_MODAL}
                title="Подтверждение удаления"
                text="Вы действительно хотите удалить фотографию?"
                onPressYes={deleteAvatar}
            />
        </div>
    );
};
