// 生成标签颜色映射
export const generateTagColors = (tags: string[]): TagColorMap => {
    const colorMap: TagColorMap = {}
    let lastHue = -1

    tags.forEach(tag => {
        let hue
        let attempts = 0
        do {
            const hash = tag.charCodeAt(0) + (attempts * 31)
            hue = Math.abs(hash) % 360
            attempts++
        } while (attempts < 10 && Math.abs(hue - lastHue) < 30)

        lastHue = hue
        colorMap[tag] = `hsl(${hue}, ${40 + attempts * 3}%, ${75 + attempts}%)`
    })

    return colorMap
}
export interface TagColorMap {
    [key: string]: string
}
