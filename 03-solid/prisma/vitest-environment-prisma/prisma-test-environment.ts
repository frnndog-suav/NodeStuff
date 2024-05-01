import { Environment } from 'vitest'

export default <Environment>{
    name: 'prisma',
    transformMode: 'web',
    async setup() {
        console.log('executou')

        return {
            teardown() {
                console.log('teardown')
            },
        }
    },
}
