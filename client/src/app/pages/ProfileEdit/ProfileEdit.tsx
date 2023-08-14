import React, {FC} from 'react';
import {EditPasswordForm, EditProfileForm} from "@/modules/UserProfileModule";

export const ProfileEdit: FC = () => {
    return (
        <div>
            <EditProfileForm/>
            <EditPasswordForm/>
        </div>
    );
};
