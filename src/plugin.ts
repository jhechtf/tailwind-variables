import plugin from 'tailwindcss/plugin';
import { TailwindConfig } from 'tailwindcss/tailwind-config';


export default plugin(
  ({ addBase, addUtilities, theme, config }) => {

    const colors = theme('colors');
    const fontFamily = theme('fontFamily');

    const t = config() as TailwindConfig['theme'];

    const colorsToObj = Object.entries(colors as Record<string, Record<string, string> | string >).reduce((cum, [key, cur]) => {
      if(typeof cur === 'object') {
        Object.entries(cur as Record<string, string>).forEach(([subkey, value]) => {
          cum[`--color-${key}-${subkey}`] = value;
        })
      } else {
        cum[`--color-${key}`] = cur;
      }
      return cum;
    }, {} as Record<string, string | Record<string, string>>);

    const fontFamilyObj = Object.entries(fontFamily as Record<string, string>).reduce((cum, [key, cur])=> {
      cum[`--font-family-${key}`] = cur;
      return cum;
    }, {} as Record<string, string>);


    addBase({
      ':root': {
        ...colorsToObj,
        ...fontFamilyObj
      },
    })
  }
);