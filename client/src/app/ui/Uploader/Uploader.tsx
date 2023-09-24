import React, {FC, useRef} from 'react';
import style from './Uploader.module.scss'
import {Button} from "@/ui";
import useUploader, {FileType} from "@/hooks/useUploader";
import {IProps} from "@/ui/Uploader/IProps";

interface IUploaderProps extends IProps {
    title?: string,
}

export const Uploader: FC<IUploaderProps> = ({
                                         title = "Загрузить",
                                         fileType,
                                         file,
                                         setFile
}) => {

    const {uploaderClick, removeFile, FileInput} = useUploader(fileType, file, setFile)

    return (
        <div className={style.wrapper}>
            <FileInput/>
            {!file ?
                <Button.Primary disabled={file} type="button" onClick={uploaderClick}>
                    <i className='bx bx-download'></i>
                    {title}
                </Button.Primary>
            :
                <div className={style.fileContainer}>
                    <p>Файл загружен</p>
                    <i onClick={removeFile} className='bx bx-trash'></i>
                </div>
            }
        </div>
    );
};
