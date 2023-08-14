import {useAppSelector} from "@/hooks/redux";

export default function (userID?: string){
    const {userData} = useAppSelector(state => state.auth)
    return userData.id === userID
}