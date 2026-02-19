import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'yvweav2z',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  /**
   * Enable automatic type generation
   */

  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}', // where to scan for GROQ queries
    schema: 'schema.json', // schema file from `schema extract`
    generates: '../../packages/sanity-client/src/types.gen.ts', // output types file
    overloadClientMethods: true, // optional
  },
})
