export default function (text: string, length: number){
    if(text?.length >= length){
        text = text.substring(0, length) + '...';
    }
    return text
}