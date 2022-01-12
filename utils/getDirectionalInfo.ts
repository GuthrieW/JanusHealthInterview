import { TickerItem } from '..'

const getDirectionalInfo = (tick: TickerItem) => {
    if (tick.change > 0) {
        return { icon: '▲', color: 'green' }
    } else if (tick.change < 0) {
        return { icon: '▼', color: 'red' }
    } else {
        return { icon: '-', color: 'grey' }
    }
}

export default getDirectionalInfo