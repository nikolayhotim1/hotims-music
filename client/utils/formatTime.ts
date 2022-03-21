/**
 * transforms time in second to hh:mm:ss format (hours can be missing)
 * @param time time in seconds
 * @returns string
 */
function formatTrackTime(time: number) {
    time = Math.round(+time)

    let formattedTime = ''

    let hours   = Math.floor(time / 3600) >= 1 ? Math.floor(time / 3600) : ''
    let minutes = Math.floor((time - (+hours * 3600)) / 60)
    let seconds = time - (+hours * 3600) - (minutes * 60)

    if (hours !== '') {
        formattedTime += hours < 10 ? '0' + hours : hours
        formattedTime += ':'
    }

    formattedTime += minutes < 10 ? '0' + minutes : minutes
    formattedTime += ':'
    formattedTime += seconds < 10 ? '0' + seconds : seconds

    return formattedTime
}

export default formatTrackTime;