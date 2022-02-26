import tailwind from 'tailwindcss';
import tailwindVariables from '../src/plugin';
import path from 'path';
import postcss from 'postcss';
import { writeFileSync } from 'fs';
import { TailwindConfig } from 'tailwindcss/tailwind-config';


function run(config: any, plugin = tailwind) {
  let { currentTestName } = expect.getState();
  config = {
    ...{
      plugins: [tailwindVariables], corePlugins: { preflight: false },
      ...config
    }
  };
  return postcss(plugin(config as TailwindConfig)).process(
    ['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n'),
    { from: `${path.resolve(__filename)}?test=${currentTestName}`}
  );
}

test('Tested', async () => {
  let config = {
    content: [{ raw: String.raw`<div class="something"><h1>Hi</h1></div>` }],
  };
  const value = await run(config);
  writeFileSync(path.resolve(__dirname, 'outfile.css'), value.css);
});
