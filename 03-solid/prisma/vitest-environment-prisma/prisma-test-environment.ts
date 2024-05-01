import { Environment } from 'vitest'

export default <Environment>{
    name: 'prisma',
    transformMode: 'web',
    async setup() {
        return {
            teardown() {},
        }
    },
}
