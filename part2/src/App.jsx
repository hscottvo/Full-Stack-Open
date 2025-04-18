import {
    Notes,
    Phonebook,
    ServerData,
    PhonebookAxios,
} from './components/Archive'
import Countries from './components/Countries'

const App = () => {
    let render = 'phonebook_axios'
    switch (render) {
        case 'notes':
            return <Notes />
        case 'phonebook':
            return <Phonebook />
        case 'data_from_server':
            return <ServerData />
        case 'phonebook_axios':
            return <PhonebookAxios />
        case 'countries':
            return <Countries />
    }
}

export default App
