/***
 * Função para converter hora em string "12:00" para minutos "720"
 */
export function convertHourStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(":").map(Number);

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}