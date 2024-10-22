import { thread_id, forum_check_url, interval_ms } from './config.json'
import { JSDOM } from 'jsdom'
import * as fs from 'node:fs'

if (!fs.existsSync('data.csv')) fs.writeFileSync('data.csv', '')

const saveToFile = (time: string, value: number) => {
    fs.appendFileSync('data.csv', `${time},${value}\n`)
}

setInterval(async () => {
    const now = new Date().toISOString()
    const text = await (await fetch(forum_check_url)).text()
    
    const { document } = new JSDOM(text).window
    const li = document.querySelector(`#thread-${thread_id}`)
    if (!li) return console.error(`[${now}] failed to find thread in ${forum_check_url}`);

    const stats = li.querySelector('.stats')
    const dd = stats?.querySelector('dl.minor>dd')
    const num = parseInt(dd?.textContent?.replaceAll(',', '') ?? '')
    if (isNaN(num)) return console.error(`[${now}] failed to parse ${dd?.textContent}`);
    
    console.log(`${now}: ${num}`)

    saveToFile(now, num)



}, interval_ms)