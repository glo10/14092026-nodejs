import MyUser from './src/classes/user'
import { formatCountry, formatDate, formatName } from './src/utils'
import { formatCountry as fc, formatDate as fd, formatName as fn } from './src/utils-bis'
const john = new MyUser('john')
formatCountry()
formatDate()
formatName()
fc()
fd()
fn()