/** function for reading user inputs  */

export async function readLine<T>(
    question: string = '',
    parser: (v) => T = v => v
): Promise<T> {

    return new Promise((res, rej) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let answer = ""
        readLine.question(question, (it: string) => {
            answer = it
            readLine.close()
            res(parser(answer))
        })
    })

}

export const readInt = (question) => readLine(question, parseInt)
