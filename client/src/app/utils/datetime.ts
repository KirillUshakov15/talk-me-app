
export function getDate(timestamp?: string) {
    if(!timestamp) return;
    return formatDate(timestamp.split(' ')[0])
}

export function getTime(timestamp?: string){
    if(!timestamp) return;
    return timestamp.split(' ')[1].split(':').slice(0, 2).join(':')
}

export function getLastMessageDateTime(timestamp?: string){
    if(!timestamp) return;
    return formatDate(timestamp.split(' ')[0], getTime(timestamp))


}

function formatDate(date: string, todayStr: string = 'Сегодня', yesterdayStr = 'Вчера'){
    const today = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate()-1))

    switch (date) {
        case setFormatDate(today):{
            return todayStr
        }
        case setFormatDate(yesterday):{
            return yesterdayStr
        }
        default: {
            return date
        }
    }
}

function setFormatDate(date: Date){
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`
}
