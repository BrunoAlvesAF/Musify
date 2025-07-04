import { http } from './config'

export default {
    listar: () => {
        return http.get('music')
    },
    criar :  (musica) => {
        return http.post('music', musica)
    },
    excluir: (id) => {
        return http.delete('music/' + id)
    }
}