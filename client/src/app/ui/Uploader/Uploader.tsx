import React, {FC, useRef} from 'react';
import style from './Uploader.module.scss'
import {Button} from "@/ui";

type FileType = 'image/*'

interface IProps {
    file: any,
    setFile: Function,
    title?: string,
    fileType: FileType
}

export const Uploader: FC<IProps> = ({
                                         title = "Загрузить",
                                         fileType,
                                         file,
                                         setFile
}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const uploaderClick = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    }

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0])
        }
    }

    const removeFile = () => {
        setFile(null);
    }

    return (
        <div className={style.wrapper}>
            <input accept={fileType} ref={inputRef} type="file" onChange={uploadFile}/>
            <Button type="button" onClick={uploaderClick}>
                <i className='bx bx-download'></i>
                {title}
            </Button>
            {file &&
                <div className={style.fileContainer}>
                    <p>{file.name}</p>
                    <span onClick={removeFile}>X</span>
                </div>
            }
        </div>
    );
};
