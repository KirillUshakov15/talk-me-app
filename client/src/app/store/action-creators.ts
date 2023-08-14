import {popupActionCreator} from "@/store/popup/actions";
import {roomActionCreator} from "@/store/room/actions";
import {messageActionCreator} from "@/store/message/actions";

export const actionCreators = {
    ...popupActionCreator,
    ...roomActionCreator,
    ...messageActionCreator
}